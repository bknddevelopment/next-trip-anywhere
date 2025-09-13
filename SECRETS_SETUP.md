# Production Secrets Setup Guide

## Overview

This document provides comprehensive instructions for configuring production environment variables for the Next Trip Anywhere application. All placeholder values MUST be replaced with actual production credentials before deployment.

## Critical Security Notice

**NEVER commit real production secrets to version control.** Use a secure secrets management service like:

- AWS Secrets Manager
- HashiCorp Vault
- Azure Key Vault
- Vercel Environment Variables
- Railway Secrets

## Required Environment Variables

### 1. Database Configuration

#### DATABASE_URL

- **Purpose**: Primary PostgreSQL database connection string
- **Provider**: Your PostgreSQL hosting provider (e.g., Supabase, Neon, Railway, AWS RDS)
- **Format**: `postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require&pool_max=25`
- **Example**: `postgresql://nexttrip_prod:SecurePass123!@db.railway.app:5432/nexttrip_production?sslmode=require&pool_max=25`
- **How to obtain**:
  1. Create a PostgreSQL database instance
  2. Create a database user with appropriate permissions
  3. Generate a strong password (min 16 chars, mixed case, numbers, symbols)
  4. Ensure SSL is enabled
  5. Set connection pooling to 25 connections

#### DATABASE_REPLICA_URL

- **Purpose**: Read-only replica database for load distribution
- **Provider**: Same as primary database provider
- **Format**: `postgresql://[user]:[password]@[replica-host]:[port]/[database]?sslmode=require`
- **Example**: `postgresql://nexttrip_readonly:ReadOnlyPass456!@db-replica.railway.app:5432/nexttrip_production?sslmode=require`
- **How to obtain**:
  1. Set up database replication on your provider
  2. Create a read-only user
  3. Use the replica endpoint provided

### 2. Redis Configuration

#### REDIS_URL

- **Purpose**: Redis cache and session store
- **Provider**: Redis Cloud, AWS ElastiCache, Upstash, Railway
- **Format**: `redis://:[password]@[host]:[port]`
- **Example**: `redis://:SuperSecureRedisPass789!@redis-12345.c1.us-west-2.ec2.cloud.redislabs.com:12345`
- **How to obtain**:
  1. Create a Redis instance
  2. Enable password authentication
  3. Note the connection endpoint and port
  4. Generate a strong password

### 3. Authentication & Security

#### SESSION_SECRET

- **Purpose**: Express session secret for signing cookies
- **Provider**: Self-generated
- **Format**: Random 64+ character string
- **Example**: `a7f8d9e3b2c5a1d4e7f8b9c2d5e8f1a4b7c9d2e5f8a1b4c7d9e2f5a8b1c4d7e9f2`
- **How to generate**:
  ```bash
  openssl rand -hex 32
  ```

#### JWT_SECRET

- **Purpose**: JWT token signing secret
- **Provider**: Self-generated
- **Format**: Random 256-bit secret
- **Example**: `9f7d8e6c5b4a3f2e1d9c8b7a6f5e4d3c2b1a9f8e7d6c5b4a3f2e1d9c8b7a6f5e4d`
- **How to generate**:
  ```bash
  openssl rand -hex 64
  ```

#### ENCRYPTION_KEY

- **Purpose**: AES encryption for sensitive data
- **Provider**: Self-generated
- **Format**: 32-byte hex string for AES-256
- **Example**: `3e7f9d8b6c5a4f2e1d9c8b7a6f5e4d3c2b1a9f8e7d6c5b4a3f2e1d9c8b7a6f5e`
- **How to generate**:
  ```bash
  openssl rand -hex 32
  ```

### 4. Monitoring & Analytics

#### NEXT_PUBLIC_SENTRY_DSN

- **Purpose**: Sentry error tracking
- **Provider**: Sentry.io
- **Format**: `https://[public_key]@[organization].ingest.sentry.io/[project_id]`
- **Example**: `https://abc123def456ghi789@o123456.ingest.sentry.io/1234567`
- **How to obtain**:
  1. Create account at sentry.io
  2. Create a new project (select Next.js)
  3. Copy the DSN from project settings

#### SENTRY_AUTH_TOKEN

- **Purpose**: Sentry release management and source maps
- **Provider**: Sentry.io
- **Format**: Token string
- **Example**: `sntrys_eyJpZCI6IjEyMzQ1NiIsInRva2VuIjoiYWJjZGVmZ2hpams...`
- **How to obtain**:
  1. Go to Sentry Settings > Auth Tokens
  2. Create new token with project:write scope
  3. Copy the generated token

#### NEXT_PUBLIC_GA_MEASUREMENT_ID

