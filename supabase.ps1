$node = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$cli = Join-Path $PSScriptRoot "node_modules\supabase\dist\supabase.js"

if (-not (Test-Path -LiteralPath $node)) {
  Write-Error "No se encontró el runtime de Node incluido en Codex: $node"
  exit 1
}

if (-not (Test-Path -LiteralPath $cli)) {
  Write-Error "Supabase CLI no está instalado. Ejecutá la instalación de dependencias del proyecto."
  exit 1
}

& $node $cli @args
exit $LASTEXITCODE
