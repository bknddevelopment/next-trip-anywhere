# 🚀 Deployment Guide - Next Trip Anywhere

## 🎯 What Is This Guide?

This guide shows you how to deploy (publish) the Next Trip Anywhere website to the internet. Think of deployment like moving from rehearsal to the actual show - we're taking our website from your computer to where everyone can see it!

## 📚 Table of Contents

1. [Quick Deploy](#-quick-deploy---get-live-in-5-minutes)
2. [Deployment Overview](#-deployment-overview)
3. [GitHub Pages Deployment](#-github-pages-deployment)
4. [Environment Configuration](#-environment-configuration)
5. [CI/CD Pipeline](#-cicd-pipeline)
6. [Pre-Deployment Checklist](#-pre-deployment-checklist)
7. [Deployment Process](#-deployment-process)
8. [Post-Deployment](#-post-deployment)
9. [Monitoring](#-monitoring)
10. [Rollback Procedures](#-rollback-procedures)
11. [Troubleshooting](#-troubleshooting)
12. [Alternative Deployment Options](#-alternative-deployment-options)

## 🏃 Quick Deploy - Get Live in 5 Minutes!

### The Fastest Way to Deploy

```bash
# Step 1: Make sure everything works
npm run build

# Step 2: Deploy to GitHub Pages
npm run deploy

# Step 3: Visit your live site!
# https://[your-username].github.io/next-trip-anywhere/
```

**That's it! Your site is live!** 🎉

## 🌐 Deployment Overview

### How Deployment Works

```
Your Computer → GitHub → GitHub Actions → GitHub Pages → Live Website
      📻           📤           🔧             📡            🌍
```

### Current Deployment Setup

- **Hosting**: GitHub Pages (free!)
- **Domain**: `bknddevelopment.github.io/next-trip-anywhere`
- **Type**: Static Site (no server needed)
- **CDN**: GitHub's global CDN
- **SSL**: Automatic HTTPS

## 📦 GitHub Pages Deployment

### Initial Setup (One Time Only)

#### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Source: Deploy from a branch
4. Branch: `gh-pages` / `root`
5. Click **Save**

#### Step 2: Configure Your Project

The project is already configured, but here's what makes it work:

```javascript
// next.config.js
module.exports = {
  output: 'export', // Creates static files
  basePath: '/next-trip-anywhere', // GitHub subdirectory
  assetPrefix: '/next-trip-anywhere/', // Asset paths
  images: {
    unoptimized: true, // Required for static export
    loader: 'custom', // Custom image loading
    loaderFile: './lib/imageLoader.js',
  },
}
```

#### Step 3: Install Dependencies

```bash
# Make sure you have gh-pages installed
npm install --save-dev gh-pages
```

### Manual Deployment Process

#### Step 1: Build the Project

```bash
npm run build
```

This command:

- Creates optimized production build
- Generates static HTML files
- Runs path-fixing script
- Outputs to `/out` directory

#### Step 2: Deploy to GitHub Pages

```bash
npm run deploy
```

This command:

- Adds `.nojekyll` file (allows \_next folder)
- Pushes to `gh-pages` branch
- Deploys with dotfiles enabled

#### Step 3: Verify Deployment

1. Wait 2-5 minutes for GitHub to process
2. Visit: `https://[username].github.io/next-trip-anywhere/`
3. Check all pages load correctly
4. Verify CSS and images work

## 🔧 Environment Configuration

### Environment Variables

#### Development (.env.local)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_KEY=dev-key-12345

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_CHAT=false

# Development Tools
NEXT_PUBLIC_DEBUG=true
```

#### Production (.env.production)

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.nexttripanywhere.com
NEXT_PUBLIC_API_KEY=prod-key-secure-xyz

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CHAT=true

# Production Settings
NEXT_PUBLIC_DEBUG=false
```

### Setting Environment Variables

#### For Local Development

```bash
# Create .env.local file
touch .env.local

# Add your variables
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" >> .env.local
```

#### For GitHub Actions

1. Go to Repository Settings
2. Click **Secrets and variables** → **Actions**
3. Add repository secrets:
   - `PRODUCTION_API_KEY`
   - `ANALYTICS_ID`
   - etc.

## 🔄 CI/CD Pipeline

### Automatic Deployment Setup

#### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.PRODUCTION_API_URL }}

      - name: Deploy to GitHub Pages
        run: npm run deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Pipeline Stages

```
Code Push → Install → Test → Build → Deploy → Verify
    📤        📦       🧪      🔨       🚀       ✅
```

Each stage must pass before moving to the next!

## ✅ Pre-Deployment Checklist

### Before Every Deployment

#### Code Quality

- [ ] All tests pass (`npm test`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code formatted (`npm run format`)

#### Functionality

- [ ] All pages load correctly
- [ ] Forms work properly
- [ ] Images display
- [ ] Links are not broken
- [ ] Mobile responsive

#### Performance

- [ ] Lighthouse score > 90
- [ ] Bundle size < 200KB
- [ ] Images optimized
- [ ] No console errors

#### Security

- [ ] No API keys in code
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] Input validation working

## 📋 Deployment Process

### Step-by-Step Deployment

#### Phase 1: Preparation

```bash
# 1. Switch to main branch
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Install dependencies
npm install

# 4. Run all checks
npm run lint
npm run typecheck
npm test
```

#### Phase 2: Build

```bash
# 1. Clean previous build
rm -rf out/

# 2. Build production version
npm run build

# 3. Test the build locally
npx serve out
# Visit http://localhost:3000/next-trip-anywhere
```

#### Phase 3: Deploy

```bash
# 1. Deploy to GitHub Pages
npm run deploy

# 2. Check deployment status
# Go to: https://github.com/[username]/next-trip-anywhere/actions
```

#### Phase 4: Verify

1. Visit live site
2. Test all pages
3. Check console for errors
4. Verify analytics working
5. Test forms

## 📊 Post-Deployment

### Immediate Tasks

#### 1. Smoke Testing

Test critical paths:

- Homepage loads
- Navigation works
- Forms submit
- Images display
- No 404 errors

#### 2. Performance Check

```bash
# Run Lighthouse
npx lighthouse https://[username].github.io/next-trip-anywhere
```

#### 3. SEO Verification

- Check meta tags
- Verify sitemap
- Test social sharing

### Monitoring Setup

#### Google Analytics

```javascript
// Add to app/layout.tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
```

#### Error Tracking (Sentry)

```javascript
// lib/monitoring/sentry.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: 'production',
})
```

## 📈 Monitoring

### What to Monitor

#### Performance Metrics

- Page load time
- Time to interactive
- Core Web Vitals
- Error rate

#### User Metrics

- Page views
- Bounce rate
- Conversion rate
- User flow

#### System Metrics

- Build success rate
- Deployment frequency
- Uptime percentage

### Monitoring Tools

| Tool             | Purpose        | Setup             |
| ---------------- | -------------- | ----------------- |
| Google Analytics | User behavior  | Add tracking code |
| GitHub Actions   | Build status   | Automatic         |
| Lighthouse CI    | Performance    | GitHub Action     |
| Sentry           | Error tracking | Add DSN           |

## 🔙 Rollback Procedures

### When Things Go Wrong

#### Quick Rollback

```bash
# 1. Find the last good commit
git log --oneline

# 2. Revert to that commit
git revert HEAD

# 3. Push the revert
git push origin main

# 4. Redeploy
npm run deploy
```

#### Manual Rollback

```bash
# 1. Checkout previous version
git checkout <previous-commit-hash>

# 2. Create rollback branch
git checkout -b rollback-fix

# 3. Build and test
npm run build
npm test

# 4. Deploy
npm run deploy
```

### Rollback Strategy

```
Issue Detected → Stop Deploy → Assess Impact → Rollback → Fix → Redeploy
      🚨            ⛔           📊            🔙       🔧       🚀
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Problem: "404 - Page not found"

**Solution**:

```bash
# Check if gh-pages branch exists
git branch -r | grep gh-pages

# If not, create it
git checkout --orphan gh-pages
git rm -rf .
echo "Initializing gh-pages" > index.html
git add .
git commit -m "Initialize gh-pages"
git push origin gh-pages
```

#### Problem: "CSS not loading"

**Solution**:

1. Check `.nojekyll` file exists
2. Verify basePath in next.config.js
3. Clear browser cache
4. Check paths in HTML

#### Problem: "Build failing"

**Solution**:

```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

#### Problem: "Images not showing"

**Solution**:

1. Check image paths include basePath
2. Verify imageLoader configuration
3. Ensure images are in public folder
4. Check file extensions (case-sensitive)

### Deployment Logs

#### Where to Find Logs

1. **GitHub Actions**:
   - Go to Actions tab in repository
   - Click on workflow run
   - View step outputs

2. **Local Build**:

   ```bash
   npm run build > build.log 2>&1
   cat build.log
   ```

3. **Browser Console**:
   - Open DevTools (F12)
   - Check Console tab
   - Look for red errors

## 🌍 Alternative Deployment Options

### Other Platforms You Can Use

#### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

**Pros**:

- Automatic deployments
- Preview URLs
- Analytics included
- Optimized for Next.js

#### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**Pros**:

- Easy setup
- Form handling
- Split testing
- Free tier generous

#### AWS S3 + CloudFront

```bash
# Install AWS CLI
brew install awscli

# Configure AWS
aws configure

# Deploy
aws s3 sync out/ s3://your-bucket --delete
aws cloudfront create-invalidation --distribution-id ABCD --paths "/*"
```

**Pros**:

- Scalable
- Global CDN
- Custom domains
- Professional

### Comparison Table

| Platform     | Cost        | Difficulty | Features   | Best For     |
| ------------ | ----------- | ---------- | ---------- | ------------ |
| GitHub Pages | Free        | Easy       | Basic      | Simple sites |
| Vercel       | Free tier   | Easy       | Advanced   | Next.js apps |
| Netlify      | Free tier   | Easy       | Good       | Static sites |
| AWS          | Pay per use | Hard       | Enterprise | Large scale  |

## 📝 Deployment Scripts

### Useful Scripts

#### Full Deploy Script

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting deployment..."

# Run tests
echo "🧪 Running tests..."
npm test || exit 1

# Build
echo "🔨 Building project..."
npm run build || exit 1

# Deploy
echo "📤 Deploying to GitHub Pages..."
npm run deploy || exit 1

echo "✅ Deployment complete!"
echo "🌍 Visit: https://bknddevelopment.github.io/next-trip-anywhere/"
```

#### Health Check Script

```bash
#!/bin/bash
# health-check.sh

URL="https://bknddevelopment.github.io/next-trip-anywhere/"

echo "🏥 Checking site health..."

# Check if site is up
if curl -f -s -I "$URL" > /dev/null; then
    echo "✅ Site is up!"
else
    echo "❌ Site is down!"
    exit 1
fi

# Check response time
TIME=$(curl -o /dev/null -s -w '%{time_total}' "$URL")
echo "⏱️ Response time: ${TIME}s"
```

## 🎯 Best Practices

### Deployment Do's and Don'ts

#### Do's ✅

- Always test before deploying
- Use version tags for releases
- Monitor after deployment
- Keep backups
- Document changes
- Use staging environment

#### Don'ts ❌

- Deploy on Fridays
- Skip testing
- Ignore warnings
- Deploy without backup
- Use production for testing
- Commit secrets

## 🆘 Getting Help

### Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Repository Issues](https://github.com/bknddevelopment/next-trip-anywhere/issues)

### Support Channels

1. **GitHub Issues**: Bug reports and features
2. **Discussions**: Questions and help
3. **Stack Overflow**: Community support

---

**Remember**: Deployment is like launching a rocket - preparation is key, but once it's up, it's amazing! 🚀🌟
