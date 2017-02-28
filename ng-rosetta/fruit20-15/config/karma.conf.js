var webpackConfig = require('./webpack.dev.js');
webpackConfig.entry = {};

// Karma configuration
module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      // require('karma-phantomjs-launcher'), // PhantomJS throws errors and appears unstable.
      require('karma-webpack')
    ],


    files: [
      // each file acts as entry point for the webpack configuration
      {pattern: '../src/main.spec.ts', watched: true}
    ],

    preprocessors: {
      // add webpack as preprocessor
      '../src/main.spec.ts': ['webpack'],
    },

    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
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