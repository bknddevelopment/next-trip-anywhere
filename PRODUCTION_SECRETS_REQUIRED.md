# Production Secrets Required

## CRITICAL: Configure These Before Production Deployment

This document lists all the environment variables that need real values before deploying to production. Currently, all values in `.env.production` are placeholders.

## 1. Database Credentials
```bash
# PostgreSQL Database
DATABASE_URL="postgresql://username:password@host:5432/dbname"
DB_HOST="your-database-host.com"
DB_PORT="5432"
DB_NAME="nexttripanywhere_prod"
DB_USER="prod_user"
DB_PASSWORD="[GENERATE SECURE PASSWORD]"

# Redis Cache (if using)
REDIS_URL="redis://username:password@host:6379"
```

## 2. Authentication & Security
```bash
# Generate with: openssl rand -base64 64
NEXTAUTH_SECRET="[GENERATE 64+ CHARACTER SECRET]"
NEXTAUTH_URL="https://nexttripanywhere.com"

# Generate with: openssl rand -base64 64
JWT_SECRET="[GENERATE 64+ CHARACTER SECRET]"
SESSION_SECRET="[GENERATE 64+ CHARACTER SECRET]"

# Generate with: openssl rand -hex 32
ENCRYPTION_KEY="[GENERATE 32-BYTE HEX STRING]"
```

## 3. Third-Party API Keys

### Payment Processing
```bash
# Stripe
STRIPE_PUBLIC_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# PayPal (if using)
PAYPAL_CLIENT_ID="..."
PAYPAL_CLIENT_SECRET="..."
```

### Google Services
```bash
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza..."

# Google Analytics
NEXT_PUBLIC_GA_ID="G-..."
NEXT_PUBLIC_GTM_ID="GTM-..."

# Google OAuth (if using)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### Communication
```bash
# SendGrid or similar
SENDGRID_API_KEY="SG...."
EMAIL_FROM="noreply@nexttripanywhere.com"
EMAIL_REPLY_TO="support@nexttripanywhere.com"

# Twilio (if using SMS)
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+1..."
```

### Travel APIs
```bash
# Amadeus (Flight booking)
AMADEUS_API_KEY="..."
AMADEUS_API_SECRET="..."

# Booking.com or similar
BOOKING_API_KEY="..."

# Weather API
WEATHER_API_KEY="..."
```

### Monitoring & Analytics
```bash
# Sentry
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."
SENTRY_AUTH_TOKEN="..."
SENTRY_ORG="nexttripanywhere"
SENTRY_PROJECT="production"

# LogRocket or similar
LOGROCKET_APP_ID="..."
```

## 4. CDN & Storage
```bash
# Cloudinary or similar
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# AWS S3 (if using)
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="nexttripanywhere-prod"
AWS_REGION="us-east-1"
```

## 5. Domain & Deployment
```bash
# Production domain
NEXT_PUBLIC_SITE_URL="https://nexttripanywhere.com"
NEXT_PUBLIC_API_URL="https://api.nexttripanywhere.com"

# GitHub Pages specific
NEXT_PUBLIC_BASE_PATH="/next-trip-anywhere"
```

## How to Generate Secure Secrets

### Using OpenSSL (Recommended)
```bash
# For general secrets (64 characters)
openssl rand -base64 64

# For hex strings (32 bytes)
openssl rand -hex 32

# For URL-safe tokens
openssl rand -base64 32 | tr -d "=+/" | cut -c1-32
```

### Using Node.js
```javascript
// Generate secure random string
const crypto = require('crypto');
console.log(crypto.randomBytes(64).toString('base64'));
```

### Using online generators (Less Secure)
- https://randomkeygen.com/
- https://passwordsgenerator.net/

## GitHub Actions Secrets Setup

Add these secrets to your GitHub repository:

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret with the appropriate name

### Required GitHub Secrets:
- `PRODUCTION_ENV` - Base64 encoded .env.production file
- `SENTRY_AUTH_TOKEN` - For source map uploads
- `DEPLOY_KEY` - SSH key for deployment (if not using GitHub Pages)

## Security Best Practices

1. **Never commit real secrets to Git**
2. **Use different secrets for each environment** (dev, staging, prod)
3. **Rotate secrets regularly** (every 90 days minimum)
4. **Use secret management services**:
   - AWS Secrets Manager
   - HashiCorp Vault
   - Azure Key Vault
   - GitHub Secrets

5. **Implement secret scanning**:
   - Enable GitHub secret scanning
   - Use pre-commit hooks to prevent secret commits
   - Regular audit with tools like `truffleHog`

## Verification Checklist

Before deploying to production, verify:

- [ ] All placeholder values replaced with real secrets
- [ ] Secrets are properly escaped (no special characters issues)
- [ ] API keys have production permissions/scopes
- [ ] Database has proper user permissions
- [ ] Email service is configured for production domain
- [ ] Payment processing is in live mode (not test mode)
- [ ] Monitoring services are connected
- [ ] CDN/storage buckets exist and have proper permissions
- [ ] All secrets are added to GitHub Actions

## Emergency Contacts

Document who to contact if secrets are compromised:

- **Security Team Lead**: [Name] - [Email]
- **DevOps Engineer**: [Name] - [Email]
- **CTO/Technical Lead**: [Name] - [Email]

## Incident Response

If secrets are exposed:
1. Immediately rotate all affected secrets
2. Review access logs for unauthorized use
3. Notify security team
4. Document incident in security log
5. Review and update security procedures

---

**Last Updated**: December 2024
**Next Review**: March 2025