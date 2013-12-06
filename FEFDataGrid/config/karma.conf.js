basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
    'app/lib/angular/angular-1.2.0.js',
    'test/lib/angular/angular-mocks-1.2.0.js',
    'app/js/fefdatagrid.js',
    'app/js/datagrid_ctlr.js',
    'app/js/app.js',
    'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
