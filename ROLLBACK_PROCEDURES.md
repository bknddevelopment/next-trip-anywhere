# Rollback Procedures & Incident Response

## Overview
This document outlines rollback procedures for the Next Trip Anywhere application deployed on GitHub Pages. Time estimates are provided for each procedure based on the severity and complexity of the rollback required.

## Rollback Decision Matrix

| Severity | Impact | Examples | Rollback Time | Method |
|----------|--------|----------|---------------|--------|
| CRITICAL | Site completely down | Build failure, 500 errors | < 5 minutes | Immediate rollback |
| HIGH | Major functionality broken | Booking forms not working, navigation broken | < 15 minutes | Standard rollback |
| MEDIUM | Partial functionality affected | Some images not loading, minor UI issues | < 30 minutes | Selective fix or rollback |
| LOW | Cosmetic issues only | Styling inconsistencies, typos | Next release | Hot fix forward |

## Immediate Rollback Procedures (< 5 minutes)

### Method 1: GitHub Pages Branch Switch
**Use when:** Deployment branch is corrupted or build is completely broken

```bash
# 1. Go to GitHub repository settings
# 2. Navigate to Pages settings
# 3. Change source branch from 'gh-pages' to a previous stable branch
# 4. Save changes - GitHub will automatically redeploy

# Via GitHub CLI:
gh api repos/:owner/:repo/pages \
  --method PUT \
  --field source.branch=stable-backup \
  --field source.path=/
```

### Method 2: Git Revert (Automated)
**Use when:** Latest commit caused the issue

```bash
# This is automated in the GitHub Actions workflow
# Manual override if needed:
git checkout gh-pages
git revert HEAD --no-edit
git push origin gh-pages --force-with-lease
```

### Method 3: Emergency DNS Redirect
**Use when:** Custom domain is configured and site needs immediate removal

```bash
# Update DNS records to point to maintenance page
# Or remove CNAME record temporarily
```

## Standard Rollback Procedures (< 30 minutes)

### Method 1: Tag-based Rollback
**Use when:** Need to rollback to a specific version

```bash
# List available tags
git tag -l "v*"

# Checkout specific version
git checkout tags/v1.0.0

# Create rollback branch
git checkout -b rollback/v1.0.0-$(date +%Y%m%d)

# Build and deploy
npm ci
npm run build
cp -r .next-build/* docs/
git add docs/
git commit -m "Rollback to v1.0.0"
git push origin rollback/v1.0.0-$(date +%Y%m%d)

# Update GitHub Pages to use rollback branch
gh api repos/:owner/:repo/pages \
  --method PUT \
  --field source.branch=rollback/v1.0.0-$(date +%Y%m%d) \
  --field source.path=/docs
```

### Method 2: Commit-based Rollback
**Use when:** Need to rollback to a specific commit

```bash
# Find the last known good commit
git log --oneline -20

# Create branch from that commit
git checkout -b rollback/emergency <commit-hash>

# Deploy process
npm ci
npm run build
git add -A
git commit -m "Emergency rollback to <commit-hash>"
git push origin rollback/emergency

# Switch GitHub Pages to rollback branch
```

### Method 3: Manual Build Restoration
**Use when:** Build artifacts are corrupted but code is fine

```bash
# Download previous build artifact from GitHub Actions
gh run download <run-id> -n production-build

# Extract and deploy
unzip production-build.zip -d emergency-deploy/
cd emergency-deploy/
git init
git add -A
git commit -m "Emergency restoration from build <run-id>"
git remote add origin git@github.com:owner/repo.git
git push -f origin HEAD:gh-pages
```

## Complex Rollback Procedures (Requires Planning)

### Database Migration Rollback
**Note:** Not applicable for static site, but documented for future use

```bash
# If database changes were made:
# 1. Backup current data
# 2. Run reverse migrations
# 3. Restore previous schema
# 4. Verify data integrity
```

### Multi-Service Rollback
**Use when:** Multiple components need coordination

1. **Identify affected services**
   - Frontend (GitHub Pages)
   - APIs (if any)
   - CDN cache
   - Third-party integrations

2. **Coordinate rollback sequence**
   ```bash
   # 1. Put site in maintenance mode
   echo "Under maintenance" > docs/index.html
   git commit -am "Maintenance mode"
   git push origin gh-pages
   
   # 2. Rollback services in order
   # 3. Clear CDN cache
   # 4. Restore normal operation
   ```

## Rollback Verification Checklist

