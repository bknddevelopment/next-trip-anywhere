# GitHub Pages Deployment Fix

## Problem Identified

Your GitHub Pages site isn't displaying because of a **configuration mismatch**:

1. **GitHub Pages Settings**: Configured to deploy from `main` branch `/docs` folder
2. **Actual Build Output**: Located in `/out` folder
3. **CI/CD Workflow**: Deploys to `gh-pages` branch (different approach)

## Solution Options

### Option 1: Quick Fix - Copy out to docs (RECOMMENDED)

Run these commands in your terminal:

```bash
# Make the script executable
chmod +x copy-to-docs.sh

# Run the script to copy out to docs
./copy-to-docs.sh

# Add, commit and push
git add docs/
git commit -m "Add docs folder for GitHub Pages deployment"
git push
```

Your site will be live at: https://bknddevelopment.github.io/next-trip-anywhere/

### Option 2: Change GitHub Pages Settings

1. Go to Settings → Pages in your GitHub repository
2. Change Source from "Deploy from a branch" to "GitHub Actions"
3. The existing CI/CD workflow will handle deployment automatically

### Option 3: Use gh-pages branch (Already Working)

Your CI/CD workflow already deploys to `gh-pages` branch. To use this:

1. Go to Settings → Pages
2. Change Branch from `main` to `gh-pages`
3. Change folder from `/docs` to `/ (root)`
4. Click Save

The site should already be built there from your last push to main.

## Automated Solution for Future Builds

I've created a `deploy-to-docs.sh` script that:
1. Builds your Next.js project
2. Copies the output to `/docs`
3. Adds the necessary `.nojekyll` file

To use it for future deployments:

```bash
chmod +x deploy-to-docs.sh
./deploy-to-docs.sh
git add docs/
git commit -m "Update GitHub Pages site"
git push
```

## Why This Happened

Next.js exports static sites to the `/out` folder by default, but GitHub Pages was looking in `/docs`. The CI/CD workflow was set up to use a different deployment method (gh-pages branch) which wasn't aligned with your repository settings.

## Verification Steps

After implementing any solution above:

1. Wait 2-5 minutes for GitHub Pages to update
2. Visit https://bknddevelopment.github.io/next-trip-anywhere/
3. Check the Actions tab for deployment status
4. If issues persist, check Settings → Pages for the deployment status

## Files Created

- `copy-to-docs.sh` - Simple script to copy out → docs
- `deploy-to-docs.sh` - Full build and deploy script
- `docs/.nojekyll` - Prevents Jekyll processing (required for Next.js)

Choose Option 1 for the quickest fix!