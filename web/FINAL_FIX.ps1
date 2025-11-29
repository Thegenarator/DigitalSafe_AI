# Final Fix for Tailwind CSS - Run this script

Write-Host "=== FINAL TAILWIND FIX ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clear cache
Write-Host "1. Clearing cache..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
Write-Host "   Cache cleared" -ForegroundColor Green

# Step 2: Verify files
Write-Host ""
Write-Host "2. Verifying configuration files..." -ForegroundColor Yellow
$files = @("postcss.config.cjs", "tailwind.config.js", "src\app\globals.css")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "   [MISSING] $file" -ForegroundColor Red
    }
}

# Step 3: Check Tailwind installation
Write-Host ""
Write-Host "3. Checking Tailwind installation..." -ForegroundColor Yellow
$tailwind = npm list tailwindcss 2>&1 | Select-String "tailwindcss@"
if ($tailwind -match "3\.\d+\.\d+") {
    Write-Host "   Tailwind CSS v3 installed" -ForegroundColor Green
} else {
    Write-Host "   Reinstalling Tailwind..." -ForegroundColor Yellow
    npm install -D tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0
}

Write-Host ""
Write-Host "=== READY ===" -ForegroundColor Green
Write-Host "Now run: npm run dev" -ForegroundColor Cyan
Write-Host "Then check: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Look for RED box in top-right corner" -ForegroundColor Yellow
Write-Host ""

