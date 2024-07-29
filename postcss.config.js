module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          customProperties: false,
        },
      },
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
          './styles/**/*.{scss,css}', // Ensure SCSS files are included
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: [
          'html',
          'body',
          'slick-slider',
          'slick-list',
          'slick-track',
          'slick-slide',
          'slick-active',
          'slick-initialized',
          'slick-loading',
          'slick-dots',
        ],
      },
    ],
    [
      'cssnano',
      {
        preset: 'default',
      },
    ],
  ],
};