- **Purpose**: Google Analytics 4 tracking
- **Provider**: Google Analytics
- **Format**: `G-XXXXXXXXXX`
- **Example**: `G-ABC123DEF4`
- **How to obtain**:
  1. Create GA4 property in Google Analytics
  2. Go to Admin > Data Streams
  3. Copy the Measurement ID

#### NEXT_PUBLIC_GTM_ID

- **Purpose**: Google Tag Manager container
- **Provider**: Google Tag Manager
- **Format**: `GTM-XXXXXXX`
- **Example**: `GTM-ABCD123`
- **How to obtain**:
  1. Create container in Google Tag Manager
  2. Copy container ID from dashboard

### 5. Third-Party APIs

#### WEATHER_API_KEY

- **Purpose**: Weather data for destinations
- **Provider**: OpenWeatherMap, WeatherAPI, or similar
- **Format**: API key string
- **Example**: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
- **How to obtain**:
  1. Sign up at openweathermap.org/api
  2. Generate API key
  3. Select appropriate plan

#### MAPS_API_KEY

- **Purpose**: Google Maps integration
- **Provider**: Google Cloud Platform
- **Format**: API key string
- **Example**: `AIzaSyBa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5`
- **How to obtain**:
  1. Enable Maps JavaScript API in GCP Console
  2. Create API key
  3. Restrict key to your domain

#### PAYMENT_API_KEY

- **Purpose**: Payment processing (Stripe/PayPal)
- **Provider**: Stripe or PayPal
- **Format**: Secret key string
- **Example**: `sk_live_[YOUR_STRIPE_KEY_HERE]`
- **How to obtain**:
  1. Create Stripe account
  2. Get live publishable and secret keys
  3. Set up webhook endpoint

#### PAYMENT_WEBHOOK_SECRET

- **Purpose**: Webhook signature verification
- **Provider**: Stripe or PayPal
- **Format**: Webhook signing secret
- **Example**: `whsec_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`
- **How to obtain**:
  1. Create webhook endpoint in Stripe Dashboard
  2. Copy signing secret
  3. Configure endpoint URL

### 6. Email Configuration

#### SMTP_PASS

- **Purpose**: SMTP authentication for SendGrid
- **Provider**: SendGrid
- **Format**: API key
- **Example**: `SG.a1b2c3d4e5f6g7h8.i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`
- **How to obtain**:
  1. Create SendGrid account
  2. Generate API key with Mail Send permission
  3. Verify sender domain

## Security Checklist

Before deploying to production, ensure:

- [ ] All placeholder values have been replaced
- [ ] Secrets are stored in secure vault, not in code
- [ ] Database passwords are strong (16+ chars)
- [ ] API keys are restricted by domain/IP
- [ ] SSL/TLS is enabled for all connections
- [ ] Secrets are rotated regularly (every 90 days)
- [ ] Access logs are monitored
- [ ] Webhook secrets are verified
- [ ] CORS origins are properly configured
- [ ] CSP policy is restrictive

## Environment Variable Priority

1. **CRITICAL** (App won't start without these):
   - DATABASE_URL
   - SESSION_SECRET
   - JWT_SECRET

2. **HIGH** (Core functionality affected):
   - REDIS_URL
   - ENCRYPTION_KEY
   - PAYMENT_API_KEY
   - SMTP_PASS

3. **MEDIUM** (Features degraded):
   - NEXT_PUBLIC_SENTRY_DSN
   - NEXT_PUBLIC_GA_MEASUREMENT_ID
   - WEATHER_API_KEY
   - MAPS_API_KEY

4. **LOW** (Optional enhancements):
   - DATABASE_REPLICA_URL
   - NEXT_PUBLIC_GTM_ID
   - SENTRY_AUTH_TOKEN

## Validation Scripts

To validate your configuration:

```bash
# Check all required vars are set
npm run validate:env

# Test database connection
npm run test:db

# Test Redis connection
npm run test:redis

# Send test email
npm run test:email
```

## Troubleshooting

### Database Connection Issues

- Verify firewall rules allow connection from your IP
- Check SSL certificate is valid
- Ensure connection pooling limits aren't exceeded

### Redis Connection Issues

- Verify Redis version compatibility (6.0+)
- Check memory limits aren't exceeded
- Ensure persistence is configured

### Email Delivery Issues

- Verify domain is authenticated (SPF, DKIM)
- Check sending limits aren't exceeded
- Monitor bounce rates

## Support

For assistance with production setup:

- Create an issue in the repository
- Contact DevOps team
- Review deployment documentation

## References

- [PostgreSQL Connection Strings](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
- [Redis Security](https://redis.io/docs/management/security/)
- [SendGrid API Keys](https://docs.sendgrid.com/ui/account-and-settings/api-keys)
- [Stripe API Keys](https://stripe.com/docs/keys)
- [Google Cloud API Keys](https://cloud.google.com/docs/authentication/api-keys)
