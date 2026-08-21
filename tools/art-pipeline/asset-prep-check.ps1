[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('Preflight', 'Postflight')]
    [string]$Mode,
    [Parameter(Mandatory = $true)]
    [string]$SourcePath,
    [string]$NormalizedPath,
    [string]$GeometryPath,
    [string]$PassportPath,
    [int]$ExpectedWidth = 0,
    [int]$ExpectedHeight = 0,
    [int]$ExpectedPivotX = -1,
    [int]$ExpectedPivotY = -1,
    [string]$ExpectedAssetId,
    [string]$StatePath
)

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$runtimeRoot = Join-Path $repoRoot 'runtime'
if (-not $StatePath) { $StatePath = Join-Path $repoRoot 'art-source\_registry\asset-prep-session.json' }

function Resolve-RequiredFile([string]$Path, [string]$Label) {
    if (-not $Path -or -not (Test-Path -LiteralPath $Path -PathType Leaf)) { throw "$Label is missing: $Path" }
    return (Resolve-Path -LiteralPath $Path).Path
}

function Assert-OutsideRuntime([string]$Path, [string]$Label) {
    $full = [IO.Path]::GetFullPath($Path)
    $runtime = [IO.Path]::GetFullPath($runtimeRoot).TrimEnd('\') + '\'
    if ($full.StartsWith($runtime, [StringComparison]::OrdinalIgnoreCase)) { throw "$Label must not be inside runtime: $full" }
}

function Get-RuntimeStatus {
    $git = Get-Command git -ErrorAction Stop
    return @(& $git.Source -C $runtimeRoot status --porcelain)
}

function Get-PngEvidence([string]$Path) {
    Add-Type -AssemblyName System.Drawing
    $bitmap = [Drawing.Bitmap]::new($Path)
    try {
        $count = 0; $minX = $bitmap.Width; $minY = $bitmap.Height; $maxX = -1; $maxY = -1
        for ($y = 0; $y -lt $bitmap.Height; $y += 1) {
            for ($x = 0; $x -lt $bitmap.Width; $x += 1) {
                if ($bitmap.GetPixel($x, $y).A -gt 0) {
                    $count += 1
                    if ($x -lt $minX) { $minX = $x }; if ($y -lt $minY) { $minY = $y }
                    if ($x -gt $maxX) { $maxX = $x }; if ($y -gt $maxY) { $maxY = $y }
                }
            }
        }
        if ($count -eq 0) { throw "PNG alpha is empty: $Path" }
        return [ordered]@{ width=$bitmap.Width; height=$bitmap.Height; nonZeroAlphaPixels=$count; alphaBounds=[ordered]@{left=$minX;top=$minY;right=$maxX;bottom=$maxY} }
    }
    finally { $bitmap.Dispose() }
}

$source = Resolve-RequiredFile $SourcePath 'Source'
Assert-OutsideRuntime $source 'Source'

if ($Mode -eq 'Preflight') {
    $state = [ordered]@{
        schemaVersion = 1
        createdUtc = [DateTime]::UtcNow.ToString('o')
        sourcePath = $source
        sourceSha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $source).Hash
        runtimeStatus = @(Get-RuntimeStatus)
    }
    New-Item -ItemType Directory -Path (Split-Path -Parent $StatePath) -Force | Out-Null
    $state | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $StatePath -Encoding UTF8
    Write-Output "PREFLIGHT PASS | source=$source | session=$StatePath | runtime protected"
    exit 0
}

$normalized = Resolve-RequiredFile $NormalizedPath 'Normalized PNG'
$geometryFile = Resolve-RequiredFile $GeometryPath 'Geometry sidecar'
$passportFile = Resolve-RequiredFile $PassportPath 'Passport'
Assert-OutsideRuntime $normalized 'Normalized PNG'
Assert-OutsideRuntime $geometryFile 'Geometry sidecar'
Assert-OutsideRuntime $passportFile 'Passport'

$session = Get-Content -LiteralPath (Resolve-RequiredFile $StatePath 'Preflight session') -Raw | ConvertFrom-Json
$runtimeAfter = @(Get-RuntimeStatus)
if ((Compare-Object -ReferenceObject @($session.runtimeStatus) -DifferenceObject $runtimeAfter).Count -gt 0) { throw 'Protected runtime status changed after preflight.' }

$geometry = Get-Content -LiteralPath $geometryFile -Raw | ConvertFrom-Json
$passport = Get-Content -LiteralPath $passportFile -Raw | ConvertFrom-Json
$png = Get-PngEvidence $normalized
if ($ExpectedWidth -gt 0 -and $png.width -ne $ExpectedWidth) { throw "Width mismatch: $($png.width) != $ExpectedWidth" }
if ($ExpectedHeight -gt 0 -and $png.height -ne $ExpectedHeight) { throw "Height mismatch: $($png.height) != $ExpectedHeight" }
if ($ExpectedPivotX -ge 0 -and [int]$geometry.pivotPx.x -ne $ExpectedPivotX) { throw 'Pivot X mismatch' }
if ($ExpectedPivotY -ge 0 -and [int]$geometry.pivotPx.y -ne $ExpectedPivotY) { throw 'Pivot Y mismatch' }
if ($ExpectedAssetId -and ($geometry.assetId -ne $ExpectedAssetId -or $passport.assetId -ne $ExpectedAssetId)) { throw 'Asset ID mismatch' }
if ($passport.activationStatus -eq 'INTEGRATED') { throw 'Asset prep must not mark an asset INTEGRATED.' }

$sha = (Get-FileHash -Algorithm SHA256 -LiteralPath $normalized).Hash
Write-Output ("POSTFLIGHT PASS | {0}x{1} | alpha={2} | bounds={3},{4}-{5},{6} | pivot={7},{8} | sha256={9} | runtime unchanged" -f $png.width,$png.height,$png.nonZeroAlphaPixels,$png.alphaBounds.left,$png.alphaBounds.top,$png.alphaBounds.right,$png.alphaBounds.bottom,$geometry.pivotPx.x,$geometry.pivotPx.y,$sha)
