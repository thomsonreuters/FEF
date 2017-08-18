var path = require('path');

// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-mocha-reporter'),
      require('karma-remap-coverage'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-sourcemap-loader'),
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
      './src/main.spec.ts': ['webpack', 'coverage'],
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
              {
                loader: 'ts-loader',
                query: {
                  sourceMap: false,
                  inlineSourceMap: true
                }
              },
              { loader: 'angular2-template-loader' },
              { loader: 'angular-router-loader' }
            ]
          },

          {
            test: /\.html$/,
            use: [{ loader: 'html-loader' }]
          },
          
          {
            enforce: 'post',
            test: /\.ts$/,
            loader: 'istanbul-instrumenter-loader',
            include: [path.resolve(__dirname, 'src')],
            exclude: /(node_modules|app\\spec)/,
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

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    reporters: ['mocha', 'coverage', 'remap-coverage'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};