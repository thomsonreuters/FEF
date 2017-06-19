# Angular/AngularJS Hybrid Pattern Reference Application (ng-rosetta Series)
## Overview
This version of the Fruit application uses the UpgradeModule (@angular/upgrade) to import the AngularJS source code into a new Angular shell.

Features of this application are:
* All features of the Fruit15 Application.
* Fruit15 Source Code modified as follows:
    * 3rd party typescript /// reference statements modified to import statements to support WebPack
    * New Angular Component Added to Detail Component to demonstrate how to host an Angular Component in an NG1X Application.
* Fruit15 Source Code Bootstrapped using the UpgradeModule.
* Creation of a new Angular Project to host the hybrid
* Managed using WebPack2
* Unit Testing using Karma & WebPack
* The inclusion of a new Custom Angular Component to demonstrate the use of the downgradeComponent feature from the @angular/upgrade/static library.
* Addition of Angular Ahead-of-Time (AOT) Build Configuration.

## Project Maintenance
### Local Development
To run the project using the WebPack Dev Server, execute `npm run start`

### Development Build
To generate an unoptimized version of the app with source maps, execute `npm run build:dev`. The output will be placed in ./dist/dev.

### Production Build
To generate an optimized version of the app without source maps, execute `npm run build:prod`. Currently, optimization is achieved via the Angular Ahead of Time (see below). The output will be placed in ./dist/prod.

### Unit Testing
To start the Karma Unit Tests and File Watcher, execute `npm run test`

## Angular Ahead of Time (AoT) Compilation
The [Angular AOT](https://angular.io/guide/aot-compiler) process involves running our source code through the angular-compiler during the build processes.

This process has been simplified by the use of the @ngtools/webpack plugin. The use of this plugin, along with native webpack minification has been enabled as the default for the production build.

## TODOS
* Create a unit test for fruit-list component to handle the http call.
