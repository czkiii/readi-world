[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$PathPlan
)

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$artRoot = [IO.Path]::GetFullPath((Join-Path $repoRoot 'art-source')).TrimEnd('\') + '\'
$runtimeRoot = [IO.Path]::GetFullPath((Join-Path $repoRoot 'runtime')).TrimEnd('\') + '\'
$planFile = (Resolve-Path -LiteralPath $PathPlan).Path
$plan = Get-Content -LiteralPath $planFile -Raw | ConvertFrom-Json

if ([int]$plan.schemaVersion -ne 1) { throw 'Unsupported path-plan schema.' }
if (-not $plan.planId -or -not $plan.assetId -or -not $plan.revision) { throw 'Path plan identity is incomplete.' }

function Resolve-ArtPath([string]$RelativePath, [string]$Label) {
    if (-not $RelativePath) { throw "$Label path is empty." }
    $full = [IO.Path]::GetFullPath((Join-Path $repoRoot $RelativePath))
    if ($full.StartsWith($runtimeRoot, [StringComparison]::OrdinalIgnoreCase)) { throw "$Label points into protected runtime: $full" }
    if (-not $full.StartsWith($artRoot, [StringComparison]::OrdinalIgnoreCase)) { throw "$Label must stay under art-source: $full" }
    return $full
}

$resolvedDirectories = [ordered]@{}
foreach ($property in $plan.directories.PSObject.Properties) {
    $full = Resolve-ArtPath $property.Value "directory.$($property.Name)"
    New-Item -ItemType Directory -Path $full -Force | Out-Null
    $resolvedDirectories[$property.Name] = $full
}

$resolvedFiles = [ordered]@{}
foreach ($property in $plan.files.PSObject.Properties) {
    $full = Resolve-ArtPath $property.Value "file.$($property.Name)"
    $parent = Split-Path -Parent $full
    if (-not (Test-Path -LiteralPath $parent -PathType Container)) { throw "Parent directory was not declared or created: $parent" }
    $resolvedFiles[$property.Name] = $full
}

$resolvedMapPath = Resolve-ArtPath $plan.resolvedMap 'resolvedMap'
$resolved = [ordered]@{
    schemaVersion = 1
    planId = $plan.planId
    assetId = $plan.assetId
    familyId = $plan.familyId
    revision = $plan.revision
    promptRunId = $plan.promptRunId
    generatedUtc = [DateTime]::UtcNow.ToString('o')
    sourcePlan = $planFile
    directories = $resolvedDirectories
    files = $resolvedFiles
    protectedRuntime = $runtimeRoot.TrimEnd('\')
}
$resolved | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $resolvedMapPath -Encoding UTF8

Write-Output "PATHS READY | plan=$($plan.planId) | directories=$($resolvedDirectories.Count) | map=$resolvedMapPath | runtime protected"
