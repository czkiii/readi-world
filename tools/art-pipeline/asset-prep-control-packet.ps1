[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$PathPlan,

    [string[]]$ReferencePath = @()
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$repoRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$artRoot = [IO.Path]::GetFullPath((Join-Path $repoRoot 'art-source')).TrimEnd('\') + '\'
$runtimeRoot = [IO.Path]::GetFullPath((Join-Path $repoRoot 'runtime')).TrimEnd('\') + '\'
$planFile = (Resolve-Path -LiteralPath $PathPlan).Path
$plan = Get-Content -LiteralPath $planFile -Raw | ConvertFrom-Json

if ([int]$plan.schemaVersion -ne 1) { throw 'Unsupported path-plan schema.' }

function Resolve-RepoPath([string]$PathValue, [string]$Label) {
    if (-not $PathValue) { throw "$Label path is empty." }
    $full = if ([IO.Path]::IsPathRooted($PathValue)) {
        [IO.Path]::GetFullPath($PathValue)
    } else {
        [IO.Path]::GetFullPath((Join-Path $repoRoot $PathValue))
    }
    if ($full.StartsWith($runtimeRoot, [StringComparison]::OrdinalIgnoreCase)) {
        throw "$Label points into protected runtime: $full"
    }
    if (-not $full.StartsWith($artRoot, [StringComparison]::OrdinalIgnoreCase)) {
        throw "$Label must stay under art-source: $full"
    }
    return $full
}

function Get-StyleMetrics([string]$ImagePath) {
    $bitmap = [System.Drawing.Bitmap]::FromFile($ImagePath)
    try {
        $visible = 0L
        $samples = 0L
        $sumR = 0.0
        $sumG = 0.0
        $sumB = 0.0
        $sumLuma = 0.0
        $sumSaturation = 0.0
        $edgeSamples = 0L
        $edgeHits = 0L
        $minX = $bitmap.Width
        $minY = $bitmap.Height
        $maxX = -1
        $maxY = -1

        for ($y = 0; $y -lt $bitmap.Height; $y += 2) {
            for ($x = 0; $x -lt $bitmap.Width; $x += 2) {
                $samples++
                $pixel = $bitmap.GetPixel($x, $y)
                if ($pixel.A -le 16) { continue }
                $visible++
                $sumR += $pixel.R
                $sumG += $pixel.G
                $sumB += $pixel.B
                $luma = (0.2126 * $pixel.R) + (0.7152 * $pixel.G) + (0.0722 * $pixel.B)
                $sumLuma += $luma
                $maxChannel = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B))
                $minChannel = [Math]::Min($pixel.R, [Math]::Min($pixel.G, $pixel.B))
                if ($maxChannel -gt 0) { $sumSaturation += ($maxChannel - $minChannel) / $maxChannel }
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }

                if (($x + 2) -lt $bitmap.Width) {
                    $right = $bitmap.GetPixel($x + 2, $y)
                    if ($right.A -gt 16) {
                        $rightLuma = (0.2126 * $right.R) + (0.7152 * $right.G) + (0.0722 * $right.B)
                        $edgeSamples++
                        if ([Math]::Abs($luma - $rightLuma) -ge 32) { $edgeHits++ }
                    }
                }
            }
        }

        if ($visible -eq 0) { throw "Image has no visible pixels: $ImagePath" }
        $boundsWidth = ($maxX - $minX) + 1
        $boundsHeight = ($maxY - $minY) + 1
        return [ordered]@{
            path = $ImagePath
            width = $bitmap.Width
            height = $bitmap.Height
            aspectRatio = [Math]::Round($bitmap.Width / $bitmap.Height, 4)
            alphaOccupancy = [Math]::Round($visible / $samples, 4)
            visibleBoundsRatio = [ordered]@{
                width = [Math]::Round($boundsWidth / $bitmap.Width, 4)
                height = [Math]::Round($boundsHeight / $bitmap.Height, 4)
            }
            averageRgb = [ordered]@{
                r = [Math]::Round($sumR / $visible, 2)
                g = [Math]::Round($sumG / $visible, 2)
                b = [Math]::Round($sumB / $visible, 2)
            }
            averageLuminance = [Math]::Round($sumLuma / $visible, 2)
            averageSaturation = [Math]::Round($sumSaturation / $visible, 4)
            edgeDensity = if ($edgeSamples -gt 0) { [Math]::Round($edgeHits / $edgeSamples, 4) } else { 0 }
        }
    } finally {
        $bitmap.Dispose()
    }
}

