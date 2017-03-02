# Angular/AngularJS1.5 Hybrid Pattern Reference Application (ng-rosetta Series)
## Overview
This version of the Fruit application uses the UpgradeModule feature in Angular to import the Fruit15 source code into a new Angular shell.

Features of this application are:
* All features of the Fruit15 Application.
* Fruit15 Source Code modified as follows:
    * 3rd party typescript /// reference statements modified to import statements to support WebPack
    * Angular 2 Component Added to Detail Component to demonstrate how to host an NG2 Component in an NG1X Application.
* Fruit15 Source Code Bootstrapped using the UpgradeModule.
* Creation of a new Angular 2.0 Project to host the hybrid
* Managed using WebPack
* Unit Testing using Karma & WebPack
* The inclusion of a new Custom Angular 2 Component to demonstrate the use of the downgradeComponent feature from the @angular/upgrade/static library.
* Addition of Angular Ahead-of-Time (AOT) Build Configuration.

## Project Maintenance
### Local Development
To run the project using the WebPack Dev Server, execute `npm run start`

### Local Development
To start the Karma Unit Tests and File Watcher, execute `npm run test`

## Angular 2 Ahead of Time (AoT) Compilation
### Notes/Disclaimers
The `copyresources` npm script will restore the various Angular AOT dependencies, but does not currently handle copying the bower_components folder to the dist/assets folder. This must be done manually the first time the AOT projectd is built. This is on the TODO list below.

The AOT process automatically handles the Fruit15 source code due to it's inclusion in the main-aot.ts file. However, the AOT compiler does not handle html templates. Therefore, an additional build task is pending to handle the identification and processing of the 3 html files used by the 3 components. For the time being, they've been copied into the dist folder to allow the AOT version to run properly. This is also on the TODO list below.

Each file, including the final output of the aot process described below, is manually refenced in the dist\index.html file as there is no packaging process currenlty configured to inject them.

Both the AngularJS and Angular source code is included in the AOT build process. However, the AngularJS html templates are not. For demonstration purposes, the html templates have been copied to the /dist folder until a proper build process is created. See the TODO section at the bottom of this document for all outstanding tasks.

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

## TODOS
* Create an Html Template build task for AOT.
* Migrate build system to WebPack 2
* Create a unit test for fruit-list component to handle the http call.

# Licensing
See [LICENSE.MD](./LICENSE.MD)