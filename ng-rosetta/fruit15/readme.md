# AngularJS 1.5 Component Pattern Reference Application (ng-rosetta Series)
## Overview
This version of the Fruit application uses the newer Component pattern introduced with Angular 1.5.

Features of this application are:
* Written in TypeScript and using @Types
* Uses [ui-router](https://ui-router.github.io/ng1/docs/0.3.1/index.html#/api/ui.router) for routing
* ui-router states are defined with Angular Components.
* Demonstrates the usage of AngularJS Services, Custom Components and the ui-router Resolve service (asynchronous state lifecycle hooks)
* Uses [ui-grid](http://ui-grid.info/) for navigation
* Managed with WebPack.
* Contains of 3 Sample Components:
   * A Home Component: Sample Login page
   * A Fruit-List Component: Navigation grid that demonstrates loading data from the constructor and binding to the ui-grid.
   * A Fruit-Detail Component: Detail Form that demonstrates form layout and using the route-resolve function to extract detail data from a route parameter during routing. A custom directive also displays image data and serves as a link to the item's source article.

## Open Source Tooling Installation
1. Install [NodeJs](http://nodejs.org). NodeJS is a JavaScript runtime environment built on the Chrome V8 JavaScript engine. The NodeJS installation includes the Node Package Manager aka NPM, which is used to download the majority of the remaining tools.  

3. Install [Git](https://git-scm.com). Git is a free and open source distributed version control system. Many of the 3rd Party Libraries used by the application and delivered by the Bower Package Manager (see below) are hosted in GitHub and therefore require the Git client to be installed.

### Project Initialization
Once you've installed the above tools, you are ready to use them to download the recommended plugins and components.
 
#### Install Project Dependencies & 3rd Party Libraries.
The package.json file describes a manifest of tools to download into the node_modules directory under the root of the application. The first time this tool is run, it may take several minutes as there are a lot of javascript files being downloaded behind the scenes. 

Install Project Dependencies via the following command from the root folder of the project:

        npm install

 
That's it! You're ready to run the project and it's various tasks.
 
## Project Maintenance
### Local Development
To run the project using the WebPack Dev Server, execute `npm run start`

### Development Build
To generate an unoptimized version of the app with source maps, execute `npm run build:dev`. The output will be placed in ./dist/dev.

### Production Build
To generate an optimized version of the app without source maps, execute `npm run build:prod`. The output will be placed in ./dist/prod.

### Unit Testing
To start the Karma Unit Tests and File Watcher, execute `npm run test`

## TODOS
* Need to create a unit test for the fruit-list component's $http call.
* The ui-router @type definition appears to be out of sync with the new ui-router package (@uirouter/angularjs) and produces a type error on the IState.bindings property as documented here: <https://ui-router.github.io/guide/ng1/route-to-component#resolve-bindings>.