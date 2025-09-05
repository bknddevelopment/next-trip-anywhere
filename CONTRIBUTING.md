# 🤝 Contributing to Next Trip Anywhere

First off, thank you for considering contributing to Next Trip Anywhere! It's people like you that make this travel platform such a great tool for helping people explore the world.

## 📖 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Process](#-development-process)
- [How to Contribute](#-how-to-contribute)
- [Style Guidelines](#-style-guidelines)
- [Commit Guidelines](#-commit-guidelines)
- [Testing Guidelines](#-testing-guidelines)
- [Documentation](#-documentation)
- [Pull Request Process](#-pull-request-process)
- [Community](#-community)

---

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at support@nexttripanywhere.com.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- Node.js 18.17+ installed
- npm 9.0+ installed
- Git configured with your GitHub account
- A code editor (VS Code recommended)
- Basic knowledge of TypeScript and React

### Initial Setup

1. **Fork the repository**

   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/next-trip-anywhere.git
   cd next-trip-anywhere
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/original/next-trip-anywhere.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```

---

## 💻 Development Process

### Branch Naming Convention

Use descriptive branch names following this pattern:

- `feature/` - New features (e.g., `feature/add-hotel-search`)
- `fix/` - Bug fixes (e.g., `fix/header-mobile-menu`)
- `docs/` - Documentation updates (e.g., `docs/update-api-guide`)
- `style/` - Code style changes (e.g., `style/format-components`)
- `refactor/` - Code refactoring (e.g., `refactor/optimize-images`)
- `test/` - Test additions (e.g., `test/add-form-tests`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Development Workflow

1. **Stay updated with upstream**

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow the style guide
   - Add tests for new features
   - Update documentation

4. **Test your changes**

   ```bash
   npm test
   npm run lint
   npm run typecheck
   npm run build
   ```

5. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

6. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create Pull Request**
   - Go to GitHub and create a PR
   - Fill in the PR template
   - Link related issues

---

## 🎯 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

**Bug Report Template:**

```markdown
### Description

A clear description of the bug

### Steps to Reproduce

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

### Expected Behavior

What you expected to happen

### Actual Behavior

What actually happened

### Screenshots

If applicable, add screenshots

### Environment

- Browser: [e.g., Chrome 91]
- OS: [e.g., macOS 11.4]
- Node version: [e.g., 18.17.0]

### Additional Context

Any other context about the problem
```

### Suggesting Features

**Feature Request Template:**

```markdown
### Feature Description

A clear description of the feature

### Problem it Solves

What problem does this feature solve?

### Proposed Solution

How do you think it should work?

### Alternatives Considered

What alternatives have you considered?

### Additional Context

Any other context or screenshots
```

### Your First Code Contribution

Unsure where to begin? Look for these labels:

- `good-first-issue` - Good for newcomers
- `help-wanted` - Extra attention needed
- `easy` - Simple fixes that don't require deep knowledge

### Improving Documentation

Documentation contributions are highly valued! You can:

- Fix typos and grammar
- Add examples and clarifications
- Translate documentation
- Create tutorials and guides

---

## 🎨 Style Guidelines

### TypeScript Style Guide

```typescript
// ✅ GOOD: Use interfaces for object types
interface UserProps {
  name: string
  email: string
  age?: number
}

// ❌ BAD: Avoid using 'any'
const data: any = fetchData()

// ✅ GOOD: Use proper types
const data: UserData = fetchData()

// ✅ GOOD: Use const for constants
const API_URL = 'https://api.example.com'

// ✅ GOOD: Use descriptive variable names
const userEmailAddress = 'user@example.com'

// ❌ BAD: Avoid single letter variables (except in loops)
const e = 'user@example.com'
```

### React/JSX Style Guide

```tsx
// ✅ GOOD: Use functional components
export default function UserProfile({ user }: UserProps) {
  return <div>{user.name}</div>
}

// ❌ BAD: Avoid class components
class UserProfile extends React.Component {
  // ...
}

// ✅ GOOD: Use proper prop destructuring
function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  // ...
}

// ✅ GOOD: Use semantic HTML
;<nav aria-label="Main navigation">
  <ul>
    <li>
      <a href="/home">Home</a>
    </li>
  </ul>
</nav>

// ✅ GOOD: Extract complex logic to custom hooks
function useUserData(userId: string) {
  // Complex logic here
  return { user, loading, error }
}
```

### CSS/Tailwind Style Guide

```tsx
// ✅ GOOD: Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">

// ✅ GOOD: Group related utilities
<button className="
  px-4 py-2
  bg-blue-500 hover:bg-blue-600
  text-white font-semibold
  rounded-lg shadow-md
  transition-colors duration-200
">

// ✅ GOOD: Extract repeated patterns to components
function Card({ children }: CardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {children}
    </div>
  )
}
```

### File Structure

```
components/
├── ComponentName/
│   ├── ComponentName.tsx       # Main component
│   ├── ComponentName.test.tsx  # Tests
│   ├── ComponentName.types.ts  # TypeScript types
│   └── index.ts                # Export
```

---

## 📝 Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **perf**: Performance improvements
- **chore**: Maintenance tasks
- **ci**: CI/CD changes
- **build**: Build system changes

### Examples

```bash
# Feature
git commit -m "feat(search): add flight search filters"

# Bug fix
git commit -m "fix(header): resolve mobile menu toggle issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# With body
git commit -m "feat(booking): add hotel reservation system

- Implement hotel search API integration
- Add booking confirmation email
- Create reservation management dashboard

Closes #123"
```

### Commit Rules

1. Use present tense ("add feature" not "added feature")
2. Use imperative mood ("move cursor" not "moves cursor")
3. Limit first line to 72 characters
4. Reference issues and pull requests
5. Be descriptive but concise

---

## 🧪 Testing Guidelines

### Writing Tests

All new features must include tests. We use Jest and React Testing Library.

#### Unit Test Example

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<ComponentName onClick={handleClick} />)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should show loading state', () => {
    render(<ComponentName isLoading />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
```

### Test Coverage

Aim for these coverage targets:

- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test ComponentName.test.tsx
```

---

## 📚 Documentation

### Code Documentation

Every exported function and component must have JSDoc comments:

````typescript
/**
 * Calculates the total price including taxes and fees
 *
 * @param basePrice - The base price before taxes
 * @param taxRate - Tax rate as a decimal (e.g., 0.08 for 8%)
 * @param fees - Additional fees to add
 * @returns The total price with taxes and fees
 *
 * @example
 * ```typescript
 * const total = calculateTotal(100, 0.08, 5)
 * console.log(total) // 113
 * ```
 */
export function calculateTotal(basePrice: number, taxRate: number, fees: number = 0): number {
  return basePrice * (1 + taxRate) + fees
}
````

### Component Documentation

````tsx
/**
 * FlightCard Component
 *
 * @component
 * @description Displays flight information in a card format
 *
 * @param {FlightCardProps} props - Component props
 * @param {Flight} props.flight - Flight data to display
 * @param {Function} props.onSelect - Callback when flight is selected
 * @param {boolean} props.isSelected - Whether the flight is currently selected
 *
 * @example
 * ```tsx
 * <FlightCard
 *   flight={flightData}
 *   onSelect={handleSelect}
 *   isSelected={false}
 * />
 * ```
 */
export function FlightCard({ flight, onSelect, isSelected }: FlightCardProps) {
  // Component implementation
}
````

---

## 🚀 Pull Request Process

### Before Submitting

1. **Update documentation** for any changed functionality
2. **Add tests** for new features
3. **Run the test suite** and ensure all tests pass
4. **Run linting** and fix any issues
5. **Update the README** if needed
6. **Check your code** for console.logs and debugging code

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests passing

## Related Issues

Closes #(issue number)

## Screenshots

If applicable, add screenshots
```

### Review Process

1. **Automated checks** run on all PRs
2. **Code review** by at least one maintainer
3. **All tests** must pass
4. **No merge conflicts** with main branch
5. **Approval required** before merging

### After Your PR is Merged

- Delete your branch (GitHub can do this automatically)
- Pull the changes from upstream
- Celebrate your contribution! 🎉

---

## 👥 Community

### Getting Help

- **Discord**: Join our [Discord server](https://discord.gg/nexttripanywhere)
- **Discussions**: Use [GitHub Discussions](https://github.com/nexttripanywhere/discussions)
- **Email**: support@nexttripanywhere.com

### Recognition

Contributors are recognized in:

- README.md contributors section
- Release notes
- Annual contributor spotlight

### Code Reviews

We appreciate thorough code reviews! When reviewing:

- Be constructive and friendly
- Suggest improvements, don't demand them
- Explain the reasoning behind suggestions
- Approve PRs that meet our standards
- Use inline comments for specific issues

---

## 🎓 Learning Resources

### Recommended Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Testing Library Docs](https://testing-library.com/docs/)

### Video Tutorials

- [Next.js Crash Course](https://www.youtube.com/watch?v=nextjs-course)
- [React Testing Best Practices](https://www.youtube.com/watch?v=testing-react)
- [TypeScript for React Developers](https://www.youtube.com/watch?v=typescript-react)

---

## 📋 Quick Reference

### Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build production
npm start            # Start production server

# Testing
npm test            # Run tests
npm run test:coverage # Coverage report
npm run test:watch  # Watch mode

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix lint issues
npm run format      # Format with Prettier
npm run typecheck   # TypeScript check

# Git
git fetch upstream  # Get latest changes
git rebase upstream/main # Rebase on main
```

### File Extensions

- `.tsx` - React components with TypeScript
- `.ts` - TypeScript files (no JSX)
- `.test.tsx` - Component test files
- `.test.ts` - Unit test files
- `.types.ts` - TypeScript type definitions

---

## ❓ Questions?

Don't hesitate to ask questions! We're here to help. You can:

- Open a [Discussion](https://github.com/nexttripanywhere/discussions)
- Join our [Discord](https://discord.gg/nexttripanywhere)
- Email us at support@nexttripanywhere.com

---

<div align="center">
  
**Thank you for contributing to Next Trip Anywhere!** 🌍✈️🚢
  
Together, we're making travel planning easier for everyone.
  
</div>
