# DigiSafe AI - Fix Styling Script (PowerShell)
# Run this script to fix Tailwind CSS styling issues

Write-Host "Fixing DigiSafe AI Styling..." -ForegroundColor Cyan

# Step 1: Clear Next.js cache
Write-Host ""
Write-Host "1. Clearing .next cache..." -ForegroundColor Yellow
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
    Write-Host "   ✓ Cleared .next cache" -ForegroundColor Green
} else {
    Write-Host "   ℹ .next folder not found (that's okay)" -ForegroundColor Gray
}

# Step 2: Clear node_modules/.cache if it exists
Write-Host ""
Write-Host "2. Clearing node_modules cache..." -ForegroundColor Yellow
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "   ✓ Cleared node_modules cache" -ForegroundColor Green
}

# Step 3: Verify Tailwind is installed
Write-Host ""
Write-Host "3. Verifying Tailwind CSS installation..." -ForegroundColor Yellow
$tailwindVersion = npm list tailwindcss 2>&1 | Select-String "tailwindcss@"
if ($tailwindVersion -match "3\.\d+\.\d+") {
    Write-Host "   ✓ Tailwind CSS v3 is installed" -ForegroundColor Green
} else {
    Write-Host "   ⚠ Tailwind version issue detected" -ForegroundColor Red
    Write-Host "   Installing Tailwind CSS v3..." -ForegroundColor Yellow
    npm install -D tailwindcss@^3.4.0 autoprefixer
}

# Step 4: Verify PostCSS config
Write-Host ""
Write-Host "4. Checking PostCSS configuration..." -ForegroundColor Yellow
if (Test-Path "postcss.config.mjs") {
    $postcssContent = Get-Content "postcss.config.mjs" -Raw
    if ($postcssContent -match "tailwindcss") {
        Write-Host "   ✓ PostCSS config looks good" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ PostCSS config may need updating" -ForegroundColor Yellow
    }
}

# Step 5: Verify globals.css
Write-Host ""
Write-Host "5. Checking globals.css..." -ForegroundColor Yellow
if (Test-Path "src\app\globals.css") {
    $cssContent = Get-Content "src\app\globals.css" -Raw
    if ($cssContent -match "@tailwind") {
        Write-Host "   ✓ globals.css has Tailwind directives" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ globals.css may be missing Tailwind directives" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "   1. Run: npm run dev" -ForegroundColor White
Write-Host "   2. Open: http://localhost:3000" -ForegroundColor White
Write-Host "   3. If styles still don't work, check browser console for errors" -ForegroundColor White
Write-Host ""

