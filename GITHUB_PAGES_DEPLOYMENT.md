# GitHub Pages Deployment Guide

## 🎯 Overview

This Next.js 15 application is configured to deploy correctly to GitHub Pages with full CSS styling and functionality.

## ✅ What's Been Fixed

### 1. **Base Path Configuration**

- Added `basePath: '/next-trip-anywhere'` to `next.config.js`
- Added `assetPrefix: '/next-trip-anywhere'` for correct asset serving

### 2. **Custom Image Loader**

- Created `lib/imageLoader.js` to handle image paths correctly
- Ensures local images are served with the correct base path

### 3. **Path Fixing Script**

- Created `scripts/fix-paths.js` that runs after build
- Automatically updates all asset paths in HTML files
- Fixes image sources, favicons, and meta tags

### 4. **.nojekyll File**

- Added to `public/` directory
- Ensures GitHub Pages serves `_next` directory correctly

### 5. **Build Process**

- Modified `package.json` scripts to include path fixing
- Deploy script creates `.nojekyll` and uses correct gh-pages flags

## 📦 Key Files Modified/Created

```
next-trip-anywhere/
├── next.config.js          # Base path and asset configuration
├── lib/
│   ├── imageLoader.js      # Custom image loader for GitHub Pages
│   └── config.ts           # Base path utilities
├── scripts/
│   └── fix-paths.js        # Post-build path fixing script
├── public/
│   └── .nojekyll          # GitHub Pages configuration
└── package.json           # Updated build and deploy scripts
```

## 🚀 Deployment Commands

### Build the Project

```bash
npm run build
```

This will:

1. Build the Next.js static export
2. Run the path fixing script automatically
3. Output to the `out/` directory

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will:

1. Build the project
2. Add `.nojekyll` file to output
3. Push to the `gh-pages` branch
4. Deploy to GitHub Pages

## 🧪 Testing Locally

To test the production build locally with GitHub Pages paths:

```bash
# Install a static server
npm install -g serve

# Build the project
npm run build

# Serve from the out directory
cd out
serve -p 8080

# Visit http://localhost:8080/next-trip-anywhere/
```

## 🔍 Verification Checklist

After deployment, verify:

- [ ] CSS loads correctly (site has styling, not plain HTML)
- [ ] Images display properly
- [ ] JavaScript functionality works
- [ ] Navigation between pages works
- [ ] Fonts load correctly
- [ ] No console errors about missing assets

## 🌐 Live URL

Once deployed, your site will be available at:

```
https://bknddevelopment.github.io/next-trip-anywhere/
```

## 🛠️ How It Works

### The Problem

Next.js 15 with App Router doesn't automatically adjust asset paths for GitHub Pages subdirectory hosting. This causes CSS, JS, and images to fail loading.

### The Solution

1. **Base Path**: Tells Next.js to prefix all internal links
2. **Asset Prefix**: Ensures static assets use the correct path
3. **Custom Image Loader**: Handles image paths dynamically
4. **Post-Build Script**: Fixes any remaining hardcoded paths in HTML
5. **.nojekyll**: Allows GitHub Pages to serve `_next` directory

### Path Structure

All assets are now served with the `/next-trip-anywhere/` prefix:

- CSS: `/next-trip-anywhere/_next/static/css/[hash].css`
- JS: `/next-trip-anywhere/_next/static/chunks/[hash].js`
- Images: `/next-trip-anywhere/[imagename].[ext]`

## 🐛 Troubleshooting

### CSS Not Loading

- Check browser console for 404 errors
- Verify `.nojekyll` file exists in the `gh-pages` branch
- Ensure base path matches your repository name

### Images Not Showing

- Check image paths in browser DevTools
- Verify images are in the `public/` directory
- Ensure image loader is working correctly

### 404 Errors

- Wait 5-10 minutes after deployment for GitHub Pages to update
- Check that `gh-pages` branch exists and has content
- Verify GitHub Pages is enabled in repository settings

## 📝 Notes

- The site uses static export (`output: 'export'`)
- All pages are pre-rendered at build time
- No server-side rendering or API routes
- Optimized for GitHub Pages static hosting

## 🔄 Future Updates

When making changes:

1. Always run `npm run build` locally first
2. Test the build in the `out/` directory
3. Deploy with `npm run deploy`
4. Allow 2-5 minutes for GitHub Pages to update

## 💡 Tips

- Clear browser cache if changes don't appear
- Use incognito/private browsing to test deployments
- Check GitHub Actions tab for deployment status
- The `gh-pages` branch is managed automatically - don't edit it directly
