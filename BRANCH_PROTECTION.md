# Branch Protection Rules Configuration

This document outlines the recommended branch protection rules for the Next Trip Anywhere repository to ensure code quality, security, and proper review processes.

## Protected Branches

### Main Branch (`main`)

The main branch represents production-ready code and should have the strictest protection rules.

#### Required Settings

1. **Require pull request reviews before merging**
   - Required approving reviews: **2**
   - Dismiss stale pull request approvals when new commits are pushed: **Enabled**
   - Require review from CODEOWNERS: **Enabled**
   - Restrict who can dismiss pull request reviews: **Administrators only**

2. **Require status checks to pass before merging**
   - Require branches to be up to date before merging: **Enabled**
   - Required status checks:
     - `quality-checks`
     - `security-scan`
     - `test` (all matrix builds)
     - `e2e-tests`
     - `build`
     - `codeql-analysis`
     - `container-scan`
     - `dependency-scan`
     - `secret-scan`

3. **Require conversation resolution before merging**
   - All comments must be resolved: **Enabled**

4. **Require signed commits**
   - All commits must be GPG signed: **Enabled**

5. **Require linear history**
   - Prevent merge commits: **Enabled**
   - Only allow squash merging: **Enabled**

6. **Include administrators**
   - Administrators are subject to rules: **Enabled**

7. **Restrict who can push to matching branches**
   - Restrict pushes that create matching branches: **Enabled**
   - Users with push access: **None** (only through PRs)

8. **Rules for force pushes and deletions**
   - Allow force pushes: **Disabled**
   - Allow deletions: **Disabled**

### Develop Branch (`develop`)

The develop branch is for integration testing and should have moderate protection.

#### Required Settings

1. **Require pull request reviews before merging**
   - Required approving reviews: **1**
   - Dismiss stale pull request approvals when new commits are pushed: **Enabled**
   - Require review from CODEOWNERS: **Disabled**

2. **Require status checks to pass before merging**
   - Required status checks:
     - `quality-checks`
     - `test`
     - `build`

3. **Require conversation resolution before merging**
   - All comments must be resolved: **Enabled**

4. **Require up-to-date branches**
   - Require branches to be up to date before merging: **Enabled**

5. **Rules for force pushes and deletions**
   - Allow force pushes: **Disabled**
   - Allow deletions: **Disabled**

## Branch Naming Conventions

### Feature Branches

- Pattern: `feature/[ticket-number]-[brief-description]`
- Example: `feature/TRIP-123-add-user-authentication`

### Bug Fix Branches

- Pattern: `fix/[ticket-number]-[brief-description]`
- Example: `fix/TRIP-456-resolve-navigation-issue`

### Hotfix Branches

- Pattern: `hotfix/[ticket-number]-[brief-description]`
- Example: `hotfix/TRIP-789-critical-payment-bug`

### Release Branches

- Pattern: `release/[version-number]`
- Example: `release/1.2.0`

### Documentation Branches

- Pattern: `docs/[brief-description]`
- Example: `docs/update-api-documentation`

### Chore/Maintenance Branches

- Pattern: `chore/[brief-description]`
- Example: `chore/update-dependencies`

## Pull Request Requirements

### PR Title Format

```
[TYPE] Brief description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc.)
- refactor: Code refactoring
- perf: Performance improvements
- test: Test additions or modifications
- build: Build system changes
- ci: CI/CD changes
- chore: Maintenance tasks
```

### PR Template

All PRs must use the template defined in `.github/pull_request_template.md`

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] No console.log statements
- [ ] Security considerations addressed
- [ ] Performance impact considered
- [ ] Accessibility requirements met

## Merge Strategies

### Main Branch

- **Squash and merge** only
- Commit message must follow conventional commits format
- Delete branch after merge

### Develop Branch

- **Squash and merge** for feature branches
- **Create a merge commit** for release branches
- Delete branch after merge

## CODEOWNERS File

Create a `CODEOWNERS` file in the repository root:

```
# Global owners
* @charwinvanryckdegroot

# Frontend code
/app/ @charwinvanryckdegroot
/components/ @charwinvanryckdegroot
/hooks/ @charwinvanryckdegroot

# Configuration files
/.github/ @charwinvanryckdegroot
/docker* @charwinvanryckdegroot
/*.config.* @charwinvanryckdegroot

# Documentation
/*.md @charwinvanryckdegroot
/docs/ @charwinvanryckdegroot
```

## Automated Enforcement

### GitHub Actions Enforcement

The following GitHub Actions will automatically enforce these rules:

1. **PR Validation** (`pr-checks.yml`)
   - Validates PR title format
   - Checks for linked issues
   - Verifies branch naming convention

2. **Code Quality** (`main-ci-cd.yml`)
   - Runs linting
   - Type checking
   - Format validation

3. **Security Checks** (`security.yml`)
   - Dependency scanning
   - Secret scanning
   - Container scanning
   - SAST scanning

## Setting Up Branch Protection

### Via GitHub UI

1. Go to Settings → Branches
2. Click "Add rule" under Branch protection rules
3. Enter branch name pattern (e.g., `main`)
4. Configure settings as documented above
5. Click "Create" or "Save changes"

### Via GitHub API

```bash
# Example using GitHub CLI
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["quality-checks","test","build"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

### Via Terraform (IaC)

```hcl
resource "github_branch_protection" "main" {
  repository_id = github_repository.repo.node_id
  pattern       = "main"

  required_status_checks {
    strict   = true
    contexts = ["quality-checks", "security-scan", "test", "build"]
  }

  required_pull_request_reviews {
    required_approving_review_count = 2
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    restrict_dismissals             = true
  }

  enforce_admins         = true
  require_signed_commits = true
  required_linear_history = true

  allow_force_pushes = false
  allow_deletions    = false
}
```

## Bypass Process

### Emergency Hotfixes

In case of critical production issues:

1. Create a hotfix branch from main
2. Implement minimal fix
3. Create PR with "HOTFIX" label
4. Requires only 1 approval (from admin)
5. Can bypass some non-critical checks
6. Must pass security scans

### Admin Override

Repository administrators can bypass rules only when:

- Critical security patches need immediate deployment
- CI/CD system failures blocking legitimate changes
- Must be documented in PR with justification

## Monitoring and Compliance

### Weekly Reviews

- Review bypass events
- Audit merged PRs for compliance
- Update protection rules as needed

### Monthly Reports

- PR merge statistics
- Failed check patterns
- Security scan findings
- Dependency update status

## References

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
