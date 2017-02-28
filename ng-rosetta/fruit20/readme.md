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

### Local Development
To start the Karma Unit Tests and File Watcher, execute `npm run test`

## Angular 2 Ahead of Time (AoT) Compilation
### Notes/Disclaimers
Each file, including the final output of the aot process described below, is manually refenced in the dist\index.html file as there is no packaging process currenlty configured to inject them.

The Lazy Loading example of the Fruit-Vendor Module does not currently work with AOT. A task to address this is in the TODO section.

### Process Overview
The [Angular 2 AOT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) process involves running our source code through the Angular2 compiler during the build processes.
- We will compile twice; once to generate the main block of optimized typescript.
- Then again using the static browser-platform component as the starting point, eliminating the need for the dynamic compiler.
- Then we will perform tree shaking on the resulting JavaScript using the Rollup utility.
- Lastly, we will transpile the bundled JavaScript down to ES5.

### Step 0: Delete the aot build directory
The aot compiler doesn't appear to be able to overwrite existing JavaScript. Running the compiler when the output directories are already in place does not produce an error, but does not actually output updated JavaScript (though the TypeScript appears to update correctly).

Execute: `npm run clean:aot` to flush the directory.

### Step 1: Create the initial optimized TypeScript version using the Angular 2 Compiler
The AOT Compiler consumes a TypeScript configuration file with an additional "angularCompilerOptions" section.
This first configration file outputs the optimized typescript into the /aot/unbundled_ts folder, and the JavaScript into the dist/aot/discard_js folder. The JavaScript output of this first step is not usable and causes problems if the same directory is used without deleteing it prior to the second pass of the compiler.

This configration file also  uses the src/main.ts file as it's entry point. This is a standard Angular 2 starup file and uses the @angular/platform-browser-dynamic's bootstrapModule method to bootstrap the app.module file. (This version still uses the dynamic compiler, which will cause it to be included in the bundle.)

Lastly, the configuration file stipulates that the output be formatted as es2015. This format is required to use the Rollup utility described below.

Execute `npm run build:aot1`

### Step 2: Create the fully static, optimized JavaScript version using the Angular 2 Compiler
This second configration file again outputs the optimized typescript into the aot/unbundled_ts folder, and the JavaScript into the aot/unbundled_js folder. 
This is the JavaScript folder that we want to use going forward.

This configration file also  uses the src/main-aot.ts file as it's entry point. This is a modified version of the main.ts file and uses the @angular/platform-browser's bootstrapModuleFactory method to bootstrap the now compiled starup file from aot/unbundled_ts/src/app/app.module.ngfactory. (Because this version uses the static compiler, the dyamic compiler is no longer required and elimated from the optimized output.)

Execute `npm run build:aot2`

### Step 3: Perform Tree Shaking on the optimized JavaScript using the Rollup utility
The source code now residing in the aot/unbundled_js folder is now ready to be analyzed. The rollup-config.js file consumes the source code in this directory and outputs the resulting streamlined source code into a single file here: aot/bundle.js. The rollup utility requires all incoming source code to be formatted as es2015. However, two of the 3rd party libraries used in the project (rxjs & ng-bootstrap) use the CommonJS format. To compensate for this, we use the CommonJS Rollup plugin. Passing the paths to these libraries into the CommonJS plugin parameter section of the Rollup configuration file allows Rollup to transpile them to the es2015 format before optimizing them.

Execute `npm run build:aot3`

### Step 4: Transpile the optimized code using the TypeScript compiler
The [Rollup](http://rollupjs.org/) utility optimized the source code by trimming all unecessary aspects of the application and its dependencies. But it leaves the resulting code in es2015 format, which is currently unsupported by browsers. To use the optimized source code, we need to transpile it to es5. We can use the TypeScript compiler (tsc) for this. The tsconfig-es5.json configuration file enables consumption of JavaScript via the allowJS flag and consumes the bundle.js file produced by the prior step and outputs the file dist\final.js.

Execute `npm run build:aot4`

### Serve!
The [lite-server](https://github.com/johnpapa/lite-server) is a great lightweight server for testing our aot build. The lite-server-config.json configuration file serves the contents of the dist folder on port 8081.

Execute: `npm run serve:aot`

### All Together now
All of the above AOT tasks have been concatenated into a single build task.

Execute: `npm run build:aot`

## TODO
* Create a unit test for fruit-list component to handle the http call.
* Implement Lazy Loading fruit-vendor in AOT
* Modify promise-based operations to use observables
* Upgrade Webpack to 2.0

# Licensing
See [LICENSE.MD](./LICENSE.MD)