function Get-StyleDistance($Candidate, $Reference) {
    $color = (
        [Math]::Abs($Candidate.averageRgb.r - $Reference.averageRgb.r) +
        [Math]::Abs($Candidate.averageRgb.g - $Reference.averageRgb.g) +
        [Math]::Abs($Candidate.averageRgb.b - $Reference.averageRgb.b)
    ) / (3 * 255)
    $luma = [Math]::Abs($Candidate.averageLuminance - $Reference.averageLuminance) / 255
    $saturation = [Math]::Abs($Candidate.averageSaturation - $Reference.averageSaturation)
    $occupancy = [Math]::Abs($Candidate.alphaOccupancy - $Reference.alphaOccupancy)
    $edge = [Math]::Abs($Candidate.edgeDensity - $Reference.edgeDensity)
    return [Math]::Round((0.35 * $color) + (0.2 * $luma) + (0.15 * $saturation) + (0.15 * $occupancy) + (0.15 * $edge), 4)
}

function Draw-Checker([System.Drawing.Graphics]$Graphics, [System.Drawing.Rectangle]$Rectangle) {
    $size = 16
    $light = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 224, 224, 224))
    $dark = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 184, 184, 184))
    try {
        for ($y = $Rectangle.Top; $y -lt $Rectangle.Bottom; $y += $size) {
            for ($x = $Rectangle.Left; $x -lt $Rectangle.Right; $x += $size) {
                $brush = if ((([int](($x - $Rectangle.Left) / $size) + [int](($y - $Rectangle.Top) / $size)) % 2) -eq 0) { $light } else { $dark }
                $Graphics.FillRectangle($brush, $x, $y, [Math]::Min($size, $Rectangle.Right - $x), [Math]::Min($size, $Rectangle.Bottom - $y))
            }
        }
    } finally {
        $light.Dispose()
        $dark.Dispose()
    }
}

