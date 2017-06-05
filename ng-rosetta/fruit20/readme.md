# Angular Pattern Reference Application (ng-rosetta Series)

## Overview
This is the final version of the Fruit application. The version uses standard Angular patterns and contains modernized versions of all components used in the Fruit15 application.

Features of this application are:
* All new Angular project
* Built and maintained via WebPack
* NG2 Router routes.
* NG2 Router Resolve feature
* NG2 Service using angular-in-memory-web-api & Promises
* NG2 Custom Components
* Use of ui-bootstrap for styling
* Lazy Loading of external modules via the NG2 Router
* Unit Testing using Karma & WebPack
* Internationalization via ng2-translate
* Demonstration of the Angular2 Ahead of Time (AOT) Compilation Feature
* Consists of 3 primary Components:
    * A Home Component: Sample Login page
    * A Fruit-List Component: Navigation grid that demonstrates loading data from the constructor and binding to the grid. Also hosts a button to load the Fruit-Vendor module (see below)
    * A Fruit-Detail Component: Detail Form that demonstrates form layout and using the route-resolve function to extract detail data from a route parameter during routing. A custom detail component also displays image data and serves as a link to the item's source article.
    * A fourth Component (Fruit-Vendor) was created to demonstrate Lazy Loading via the angular-router's loadChildren feature.

### Notes/Disclaimers
The internal version of this project uses 3rd party libraries that did not support Observables at the time of it's creation. Therefore, all asynchonous operations in this sample currently use a Promise-based pattern. Updating this pattern to use Observables is in the TODO section.

## Project Maintenance
### Local Development
To run the project using the WebPack Dev Server, execute `npm run start`

### Development Build
To generate an unoptimized version of the app with source maps, execute `npm run build:dev`. The output will be placed in ./dist/dev.

### Production Build
To generate an optimized version of the app without source maps, execute `npm run build:prod`. Currently, optimization is achieved via the Angular Ahead of Time (see below), and native webpack minification.

### Unit Tests
#### NOTE: Unit tests are currently broken due to the reorganization of the webpack configuration.
To start the Karma Unit Tests and File Watcher, execute `npm run test`

## Angular 2 Ahead of Time (AoT) Compilation
The [Angular 2 AOT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) process involves running our source code through the Angular2 compiler during the build processes.

This process has been simplified by the use of the @ngtools/webpack plugin. The use of this plugin, along with native webpack minification has been enabled as the default for the production build.

## TODO
* Fix the karma/webpack configuration to restore unit tests.
* Create a unit test for fruit-list component to handle the http call.
* Modify promise-based operations to use observables
* ~~Implement Lazy Loading fruit-vendor in AOT~~
* ~~Upgrade Webpack to 2.0~~

# Licensing
See [LICENSE.MD](./LICENSE.MD)