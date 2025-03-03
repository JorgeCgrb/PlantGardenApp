// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@models': './src/models',
            '@services': './src/services',
            '@utils': './src/utils',
            '@viewmodels': './src/viewmodels',
            '@navigation': './src/navigation',
          },
        },
      ],
    ],
  };
};