After any rollback, verify:

- [ ] Site is accessible
- [ ] Previous version number is displayed
- [ ] Core functionality works:
  - [ ] Homepage loads
  - [ ] Navigation functions
  - [ ] Forms submit
  - [ ] Images display
- [ ] No console errors
- [ ] Analytics tracking works
- [ ] Performance metrics acceptable

## Communication During Rollback

### Internal Communication
```markdown
**ROLLBACK IN PROGRESS**
Severity: [CRITICAL/HIGH/MEDIUM/LOW]
Issue: [Brief description]
Impact: [User impact]
Started: [Time]
ETA: [Estimated completion]
Lead: [Person managing rollback]
```

### External Communication (if needed)
```markdown
We are currently experiencing technical difficulties with our website.
Our team is actively working on a resolution.
Expected resolution time: [ETA]
For urgent inquiries, please contact: [alternative contact]
```

## Post-Rollback Actions

### Immediate (Within 1 hour)
1. **Verify Stability**
   ```bash
   # Monitor for 30 minutes
   curl -I https://site.com
   # Check error logs
   # Monitor user reports
   ```

2. **Document Incident**
   - What failed?
   - When did it fail?
   - How was it detected?
   - What was the impact?
   - How was it resolved?

### Short-term (Within 24 hours)
1. **Root Cause Analysis**
   - Review deployment logs
   - Analyze code changes
   - Check dependencies
   - Review test coverage

2. **Create Fix**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/rollback-issue
   # Apply fixes
   npm test
   git commit -am "Fix: [issue description]"
   git push origin hotfix/rollback-issue
   ```

### Long-term (Within 1 week)
1. **Post-mortem Meeting**
   - Timeline review
   - Impact assessment
   - Process improvements
   - Action items

2. **Update Procedures**
   - Enhance monitoring
   - Improve tests
   - Update documentation
   - Refine rollback process

## Monitoring & Alerts

### Set Up Monitoring
```bash
# GitHub Actions status
gh workflow list --all

# Site availability (using external service)
curl -o /dev/null -s -w "%{http_code}\n" https://site.com

# Performance metrics
lighthouse https://site.com --output json --output-path ./metrics.json
```

### Alert Channels
- **Primary:** GitHub Actions notifications
- **Secondary:** Email to team
- **Emergency:** Slack webhook (if configured)
- **Escalation:** Phone call to on-call engineer

## Prevention Strategies

### Before Deployment
- [ ] Run full test suite
- [ ] Check build locally
- [ ] Review changes carefully
- [ ] Have rollback plan ready
- [ ] Notify team of deployment

### During Deployment
- [ ] Monitor deployment progress
- [ ] Be ready to abort
- [ ] Keep communication open
- [ ] Document any issues

### After Deployment
- [ ] Monitor for 30 minutes
- [ ] Check key metrics
- [ ] Gather user feedback
- [ ] Document lessons learned

## Emergency Contacts

| Role | Contact | When to Contact |
|------|---------|-----------------|
| DevOps Lead | Via Slack/Email | First point of contact |
| Technical Lead | Via Slack/Email | Architecture decisions |
| Product Owner | Via Slack/Email | User impact assessment |
| On-Call Engineer | Via PagerDuty | After hours emergencies |

## Quick Reference Commands

```bash
# View recent deployments
gh run list --workflow=deploy-production.yml

# Check current deployed version
curl https://site.com/deployment-manifest.json

# Quick rollback
git checkout gh-pages && git revert HEAD && git push

# Check site status
curl -I https://site.com | head -n 1

# Clear CDN cache (if applicable)
# Depends on CDN provider

# View error logs (from monitoring service)
# Depends on monitoring setup
```

## Recovery Time Objectives (RTO)

| Scenario | Target RTO | Actual RTO | Method |
|----------|------------|------------|--------|
| Complete site failure | 5 minutes | 3-5 minutes | Branch switch |
| Broken functionality | 15 minutes | 10-20 minutes | Git revert |
| Performance degradation | 30 minutes | 20-40 minutes | Selective rollback |
| Data corruption | N/A | N/A | Static site only |

## Lessons Learned Log

Document all rollback events here:

| Date | Issue | Resolution | Time to Resolve | Lessons Learned |
|------|-------|------------|-----------------|-----------------|
| | | | | |
| | | | | |
| | | | | |

---

**Remember:** The goal is to restore service as quickly as possible. Don't try to fix forward during an incident - rollback first, then fix properly.