// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

module.exports = function (config) {

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        preprocessors: {
            // Add webpack as preprocessor to the test manifest file.
            'src/vendor.ts': ['webpack'],
            'src/main.spec.ts': ['webpack']
        },

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // each file acts as entry point for the webpack configuration      
            'src/vendor.ts',
            'src/main.spec.ts'
        ],

        // This is required to allow webpack to process TS files.
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },

        // Provide a custom webpack configuration as the conditional pattern used in the webpack.config.js file
        // appears to be incompatible with the karma-webpack plugin.
        webpack: {
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: [{ loader: 'ts-loader' }]
                    },
                    {
                        test: /\.html$/,
                        use: [{ loader: 'html-loader' }]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            { loader: 'style-loader' },
                            { loader: 'css-loader' }
                        ]
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                        use: [{ loader: 'file-loader' }]
                    },
                ]
            },
            resolve: { extensions: ['.js', '.min.js', '.ts'] }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            stats: 'errors-only'
        },

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'Chrome'
        ],

        // Which plugins to enable
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            // require('karma-phantomjs-launcher'), // PhantomJS throws errors and appears unstable.
            require('karma-webpack')
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
        autoWatch: true,
        colors: true,
        
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO
    });
};