#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * Validates that all required production environment variables are set
 * and follows the correct format.
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Required environment variables with validation rules
const requiredVars = {
  // Critical - App won't start without these
  CRITICAL: [
    {
      name: 'DATABASE_URL',
      pattern: /^postgresql:\/\/.+:.+@.+:\d+\/.+/,
      description: 'PostgreSQL connection string',
      example: 'postgresql://user:pass@host:5432/db?sslmode=require'
    },
    {
      name: 'SESSION_SECRET',
      pattern: /^.{32,}$/,
      description: 'Session secret (min 32 chars)',
      example: '64+ character random string'
    },
    {
      name: 'JWT_SECRET',
      pattern: /^.{64,}$/,
      description: 'JWT signing secret (min 64 chars)',
      example: '256-bit secret string'
    },
  ],

  // High Priority - Core functionality affected
  HIGH: [
    {
      name: 'REDIS_URL',
      pattern: /^redis:\/\/.*@.+:\d+/,
      description: 'Redis connection string',
      example: 'redis://:password@host:6379'
    },
    {
      name: 'ENCRYPTION_KEY',
      pattern: /^[a-f0-9]{64}$/,
      description: '32-byte hex string for AES-256',
      example: '64 character hex string'
    },
    {
      name: 'PAYMENT_API_KEY',
      pattern: /^(sk_live_|pk_live_).+/,
      description: 'Stripe live API key',
      example: 'sk_live_...'
    },
    {
      name: 'SMTP_PASS',
      pattern: /^SG\..+/,
      description: 'SendGrid API key',
      example: 'SG.xxxxx...'
    },
  ],

  // Medium Priority - Features degraded
  MEDIUM: [
    {
      name: 'NEXT_PUBLIC_SENTRY_DSN',
      pattern: /^https:\/\/.+@.+\.ingest\.sentry\.io\/\d+$/,
      description: 'Sentry DSN',
      example: 'https://key@org.ingest.sentry.io/project'
    },
    {
      name: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',
      pattern: /^G-[A-Z0-9]{10}$/,
      description: 'Google Analytics 4 ID',
      example: 'G-XXXXXXXXXX'
    },
    {
      name: 'WEATHER_API_KEY',
      pattern: /^[a-f0-9]{32}$/,
      description: 'Weather API key',
      example: '32 character API key'
    },
    {
      name: 'MAPS_API_KEY',
      pattern: /^AIza[A-Za-z0-9_-]{35}$/,
      description: 'Google Maps API key',
      example: 'AIza...'
    },
  ],
};

// Check for placeholder patterns
const placeholderPatterns = [
  /placeholder/i,
  /xxx/i,
  /your_/i,
  /REPLACE_WITH/i,
  /example\.com/i,
  /0000000/,
];

function loadEnvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};

    content.split('\n').forEach(line => {
      // Skip comments and empty lines
      if (line.startsWith('#') || !line.trim()) return;

      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    });

    return env;
  } catch (error) {
    console.error(`${colors.red}Error reading .env file:${colors.reset}`, error.message);
    process.exit(1);
  }
}

function validateEnvironment(envPath) {
  console.log(`${colors.blue}🔍 Validating environment variables...${colors.reset}\n`);

  const env = loadEnvFile(envPath);
  let hasErrors = false;
  let hasWarnings = false;

  // Check each priority level
  Object.entries(requiredVars).forEach(([priority, vars]) => {
    console.log(`${colors.blue}[${priority}] Priority Variables:${colors.reset}`);

    vars.forEach(varConfig => {
      const value = env[varConfig.name];

      if (!value) {
        console.log(`  ${colors.red}✗ ${varConfig.name}${colors.reset} - Not set`);
        console.log(`    ${colors.yellow}↳ ${varConfig.description}${colors.reset}`);
        console.log(`    ${colors.yellow}↳ Example: ${varConfig.example}${colors.reset}`);
        if (priority === 'CRITICAL') hasErrors = true;
        else hasWarnings = true;
      } else {
        // Check for placeholders
        const hasPlaceholder = placeholderPatterns.some(pattern => pattern.test(value));

        if (hasPlaceholder) {
          console.log(`  ${colors.yellow}⚠ ${varConfig.name}${colors.reset} - Contains placeholder value`);
          console.log(`    ${colors.yellow}↳ Current: ${value.substring(0, 50)}...${colors.reset}`);
          if (priority === 'CRITICAL') hasErrors = true;
          else hasWarnings = true;
        } else if (!varConfig.pattern.test(value)) {
          console.log(`  ${colors.yellow}⚠ ${varConfig.name}${colors.reset} - Invalid format`);
          console.log(`    ${colors.yellow}↳ Expected: ${varConfig.example}${colors.reset}`);
          hasWarnings = true;
        } else {
          console.log(`  ${colors.green}✓ ${varConfig.name}${colors.reset} - Valid`);
        }
      }
    });

    console.log();
  });

  // Additional checks
  console.log(`${colors.blue}Additional Checks:${colors.reset}`);

  // Check URLs
  const urlVars = ['NEXT_PUBLIC_APP_URL', 'NEXT_PUBLIC_API_URL', 'CDN_URL', 'IMAGE_CDN_URL'];
  urlVars.forEach(varName => {
    const value = env[varName];
    if (value && !value.startsWith('https://')) {
      console.log(`  ${colors.yellow}⚠ ${varName}${colors.reset} - Should use HTTPS`);
      hasWarnings = true;
    } else if (value) {
      console.log(`  ${colors.green}✓ ${varName}${colors.reset} - HTTPS enabled`);
    }
  });

  console.log();

  // Summary
  if (hasErrors) {
    console.log(`${colors.red}❌ Validation FAILED - Critical variables missing or invalid${colors.reset}`);
    console.log(`${colors.yellow}⚠️  Please update .env.production with actual values${colors.reset}`);
    console.log(`${colors.yellow}📖 See SECRETS_SETUP.md for detailed instructions${colors.reset}`);
    process.exit(1);
  } else if (hasWarnings) {
    console.log(`${colors.yellow}⚠️  Validation completed with warnings${colors.reset}`);
    console.log(`${colors.yellow}Some non-critical variables need attention${colors.reset}`);
  } else {
    console.log(`${colors.green}✅ All environment variables are valid!${colors.reset}`);
  }

  // List all variables that still contain placeholders
  console.log(`\n${colors.blue}Variables requiring replacement:${colors.reset}`);
  Object.entries(env).forEach(([key, value]) => {
    if (placeholderPatterns.some(pattern => pattern.test(value))) {
      console.log(`  - ${key}`);
    }
  });
}

// Main execution
const envPath = path.join(process.cwd(), '.env.production');

if (!fs.existsSync(envPath)) {
  console.error(`${colors.red}Error: .env.production file not found${colors.reset}`);
  console.log(`Please create .env.production from .env.production.example`);
  process.exit(1);
}

validateEnvironment(envPath);