function Draw-AssetPanel(
    [System.Drawing.Graphics]$Graphics,
    [System.Drawing.Bitmap]$Asset,
    [System.Drawing.Rectangle]$Panel,
    [string]$Label,
    [System.Drawing.Color]$Background,
    [bool]$Checker,
    [bool]$Silhouette,
    [bool]$NativeScale,
    [bool]$Geometry,
    $GeometryData,
    [System.Drawing.Font]$Font
) {
    $labelHeight = 30
    $content = New-Object System.Drawing.Rectangle ($Panel.X + 8), ($Panel.Y + $labelHeight + 8), ($Panel.Width - 16), ($Panel.Height - $labelHeight - 16)
    if ($Checker) {
        Draw-Checker $Graphics $content
    } else {
        $backgroundBrush = New-Object System.Drawing.SolidBrush $Background
        try { $Graphics.FillRectangle($backgroundBrush, $content) } finally { $backgroundBrush.Dispose() }
    }
    $scale = if ($NativeScale) { 1.0 } else { [Math]::Min($content.Width / $Asset.Width, $content.Height / $Asset.Height) }
    $drawWidth = [int][Math]::Round($Asset.Width * $scale)
    $drawHeight = [int][Math]::Round($Asset.Height * $scale)
    $drawX = $content.X + [int](($content.Width - $drawWidth) / 2)
    $drawY = $content.Y + [int](($content.Height - $drawHeight) / 2)

    $drawingState = $Graphics.Save()
    $Graphics.SetClip($content)
    if ($Silhouette) {
        $silhouetteBitmap = New-Object System.Drawing.Bitmap $Asset.Width, $Asset.Height
        try {
            for ($y = 0; $y -lt $Asset.Height; $y++) {
                for ($x = 0; $x -lt $Asset.Width; $x++) {
                    $alpha = $Asset.GetPixel($x, $y).A
                    if ($alpha -gt 0) { $silhouetteBitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 15, 18, 16)) }
                }
            }
            $Graphics.DrawImage($silhouetteBitmap, $drawX, $drawY, $drawWidth, $drawHeight)
        } finally { $silhouetteBitmap.Dispose() }
    } else {
        $Graphics.DrawImage($Asset, $drawX, $drawY, $drawWidth, $drawHeight)
    }

    if ($Geometry -and $GeometryData) {
        $pivotX = $drawX + ($GeometryData.pivotPx.x * $scale)
        $pivotY = $drawY + ($GeometryData.pivotPx.y * $scale)
        $pivotPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 255, 64, 64)), 2
        $boundsPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 255, 214, 64)), 1
        try {
            $Graphics.DrawRectangle($boundsPen, $drawX, $drawY, $drawWidth, $drawHeight)
            $Graphics.DrawLine($pivotPen, $pivotX - 12, $pivotY, $pivotX + 12, $pivotY)
            $Graphics.DrawLine($pivotPen, $pivotX, $pivotY - 12, $pivotX, $pivotY + 12)
        } finally {
            $pivotPen.Dispose()
            $boundsPen.Dispose()
        }
    }
    $Graphics.Restore($drawingState)

    $labelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 235, 239, 232))
    try { $Graphics.DrawString($Label, $Font, $labelBrush, $Panel.X + 8, $Panel.Y + 5) } finally { $labelBrush.Dispose() }
}

$normalizedPath = Resolve-RepoPath $plan.files.normalized 'files.normalized'
$geometryPath = Resolve-RepoPath $plan.files.geometry 'files.geometry'
$passportPath = Resolve-RepoPath $plan.files.passport 'files.passport'
$reviewPath = Resolve-RepoPath $plan.files.review 'files.review'
if (-not (Test-Path -LiteralPath $normalizedPath -PathType Leaf)) { throw "Normalized source missing: $normalizedPath" }
if (-not (Test-Path -LiteralPath $geometryPath -PathType Leaf)) { throw "Geometry missing: $geometryPath" }

$reviewDirectory = Split-Path -Parent $reviewPath
New-Item -ItemType Directory -Path $reviewDirectory -Force | Out-Null
$baseName = [IO.Path]::GetFileNameWithoutExtension($normalizedPath) -replace '__normalized$', ''
$qaSheetPath = Join-Path $reviewDirectory ($baseName + '__qa-contact-sheet.png')
$styleReportPath = Join-Path $reviewDirectory ($baseName + '__style-report.json')
$sessionPath = Join-Path $reviewDirectory ($baseName + '__resume-session.json')
$controlPacketPath = Join-Path $reviewDirectory ($baseName + '__control-packet.md')

$geometry = Get-Content -LiteralPath $geometryPath -Raw | ConvertFrom-Json
$passport = if (Test-Path -LiteralPath $passportPath -PathType Leaf) { Get-Content -LiteralPath $passportPath -Raw | ConvertFrom-Json } else { $null }

