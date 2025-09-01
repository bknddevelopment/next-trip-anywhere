#!/bin/bash

# Deployment script for Next Trip Anywhere
# Handles production deployment with rollback capabilities

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_BRANCH="main"
BACKUP_DIR="backups"
BUILD_DIR="out"
DEPLOY_HISTORY_FILE=".deploy_history"
MAX_BACKUPS=5

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Node.js version
    node_version=$(node -v | cut -d'v' -f2)
    required_version="18.0.0"
    if [ "$(printf '%s\n' "$required_version" "$node_version" | sort -V | head -n1)" != "$required_version" ]; then
        log_error "Node.js version $required_version or higher is required. Found: $node_version"
        exit 1
    fi
    
    # Check if on correct branch
    current_branch=$(git branch --show-current)
    if [ "$current_branch" != "$DEPLOY_BRANCH" ]; then
        log_warn "Not on $DEPLOY_BRANCH branch. Current branch: $current_branch"
        read -p "Continue deployment from $current_branch? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Check for uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        log_error "Uncommitted changes detected. Please commit or stash changes before deploying."
        exit 1
    fi
    
    log_info "Prerequisites check passed"
}

# Run tests
run_tests() {
    log_info "Running tests..."
    npm test -- --run
    npm run lint
    npm run typecheck
    log_info "All tests passed"
}

# Create backup
create_backup() {
    if [ -d "$BUILD_DIR" ]; then
        log_info "Creating backup of current build..."
        mkdir -p "$BACKUP_DIR"
        timestamp=$(date +%Y%m%d_%H%M%S)
        backup_name="backup_$timestamp.tar.gz"
        tar -czf "$BACKUP_DIR/$backup_name" "$BUILD_DIR"
        echo "$timestamp:$backup_name" >> "$DEPLOY_HISTORY_FILE"
        log_info "Backup created: $backup_name"
        
        # Clean old backups
        cleanup_old_backups
    fi
}

# Clean old backups
cleanup_old_backups() {
    backup_count=$(ls -1 "$BACKUP_DIR" | wc -l)
    if [ "$backup_count" -gt "$MAX_BACKUPS" ]; then
        log_info "Cleaning old backups (keeping last $MAX_BACKUPS)..."
        ls -t "$BACKUP_DIR" | tail -n +$((MAX_BACKUPS + 1)) | xargs -I {} rm "$BACKUP_DIR/{}"
    fi
}

# Build application
build_application() {
    log_info "Building application for production..."
    
    # Clean previous build
    rm -rf "$BUILD_DIR"
    
    # Set production environment
    export NODE_ENV=production
    
    # Run build
    npm run build
    
    if [ ! -d "$BUILD_DIR" ]; then
        log_error "Build failed: $BUILD_DIR directory not created"
        exit 1
    fi
    
    # Check build size
    build_size=$(du -sh "$BUILD_DIR" | cut -f1)
    log_info "Build completed. Size: $build_size"
    
    # Verify critical files
    if [ ! -f "$BUILD_DIR/index.html" ]; then
        log_error "Build verification failed: index.html not found"
        exit 1
    fi
    
    log_info "Build verification passed"
}

# Optimize build
optimize_build() {
    log_info "Optimizing build..."
    
    # Create .nojekyll for GitHub Pages
    touch "$BUILD_DIR/.nojekyll"
    
    # Generate sitemap if not exists
    if [ ! -f "$BUILD_DIR/sitemap.xml" ]; then
        log_warn "sitemap.xml not found in build"
    fi
    
    # Check for robots.txt
    if [ ! -f "$BUILD_DIR/robots.txt" ]; then
        log_warn "robots.txt not found in build"
    fi
    
    log_info "Build optimization completed"
}

# Deploy to GitHub Pages
deploy_github_pages() {
    log_info "Deploying to GitHub Pages..."
    
    # Use gh-pages to deploy
    npx gh-pages -d "$BUILD_DIR" --dotfiles
    
    if [ $? -eq 0 ]; then
        log_info "Deployment successful!"
        
        # Record successful deployment
        echo "$(date +%Y%m%d_%H%M%S):deployed:$(git rev-parse HEAD)" >> "$DEPLOY_HISTORY_FILE"
        
        # Get deployment URL
        repo_name=$(basename $(git config --get remote.origin.url) .git)
        username=$(git config --get remote.origin.url | sed -n 's/.*github.com[:/]\([^/]*\).*/\1/p')
        deployment_url="https://${username}.github.io/${repo_name}/"
        
        log_info "Application deployed to: $deployment_url"
    else
        log_error "Deployment failed"
        exit 1
    fi
}

# Rollback to previous version
rollback() {
    log_info "Rolling back to previous version..."
    
    if [ ! -f "$DEPLOY_HISTORY_FILE" ]; then
        log_error "No deployment history found"
        exit 1
    fi
    
    # Get last backup
    last_backup=$(grep "backup_" "$DEPLOY_HISTORY_FILE" | tail -1 | cut -d':' -f2)
    
    if [ -z "$last_backup" ] || [ ! -f "$BACKUP_DIR/$last_backup" ]; then
        log_error "No backup found for rollback"
        exit 1
    fi
    
    log_info "Rolling back to: $last_backup"
    
    # Restore backup
    rm -rf "$BUILD_DIR"
    tar -xzf "$BACKUP_DIR/$last_backup"
    
    # Deploy restored version
    deploy_github_pages
    
    log_info "Rollback completed"
}

# Health check
health_check() {
    url=$1
    log_info "Performing health check on $url..."
    
    max_attempts=5
    attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
        
        if [ "$response" -eq 200 ]; then
            log_info "Health check passed (HTTP $response)"
            return 0
        else
            log_warn "Health check attempt $attempt failed (HTTP $response)"
            sleep 5
            attempt=$((attempt + 1))
        fi
    done
    
    log_error "Health check failed after $max_attempts attempts"
    return 1
}

# Main deployment flow
main() {
    log_info "Starting deployment process..."
    
    # Parse arguments
    if [ "$1" == "--rollback" ]; then
        rollback
        exit 0
    fi
    
    if [ "$1" == "--skip-tests" ]; then
        SKIP_TESTS=true
    fi
    
    # Run deployment steps
    check_prerequisites
    
    if [ "$SKIP_TESTS" != "true" ]; then
        run_tests
    else
        log_warn "Skipping tests (--skip-tests flag used)"
    fi
    
    create_backup
    build_application
    optimize_build
    deploy_github_pages
    
    # Optional health check
    if [ -n "$DEPLOYMENT_URL" ]; then
        sleep 10  # Wait for deployment to propagate
        health_check "$DEPLOYMENT_URL" || log_warn "Health check failed but deployment may still be successful"
    fi
    
    log_info "Deployment process completed successfully!"
}

# Run main function
main "$@"