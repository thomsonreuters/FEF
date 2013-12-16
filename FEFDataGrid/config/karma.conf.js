// Karma configuration
module.exports = function(config) {
    config.set({

        basePath: '../',

        frameworks: ['jasmine'],

        files: [
            'app/lib/angular/angular-1.2.0.js',
            'test/lib/angular/angular-mocks-1.2.0.js',
            'app/js/fefdatagrid.js',
            'app/js/datagrid_ctlr.js',
            'app/js/app.js',
            'test/unit/**/*.js'
        ],

        browsers: ['Chrome']
    });
};