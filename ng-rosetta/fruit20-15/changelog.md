# 2017-06-19

## Features
* Upgraded Angular portion to 4.2.3
* Upgraded AngularJS portion to 1.6.4
* Migrated all Bower Components to NPM.
* Migrated type definitions from Typings to TS 2.0 @Types
* Added TSLint and Codelyzer Analysis
* Simplified Webpack Configuration to a single file.
* Modified Webpack to consume both AngularJS and Angular entry points and removed all static references from index.html.
* Added Dev and Prod static builds (see readme for details).
* Simplified AOT implementation by using @ngtools/webpack plugin.
* Restructured legacy application path to accomodate a single build pass for AOT.

## TODO
* Minification is currently disabled as it breaks the fruit-detail component.

# 2017-04-14

## Features
* Upgraded Webpack to 2.3.3 and all supporting loaders & plugins