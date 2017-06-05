# 2017-06-05

## Features
* Upgraded to Angular 4.1.0.
* Added TSLint and Codelyzer analysis to all builds.
* Migrated type definition management from Typings to @Types.
* Reorganized the Webpack configuration down to a single file.
* Removed the dependency of the webpack.config.js file from karma and replaced it with a self-contained configuration.
* Created development and production builds to demonstrate various webpack features (see the readme for more info).
* Added the @ngtools/webpack plugin to enable automated Angular AOT compilation in the production build.
* Refactored the fruit-vendor component implementation to support lazy loading in the AOT-optimized version.
* Migrated the data acquisition sample from  a static json $http call, to an Angular In-Memory Database.

# 2017-04-03

## Features
* Upgraded to Webpack2, along with all subsequent Loaders & Plugins.
* Upgraded to TypeScript 2.3.0

# Licensing
See [LICENSE.MD](./LICENSE.MD)