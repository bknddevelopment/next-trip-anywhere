# DevOps Infrastructure Documentation

## Overview

This document provides comprehensive information about the DevOps infrastructure setup for Next Trip Anywhere, including containerization, CI/CD pipelines, monitoring, and deployment strategies.

## Table of Contents

1. [Docker Setup](#docker-setup)
2. [Local Development](#local-development)
3. [CI/CD Pipeline](#cicd-pipeline)
4. [Security Scanning](#security-scanning)
5. [Monitoring & Observability](#monitoring--observability)
6. [Deployment Strategies](#deployment-strategies)
7. [Infrastructure as Code](#infrastructure-as-code)
8. [Disaster Recovery](#disaster-recovery)
9. [Performance Optimization](#performance-optimization)
10. [Troubleshooting](#troubleshooting)

## Docker Setup

### Building the Docker Image

```bash
# Build for development
docker build --target builder -t next-trip-dev .

# Build for production
docker build --target runner -t next-trip-prod .

# Build with build arguments
docker build \
  --build-arg NODE_ENV=production \
  --build-arg NEXT_PUBLIC_API_URL=https://api.next-trip-anywhere.com \
  -t next-trip-prod .
```

### Multi-Architecture Builds

```bash
# Setup buildx for multi-arch builds
docker buildx create --name multiarch --use

# Build for multiple platforms
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ghcr.io/charwinvanryckdegroot/next-trip-anywhere:latest \
  --push .
```

## Local Development

### Using Docker Compose

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Remove volumes
docker-compose down -v
```

### Environment-Specific Compose Files

```bash
# Development
docker-compose -f docker-compose.yml up

# Production
docker-compose -f docker-compose.prod.yml up
```

### Accessing Services

- **Application**: http://localhost:3000
- **Redis Commander** (if enabled): http://localhost:8081
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001

## CI/CD Pipeline

### GitHub Actions Workflows

#### Main CI/CD Pipeline (`main-ci-cd.yml`)

Triggered on:

- Push to `main` or `develop`
- Pull requests
- Manual dispatch
- Daily security scans

Jobs:

1. **Quality Checks**: Linting, type checking, formatting
2. **Security Scan**: Vulnerability scanning
3. **Test Suite**: Unit and integration tests
4. **E2E Tests**: Playwright tests
5. **Build**: Application build and bundle analysis
6. **Docker Build**: Container creation and registry push
7. **Deploy**: Staging/production deployment

#### Security Workflow (`security.yml`)

Comprehensive security scanning including:

- CodeQL analysis
- Container scanning (Trivy, Snyk)
- Dependency scanning (OSV, npm audit)
- Secret scanning (TruffleHog, GitLeaks)
- SAST (Semgrep)
- IaC scanning (Checkov)

### Setting Up CI/CD

1. **Configure GitHub Secrets**:

   ```
   DOCKER_REGISTRY_TOKEN
   NEXT_PUBLIC_API_URL
   NEXT_PUBLIC_SENTRY_DSN
   NEXT_PUBLIC_GA_MEASUREMENT_ID
   CODECOV_TOKEN
   SNYK_TOKEN
   SLACK_WEBHOOK
   ```

2. **Enable Branch Protection**:
   - See [BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)

3. **Setup Dependabot**:
   - Configuration in `.github/dependabot.yml`
   - Weekly updates for npm, Docker, and GitHub Actions

## Security Scanning

### Pre-commit Hooks

```bash
# Install pre-commit hooks
npm run prepare

# Run security checks manually
npm audit
npm run lint
npm run typecheck
```

### Container Security

```bash
# Scan Docker image locally
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image next-trip-prod:latest

# Scan with Snyk
snyk container test next-trip-prod:latest
```

### Secret Management

- Never commit secrets to the repository
- Use environment variables for sensitive data
- Rotate secrets regularly
- Use GitHub Secrets for CI/CD

## Monitoring & Observability

### Health Check Endpoints

- **Liveness**: `/api/health` - Basic health check
- **Readiness**: `/api/ready` - Dependency checks
- **Metrics**: `/api/metrics` - Prometheus metrics

### Sentry Integration

1. **Setup**:

   ```bash
   npm install @sentry/nextjs
   ```

2. **Configure**:
   - Set `NEXT_PUBLIC_SENTRY_DSN` in environment
   - Configurations in `sentry.*.config.ts`

3. **Usage**:

   ```typescript
   import { captureError } from '@/lib/monitoring/sentry'

   try {
     // Your code
   } catch (error) {
     captureError(error, { tags: { component: 'api' } })
   }
   ```

### Prometheus & Grafana

1. **Access Grafana**: http://localhost:3001
2. **Default credentials**: admin/admin
3. **Import dashboards** from `/monitoring/grafana/dashboards`

### Application Logs

```bash
# View application logs
docker-compose logs -f app

# View specific service logs
docker-compose logs -f redis

# Save logs to file
docker-compose logs app > app.log
```

## Deployment Strategies

### Kubernetes Deployment

1. **Apply configurations**:

   ```bash
   kubectl apply -f k8s/configmap.yaml
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/ingress.yaml
   ```

2. **Using Helm**:

   ```bash
   # Install
   helm install next-trip ./helm/next-trip-anywhere \
     --namespace production \
     --values helm/next-trip-anywhere/values.yaml

   # Upgrade
   helm upgrade next-trip ./helm/next-trip-anywhere \
     --namespace production \
     --values helm/next-trip-anywhere/values.yaml

   # Rollback
   helm rollback next-trip
   ```

### Blue-Green Deployment

```bash
# Deploy to green environment
kubectl set image deployment/next-trip-green \
  next-trip=ghcr.io/charwinvanryckdegroot/next-trip-anywhere:v2.0.0

# Switch traffic to green
kubectl patch service next-trip-service \
  -p '{"spec":{"selector":{"version":"green"}}}'

# Remove blue deployment
kubectl delete deployment next-trip-blue
```

### Canary Deployment

```bash
# Deploy canary version
kubectl apply -f k8s/deployment-canary.yaml

# Gradually increase traffic (using Istio/Flagger)
kubectl patch virtualservice next-trip \
  -p '{"spec":{"http":[{"weight":20,"destination":{"host":"next-trip-canary"}}]}}'
```

## Infrastructure as Code

### Terraform Example

```hcl
# Create in terraform/main.tf
module "next_trip_app" {
  source = "./modules/app"

  environment = "production"
  image_tag   = var.image_tag
  replicas    = 3

  resources = {
    requests = {
      cpu    = "100m"
      memory = "256Mi"
    }
    limits = {
      cpu    = "500m"
      memory = "1Gi"
    }
  }
}
```

### Pulumi Example

```typescript
// Create in pulumi/index.ts
import * as k8s from '@pulumi/kubernetes'

const app = new k8s.apps.v1.Deployment('next-trip', {
  spec: {
    replicas: 3,
    selector: { matchLabels: { app: 'next-trip' } },
    template: {
      metadata: { labels: { app: 'next-trip' } },
      spec: {
        containers: [
          {
            name: 'next-trip',
            image: 'ghcr.io/charwinvanryckdegroot/next-trip-anywhere:latest',
            ports: [{ containerPort: 3000 }],
          },
        ],
      },
    },
  },
})
```

## Disaster Recovery

### Backup Strategy

1. **Database Backups**:

   ```bash
   # PostgreSQL backup
   pg_dump -h localhost -U nexttrip -d nexttrip_prod > backup_$(date +%Y%m%d).sql

   # Automated backups with cron
   0 2 * * * /usr/local/bin/backup-database.sh
   ```

2. **Application State**:

   ```bash
   # Backup Redis
   redis-cli --rdb /backup/redis_$(date +%Y%m%d).rdb

   # Backup volumes
   docker run --rm -v next-trip_data:/data \
     -v $(pwd)/backup:/backup \
     alpine tar czf /backup/data_$(date +%Y%m%d).tar.gz /data
   ```

### Recovery Procedures

1. **Database Recovery**:

   ```bash
   psql -h localhost -U nexttrip -d nexttrip_prod < backup_20240101.sql
   ```

2. **Application Recovery**:

   ```bash
   # Rollback deployment
   kubectl rollout undo deployment/next-trip-app

   # Restore from backup tag
   kubectl set image deployment/next-trip-app \
     next-trip=ghcr.io/charwinvanryckdegroot/next-trip-anywhere:v1.0.0-backup
   ```

### RTO/RPO Targets

- **RTO** (Recovery Time Objective): 1 hour
- **RPO** (Recovery Point Objective): 24 hours
- **Backup Retention**: 30 days
- **Backup Testing**: Monthly

## Performance Optimization

### Docker Optimization

- Multi-stage builds reduce image size by ~70%
- Layer caching speeds up builds
- BuildKit cache mounts for dependencies
- Distroless base images for security

### Application Optimization

1. **Build Optimization**:

   ```javascript
   // next.config.js optimizations
   - Code splitting
   - Tree shaking
   - Bundle analysis
   - Image optimization
   ```

2. **Runtime Optimization**:
   - Redis caching
   - CDN for static assets
   - HTTP/2 and compression
   - Connection pooling

### Monitoring Performance

```bash
# Check resource usage
docker stats

# Analyze bundle size
npm run build:analyze

# Run Lighthouse
npm run perf:lighthouse

# Load testing
artillery quick -c 10 -n 100 http://localhost:3000
```

## Troubleshooting

### Common Issues

#### Container Won't Start

```bash
# Check logs
docker logs next-trip-app

# Inspect container
docker inspect next-trip-app

# Check events
kubectl describe pod next-trip-app-xxxxx
```

#### High Memory Usage

```bash
# Check memory usage
docker stats --no-stream

# Analyze heap dump
node --inspect app.js
# Chrome DevTools > Memory > Take Heap Snapshot

# Set memory limits
docker run -m 512m next-trip-app
```

#### Deployment Failures

```bash
# Check deployment status
kubectl rollout status deployment/next-trip-app

# View events
kubectl get events --sort-by=.metadata.creationTimestamp

# Check pod logs
kubectl logs -f deployment/next-trip-app
```

### Debug Commands

```bash
# Enter container shell
docker exec -it next-trip-app /bin/sh

# Port forwarding for debugging
kubectl port-forward pod/next-trip-app-xxxxx 3000:3000

# View environment variables
docker exec next-trip-app env

# Network debugging
docker network inspect bridge
```

### Health Check Debugging

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test readiness
curl http://localhost:3000/api/ready

# View metrics
curl http://localhost:3000/api/metrics
```

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev                 # Start development server
docker-compose up          # Start with Docker
npm run test               # Run tests
npm run lint               # Run linting

# Production
npm run build              # Build for production
docker build -t app .      # Build Docker image
kubectl apply -f k8s/      # Deploy to Kubernetes
helm upgrade app ./helm    # Deploy with Helm

# Monitoring
kubectl logs -f deployment/app     # View logs
kubectl exec -it pod/app -- /bin/sh # Enter container
docker-compose logs -f             # Docker logs
curl http://localhost:3000/api/health # Health check
```

### Environment Variables

See [.env.example](./.env.example) for complete list.

### Ports

- **3000**: Next.js application
- **6379**: Redis
- **5432**: PostgreSQL
- **9090**: Prometheus
- **3001**: Grafana
- **80/443**: Nginx

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review logs and metrics
3. Create an issue in GitHub
4. Contact the DevOps team

---

_Last Updated: 2024_
_Version: 1.0.0_
