# Production Deployment Checklist
**Version:** 1.0.0
**Target:** GitHub Pages
**Date:** ___________

## Pre-Deployment Phase

### Code Quality & Testing
- [ ] All tests pass: `npm test`
- [ ] TypeScript compilation successful: `npm run typecheck`
- [ ] ESLint passes (currently disabled - fix before production): `npm run lint`
- [ ] No console.log statements in production code
- [ ] All TODO comments addressed or documented

### Build Verification
- [ ] Production build successful: `npm run build`
- [ ] **BLOCKER: Fix cruises page module error**
- [ ] All routes tested in production build
- [ ] Static export generates all expected pages
- [ ] Images load correctly with custom loader
- [ ] No 404 errors on critical paths

### Environment Configuration
- [ ] Production environment variables configured:
  - [ ] DATABASE_URL (real connection string)
  - [ ] REDIS_URL (production Redis)
  - [ ] SESSION_SECRET (secure, unique value)
  - [ ] JWT_SECRET (secure, unique value)
  - [ ] ENCRYPTION_KEY (secure, unique value)
  - [ ] SENTRY_DSN (production project)
  - [ ] GA_MEASUREMENT_ID (production tracking)
  - [ ] GTM_ID (production container)
  - [ ] SMTP credentials (production email)
  - [ ] Payment API keys (production keys)
  - [ ] Weather/Maps API keys
- [ ] Secrets added to GitHub repository settings
- [ ] No sensitive data in committed files

### SEO & Accessibility
- [ ] Sitemap.xml present and valid
- [ ] Robots.txt configured correctly
- [ ] Meta tags on all pages
- [ ] Open Graph tags configured
- [ ] Schema markup validated
- [ ] Alt text on all images
- [ ] ARIA labels where needed

### Performance
- [ ] Lighthouse score > 90 for all metrics
- [ ] Bundle size within acceptable limits
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Critical CSS inlined
- [ ] Fonts optimized

### Security
- [ ] CSP headers configured (at hosting level)
- [ ] API endpoints secured (if applicable)
- [ ] Form validation on client and server
- [ ] XSS protection verified
- [ ] Secrets properly managed
- [ ] HTTPS enforced

## Deployment Phase

### GitHub Repository Setup
- [ ] Main branch protected
- [ ] Required reviews configured
- [ ] CI/CD workflows enabled
- [ ] GitHub Pages enabled
- [ ] Custom domain configured (if applicable)
- [ ] Deploy key configured

### Deployment Execution
- [ ] Create git tag for release: `git tag -a v1.0.0 -m "Release v1.0.0"`
- [ ] Push tag to origin: `git push origin v1.0.0`
- [ ] Verify GitHub Action triggered
- [ ] Monitor build progress
- [ ] Check deployment to gh-pages branch
- [ ] Verify GitHub Pages build successful

### DNS & Domain (if custom domain)
- [ ] CNAME record configured
- [ ] SSL certificate active
- [ ] WWW redirect configured
- [ ] Old site redirects in place

## Post-Deployment Phase

### Immediate Verification (First 5 minutes)
- [ ] Site accessible at production URL
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Images display properly
- [ ] Forms submit successfully
- [ ] No console errors
- [ ] Mobile responsive working

### Functional Testing (First 30 minutes)
- [ ] Test all major user flows:
  - [ ] Browse destinations
  - [ ] Search functionality
  - [ ] Contact form submission
  - [ ] Location pages load
  - [ ] Service pages load
- [ ] Check all external integrations:
  - [ ] Analytics tracking
  - [ ] GTM firing
  - [ ] Maps loading (if applicable)
- [ ] Verify error pages:
  - [ ] 404 page displays correctly
  - [ ] Error boundaries working

### Performance Monitoring (First hour)
- [ ] Check Google Analytics real-time
- [ ] Monitor Sentry for errors
- [ ] Review Core Web Vitals
- [ ] Check server response times
- [ ] Monitor 404 errors
- [ ] Verify caching headers

### SEO Verification
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Request indexing of key pages
- [ ] Verify robots.txt accessible
- [ ] Check meta tags rendering

## Rollback Procedures

### If Issues Detected
- [ ] Document the issue with screenshots/logs
- [ ] Assess severity (Critical/High/Medium/Low)
- [ ] If Critical:
  - [ ] Initiate rollback immediately
  - [ ] Notify stakeholders
  - [ ] Create incident report

### Rollback Steps
1. [ ] Revert to previous GitHub Pages deployment:
   ```bash
   git revert HEAD
   git push origin main
   ```
2. [ ] Or switch GitHub Pages to previous stable branch
3. [ ] Verify rollback successful
4. [ ] Communicate status to team
5. [ ] Schedule post-mortem

## Communication

### Pre-Deployment
- [ ] Notify team of deployment window
- [ ] Update status page (if applicable)
- [ ] Prepare stakeholder communications

### During Deployment
- [ ] Update team channel with progress
- [ ] Note any issues or delays
- [ ] Confirm successful deployment

### Post-Deployment
- [ ] Send deployment success notification
- [ ] Share key metrics/improvements
- [ ] Document any issues for next release
- [ ] Update release notes

## Sign-offs

- [ ] Development Team Lead: _________________ Date: _______
- [ ] QA/Testing Lead: _________________ Date: _______
- [ ] Product Owner: _________________ Date: _______
- [ ] DevOps/Release Engineer: _________________ Date: _______

## Notes
_Space for deployment-specific notes, issues, or concerns:_

_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________

## Post-Deployment Review (Complete within 48 hours)
- [ ] Deployment retrospective scheduled
- [ ] Metrics reviewed and documented
- [ ] Lessons learned captured
- [ ] Process improvements identified
- [ ] Documentation updated
- [ ] Next release planning initiated

---
**Remember:** A boring deployment is a good deployment. Take your time, follow the checklist, and don't skip steps.