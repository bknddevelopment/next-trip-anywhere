/**
 * Optimized PostCSS Configuration for 500+ Page Site
 * Implements advanced CSS optimizations
 */

module.exports = {
  plugins: {
    // Tailwind CSS
    tailwindcss: {},

    // Autoprefixer for browser compatibility
    autoprefixer: {},

    // CSS Nano for minification
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: [
          'advanced',
          {
            discardComments: {
              removeAll: true,
            },
            reduceIdents: true,
            mergeIdents: true,
            discardUnused: true,
            discardOverridden: true,
            normalizeUrl: true,
            mergeRules: true,
            mergeLonghand: true,
            minifyFontValues: true,
            minifyParams: true,
            minifySelectors: true,
            normalizeCharset: true,
            normalizePositions: true,
            normalizeRepeatStyle: true,
            normalizeString: true,
            normalizeTimingFunctions: true,
            normalizeUnicode: true,
            normalizeWhitespace: true,
            uniqueSelectors: true,
            calc: true,
            colormin: true,
            convertValues: true,
            discardDuplicates: true,
            discardEmpty: true,
            minifyGradients: true,
            orderedValues: true,
            reduceTransforms: true,
            svgo: true,
            zindex: false, // Don't rebase z-index values
          },
        ],
      },

      // PurgeCSS for removing unused CSS
      '@fullhuman/postcss-purgecss': {
        content: [
          './app/**/*.{js,ts,jsx,tsx}',
          './components/**/*.{js,ts,jsx,tsx}',
          './lib/**/*.{js,ts,jsx,tsx}',
        ],
        safelist: {
          standard: [
            /^animate-/,
            /^transition-/,
            /^transform/,
            /^translate-/,
            /^rotate-/,
            /^scale-/,
            /^opacity-/,
            /^blur-/,
            /^grayscale-/,
            /^bg-gradient-/,
            /^from-/,
            /^via-/,
            /^to-/,
            'html',
            'body',
          ],
          deep: [/^swiper/],
          greedy: [
            /^(hover|focus|active|disabled|group-hover|dark)/,
            /^peer-/,
            /^prose/,
          ],
        },
        defaultExtractor: (content) => {
          // Capture as liberally as possible, including things like `h-(screen-1.5)`
          const broadMatches = content.match(/[^<>"'`\\s]*[^<>"'`\\s:]/g) || []
          const innerMatches =
            content.match(/[^<>"'`\\s.()]*[^<>"'`\\s.():]/g) || []
          return broadMatches.concat(innerMatches)
        },
        fontFace: true,
        keyframes: true,
        variables: true,
      },

      // PostCSS Import for combining files
      'postcss-import': {
        path: ['styles'],
      },

      // PostCSS Preset Env for modern CSS features
      'postcss-preset-env': {
        stage: 3,
        features: {
          'nesting-rules': true,
          'custom-media-queries': true,
          'custom-properties': true,
          'gap-properties': true,
          'overflow-wrap-property': true,
        },
        autoprefixer: false, // We're using autoprefixer separately
      },

      // PostCSS Sort Media Queries for better caching
      'postcss-sort-media-queries': {
        sort: 'mobile-first',
      },

      // PostCSS Combine Duplicated Selectors
      'postcss-combine-duplicated-selectors': {
        removeDuplicatedProperties: true,
        removeDuplicatedValues: true,
      },

      // PostCSS Merge Rules
      'postcss-merge-rules': {},

      // PostCSS Discard Duplicates
      'postcss-discard-duplicates': {},

      // PostCSS Calc for optimizing calc() expressions
      'postcss-calc': {},

      // PostCSS Normalize Whitespace
      'postcss-normalize-whitespace': {},

      // PostCSS Ordered Values
      'postcss-ordered-values': {},

      // PostCSS Minify Selectors
      'postcss-minify-selectors': {},

      // PostCSS Merge Longhand
      'postcss-merge-longhand': {},

      // PostCSS Unique Selectors
      'postcss-unique-selectors': {},
    }),
  },
}