# Next Trip Anywhere - Travel Advisory Website

A modern, static travel advisory website built with Next.js 15, TypeScript, and Tailwind CSS. This application provides travel information, deals, and advisory services without requiring any backend infrastructure.

## Features

- **Travel Deals & Packages**: Browse curated travel deals for flights, cruises, and vacation packages
- **Location-Based Content**: Find deals from major cities (NYC, Boston, Miami, DC)
- **Lead Generation**: Capture customer inquiries through integrated form handling
- **Responsive Design**: Fully responsive across all devices
- **Performance Optimized**: Fast loading times with Next.js optimization
- **SEO Ready**: Complete SEO setup with meta tags and structured data

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: Formspree (external service)
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Form Validation**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/next-trip-anywhere.git
cd next-trip-anywhere
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Configure Formspree for form handling:
   - Sign up at [Formspree.io](https://formspree.io)
   - Create a new form
   - Add your form ID to `.env.local`:

   ```
   NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here
   ```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run format` - Format code with Prettier

## Project Structure

```
next-trip-anywhere/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── cruises/           # Cruise deals page
│   ├── flights/           # Flight deals page
│   ├── from/              # Location-based pages
│   │   ├── boston/
│   │   ├── dc/
│   │   ├── miami/
│   │   └── nyc/
│   ├── packages/          # Vacation packages page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── forms/            # Form components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── locations/        # Location page components
│   └── services/         # Service page components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── public/               # Static assets
└── styles/               # Global styles
```

## Configuration

### Form Handling

The application uses Formspree for form submissions. To configure:

1. Create an account at [Formspree.io](https://formspree.io)
2. Create a new form project
3. Copy your form ID
4. Add it to your `.env.local` file:
   ```
   NEXT_PUBLIC_FORMSPREE_ID=your_form_id
   ```

### Analytics (Optional)

To enable Google Analytics:

1. Add your measurement ID to `.env.local`:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   ```

### Error Tracking (Optional)

To enable Sentry error tracking:

1. Add your Sentry DSN to `.env.local`:
   ```
   NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
   NEXT_PUBLIC_ENABLE_ERROR_TRACKING=true
   ```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Static Export

To build as a static site:

1. Update `next.config.js`:

```js
module.exports = {
  output: 'export',
  // ... other config
}
```

2. Build the static site:

```bash
npm run build
```

3. The static files will be in the `out` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@nexttripanywhere.com or call 1-833-874-1019.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Forms powered by [Formspree](https://formspree.io/)
- Icons from [Lucide](https://lucide.dev/)
