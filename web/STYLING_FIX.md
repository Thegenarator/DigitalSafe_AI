# Fix Styling Issues - PowerShell Commands

## Step 1: Clear All Caches
```powershell
cd C:\Users\MK\Desktop\DigitalSafe_AI\web
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
```

## Step 2: Verify Tailwind Installation
```powershell
npm list tailwindcss
```
Should show: `tailwindcss@3.4.18`

## Step 3: Verify PostCSS Config
```powershell
Get-Content postcss.config.js
```
Should show CommonJS format (module.exports)

## Step 4: Start Dev Server
```powershell
npm run dev
```

## Step 5: Check Browser
1. Open http://localhost:3000
2. Press F12 (DevTools)
3. Go to Network tab
4. Refresh page (Ctrl+R)
5. Look for CSS files loading
6. Check Console for errors

## If Still Not Working:

### Test 1: Check if basic Tailwind works
Add this to any component temporarily:
```tsx
<div className="bg-red-500 text-white p-4">Test</div>
```
If this shows red background, Tailwind works but custom colors don't.

### Test 2: Check generated CSS
In browser DevTools → Elements → Find `<style>` tag or check Network → CSS files
Look for Tailwind classes being generated.

### Test 3: Reinstall Tailwind
```powershell
npm uninstall tailwindcss autoprefixer
npm install -D tailwindcss@^3.4.0 autoprefixer@^10.4.0
```

### Test 4: Check Next.js version compatibility
```powershell
npm list next
```
Next.js 13.5 should work fine with Tailwind 3.4

