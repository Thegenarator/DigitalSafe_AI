# Diagnose Styling Issue - Step by Step

## The Problem
Tailwind CSS classes are not being applied - you see plain text with no styling.

## Quick Test

1. **Open the test page:**
   - Go to: `http://localhost:3000/test-tailwind`
   - You should see colored boxes (red, green, purple)
   - If you see plain text → Tailwind isn't processing

2. **Check browser DevTools:**
   - Press F12
   - Go to **Network** tab
   - Refresh page (Ctrl+R)
   - Look for CSS files (filter by "CSS")
   - Click on the CSS file
   - **Check if it contains Tailwind classes**

3. **Check Console:**
   - Press F12 → **Console** tab
   - Look for any errors related to CSS, PostCSS, or Tailwind

## What to Look For

### If CSS file is empty or missing:
- PostCSS isn't processing Tailwind
- Check `postcss.config.js` exists

### If CSS file exists but has no Tailwind classes:
- Tailwind isn't scanning your files
- Check `tailwind.config.js` content paths

### If you see errors in console:
- Share the exact error message

## Next Steps Based on What You See

**If test page shows colored boxes:**
→ Tailwind works! The issue is with custom colors (ink, brand, etc.)

**If test page shows plain text:**
→ Tailwind isn't processing at all. Need to fix PostCSS/Tailwind setup.

**If page doesn't load:**
→ Check if dev server is running on port 3000

