var path = require('path');

// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      // require('karma-phantomjs-launcher'),
      require('karma-webpack')
    ],

    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },


    files: [
      // each file acts as entry point for the webpack configuration
      { pattern: './src/main.spec.ts', watched: true }
    ],

    preprocessors: {
      // add webpack as preprocessor
      './src/main.spec.ts': ['webpack'],
    },

    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },

    webpack: {
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: [path.resolve(__dirname, './src/main.aot.ts')],
            use: [
              { loader: 'ts-loader' },
              { loader: 'angular2-template-loader' },
              { loader: 'angular2-router-loader' }
            ]
          },
          {
            test: /\.html$/,
            use: [{ loader: 'html-loader' }]
          }
        ]
      },
      resolve: { extensions: ['.ts', '.min.js', '.js'] }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    // browsers: ['PhantomJS'],
    singleRun: false
  });
};