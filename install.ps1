param (
    [string]$Skill = "all",
    [string]$Destination = ""
)

$ErrorActionPreference = "Stop"

if (-not $Destination) {
    if (Test-Path ".agents/skills") {
        $Destination = ".agents/skills"
    } else {
        $Destination = ".gemini/skills"
    }
}

New-Item -ItemType Directory -Force -Path $Destination | Out-Null

Write-Host "📦 Installing skill(s): '$Skill' into '$Destination'..." -ForegroundColor Cyan

$tempZip = Join-Path $env:TEMP "skill_repo_$([System.Guid]::NewGuid()).zip"
$tempExt = Join-Path $env:TEMP "skill_repo_$([System.Guid]::NewGuid())"

try {
    Invoke-WebRequest -Uri "https://github.com/rawenergon/skill/archive/refs/heads/main.zip" -OutFile $tempZip
    Expand-Archive -Path $tempZip -DestinationPath $tempExt -Force

    $skillsSrc = Join-Path $tempExt "skill-main\skills"
    if (-not (Test-Path $skillsSrc)) {
        $skillsSrc = (Get-ChildItem -Directory -Path $tempExt | Select-Object -First 1).FullName + "\skills"
    }

    if ($Skill -eq "all") {
        Copy-Item -Path "$skillsSrc\*" -Destination $Destination -Recurse -Force
        Write-Host "✅ All 45 agent skills successfully installed into $Destination" -ForegroundColor Green
    } else {
        $singleSrc = Join-Path $skillsSrc $Skill
        if (Test-Path $singleSrc) {
            Copy-Item -Path $singleSrc -Destination $Destination -Recurse -Force
            Write-Host "✅ Skill '$Skill' successfully installed into $Destination\$Skill" -ForegroundColor Green
        } else {
            Write-Error "❌ Error: Skill '$Skill' not found in repository."
        }
    }
} finally {
    if (Test-Path $tempZip) { Remove-Item -Force $tempZip }
    if (Test-Path $tempExt) { Remove-Item -Recurse -Force $tempExt }
}