$asset = [System.Drawing.Bitmap]::FromFile($normalizedPath)
$sheet = New-Object System.Drawing.Bitmap 1600, 760
$graphics = [System.Drawing.Graphics]::FromImage($sheet)
$font = New-Object System.Drawing.Font 'Segoe UI', 12, ([System.Drawing.FontStyle]::Bold)
$titleFont = New-Object System.Drawing.Font 'Segoe UI', 18, ([System.Drawing.FontStyle]::Bold)
try {
    $graphics.Clear([System.Drawing.Color]::FromArgb(255, 28, 36, 31))
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 244, 235, 209))
    try {
        $graphics.DrawString("Readi QA | $($plan.assetId) | $($plan.revision)", $titleFont, $titleBrush, 20, 14)
    } finally { $titleBrush.Dispose() }

    $panels = @(
        @{ X = 20;   Y = 60;  Label = 'Transparency / checker'; Color = [System.Drawing.Color]::Transparent;                         Checker = $true;  Silhouette = $false; NativeScale = $false; Geometry = $false },
        @{ X = 415;  Y = 60;  Label = 'Light fringe check';      Color = [System.Drawing.Color]::FromArgb(255, 244, 242, 232);       Checker = $false; Silhouette = $false; NativeScale = $false; Geometry = $false },
        @{ X = 810;  Y = 60;  Label = 'Dark fringe check';       Color = [System.Drawing.Color]::FromArgb(255, 25, 31, 29);           Checker = $false; Silhouette = $false; NativeScale = $false; Geometry = $false },
        @{ X = 1205; Y = 60;  Label = 'Chroma green';            Color = [System.Drawing.Color]::FromArgb(255, 38, 210, 82);           Checker = $false; Silhouette = $false; NativeScale = $false; Geometry = $false },
        @{ X = 20;   Y = 410; Label = 'Chroma magenta';          Color = [System.Drawing.Color]::FromArgb(255, 224, 38, 188);          Checker = $false; Silhouette = $false; NativeScale = $false; Geometry = $false },
        @{ X = 415;  Y = 410; Label = 'Silhouette';              Color = [System.Drawing.Color]::FromArgb(255, 244, 242, 232);       Checker = $false; Silhouette = $true;  NativeScale = $false; Geometry = $false },
        @{ X = 810;  Y = 410; Label = 'Pivot and canvas bounds'; Color = [System.Drawing.Color]::FromArgb(255, 94, 112, 87);           Checker = $false; Silhouette = $false; NativeScale = $false; Geometry = $true },
        @{ X = 1205; Y = 410; Label = '100% native-scale crop';  Color = [System.Drawing.Color]::FromArgb(255, 244, 242, 232);       Checker = $false; Silhouette = $false; NativeScale = $true;  Geometry = $false }
    )
    foreach ($panel in $panels) {
        $rect = New-Object System.Drawing.Rectangle $panel.X, $panel.Y, 370, 330
        Draw-AssetPanel $graphics $asset $rect $panel.Label $panel.Color $panel.Checker $panel.Silhouette $panel.NativeScale $panel.Geometry $geometry $font
    }
    $sheet.Save($qaSheetPath, [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
    $font.Dispose()
    $titleFont.Dispose()
    $graphics.Dispose()
    $sheet.Dispose()
    $asset.Dispose()
}

$candidateMetrics = Get-StyleMetrics $normalizedPath
$referenceMetrics = @()
foreach ($reference in $ReferencePath) {
    $resolvedReference = Resolve-RepoPath $reference 'reference'
    if (-not (Test-Path -LiteralPath $resolvedReference -PathType Leaf)) { throw "Reference missing: $resolvedReference" }
    if (-not $resolvedReference.Equals($normalizedPath, [StringComparison]::OrdinalIgnoreCase)) {
        $referenceMetrics += Get-StyleMetrics $resolvedReference
    }
}

$comparisons = @()
foreach ($referenceMetric in $referenceMetrics) {
    $distance = Get-StyleDistance $candidateMetrics $referenceMetric
    $comparisons += [ordered]@{
        reference = $referenceMetric.path
        distance = $distance
        signal = if ($distance -le 0.08) { 'CLOSE' } elseif ($distance -le 0.16) { 'REVIEW' } else { 'STRONG_DEVIATION' }
    }
}
$styleStatus = if ($comparisons.Count -eq 0) { 'BASELINE_ESTABLISHED' } elseif (($comparisons | Where-Object signal -eq 'STRONG_DEVIATION').Count -gt 0) { 'OWNER_STYLE_REVIEW' } else { 'WITHIN_MEASURED_FAMILY_RANGE' }
$styleReport = [ordered]@{
    schemaVersion = 1
    reportId = "style-report.$($plan.assetId).$($plan.revision)"
    generatedUtc = [DateTime]::UtcNow.ToString('o')
    status = $styleStatus
    disclaimer = 'Numeric style signals are warnings, not artistic approval.'
    candidate = $candidateMetrics
    references = $referenceMetrics
    comparisons = $comparisons
    thresholds = [ordered]@{ closeMax = 0.08; reviewMax = 0.16 }
}
$styleReport | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $styleReportPath -Encoding UTF8

$files = [ordered]@{}
foreach ($property in $plan.files.PSObject.Properties) {
    $resolved = Resolve-RepoPath $property.Value "files.$($property.Name)"
    $files[$property.Name] = [ordered]@{ path = $resolved; exists = (Test-Path -LiteralPath $resolved -PathType Leaf) }
}
$ownerReviewRequired = if ($passport -and $null -ne $passport.ownerReviewRequired) { [bool]$passport.ownerReviewRequired } else { $true }
$session = [ordered]@{
    schemaVersion = 1
    sessionId = "asset-prep.$($plan.assetId).$($plan.revision)"
    updatedUtc = [DateTime]::UtcNow.ToString('o')
    pathPlan = $planFile
    assetId = $plan.assetId
    familyId = $plan.familyId
    revision = $plan.revision
    promptRunId = $plan.promptRunId
    stage = if ($passport) { $passport.qaStatus } else { 'NORMALIZED_WITHOUT_PASSPORT' }
    runtimeActivation = 'NOT_AUTHORIZED_BY_THIS_PACKET'
    ownerReviewRequired = $ownerReviewRequired
    styleSignal = $styleStatus
    files = $files
    generatedArtifacts = [ordered]@{
        qaContactSheet = $qaSheetPath
        styleReport = $styleReportPath
        resumeSession = $sessionPath
        controlPacket = $controlPacketPath
    }
    autonomousNextSteps = @(
        'READ_STYLE_REPORT',
        'VERIFY_FILE_LEVEL_POSTFLIGHT',
        'PREPARE_OWNER_DECISION_ONLY_IF_VISUAL_JUDGMENT_REMAINS'
    )
    blockedOnlyByOwnerIf = @('ARTISTIC_SELECTION', 'ARTISTIC_CORRECTION', 'OWNER_APPROVAL_REQUIRED_BY_PASSPORT')
}
$session | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $sessionPath -Encoding UTF8

$ownerLine = if ($ownerReviewRequired) {
    'Owner decision required: approve the QA sheet or request an artistic correction.'
} else {
    'No immediate owner block: Codex may continue file-level checks and safe preparation.'
}
$packet = @"
# Readi asset control packet

- Asset: $($plan.assetId)
- Family: $($plan.familyId)
- Revision: $($plan.revision)
- Stage: $($session.stage)
- Style signal: $styleStatus
- Runtime activation: NOT_AUTHORIZED_BY_THIS_PACKET

## Current state

$ownerLine

## Codex continuation

1. read the __resume-session.json file;
2. inspect the style report and postflight result;
3. continue without owner presence when no artistic decision remains;
4. keep runtime integration in a separate work package.

## Owner short path

- Open only for visual judgment: $qaSheetPath
- Photoshop Action for artistic correction: ReadiWorldScript
- Approval always targets the exact asset ID and revision.

## Evidence

- QA/contact sheet: $qaSheetPath
- Style report: $styleReportPath
- Resume session: $sessionPath
- Geometry: $geometryPath
- Passport: $passportPath
"@
$packet | Set-Content -LiteralPath $controlPacketPath -Encoding UTF8

Write-Output "CONTROL PACKET READY | asset=$($plan.assetId) | qa=$qaSheetPath | style=$styleStatus | session=$sessionPath"
