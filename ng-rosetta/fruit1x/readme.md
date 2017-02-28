
# AngularJS Pre-1.5 Component Pattern Reference Application (ng-rosetta Series)
## Overview
This version of the Fruit application uses the traditional pattern of views and controllers with the ControllerAs syntax to minimize use of $scope.

Features of this application are:
* Written in TypeScript and using Typings
* Uses [ui-router](https://ui-router.github.io/ng1/docs/0.3.1/index.html#/api/ui.router) for routing
* ui-router states are defined with templateUrl and ControllerAs properties.
* Demonstrates the usage of Angular Factories, Services, Custom Directives and the ui-router Resolve service (asynchronous state lifecycle hooks)
* Uses [ui-grid](http://ui-grid.info/) for navigation
* Managed with Grunt build Tasks (see below for Grunt documentation)
* Consists of 3 primary routes:
        * A Home route: Sample Login page
        * A Fruit-List route: Navigation grid that demonstrates loading data from the constructor and binding to the ui-grid.
        * A Fruit-Detail route: Detail route that demonstrates form layout and using the route-resolve function to extract detail data from a route parameter during routing. A custom directive also displays image data and serves as a link to the item's source article.

## Open Source Tooling Installation
1. Install [NodeJs](http://nodejs.org). NodeJS is a JavaScript runtime environment built on the Chrome V8 JavaScript engine. The NodeJS installation includes the Node Package Manager aka NPM, 
which is used to download the majority of the remaining tools.  

2. Install [Grunt](http://gruntjs.com). Grunt is a NodeJS Task Runner plugin that allows various code maintenance tasks 
(linting, concatentation, minification, testing and much more) to be configured and grouped into processes. 
 Install the grunt command line interface using the following command:
 
        npm install -g grunt-cli

3. Install [Git](https://git-scm.com). Git is a free and open source distributed version control system. Many of the 3rd Party Libraries used by the application
and delivered by the Bower Package Manager (see below) are hosted in GitHub and therefore require the Git client to be installed.

4. Install [Bower](http://bower.io). Bower is a package manager that will download and update any public open source library dependencies your project may posses.
Examples: AngularJS, JQuery, etc. Install the Bower Package Manager with the following command:

        npm install -g bower

### Project Initialization
Once you've installed the above tools, you are ready to use them to download the recommended plugins and components.
 
#### Install Grunt Plugins
Grunt plugins are used to support the various Grunt tasks defined with the application. Grunt (and any other Node-based plugins) are installed 
according to instructions documented in the package.json file. This file describes a manifest of tools to download in the 
node_modules directory under the root of the application. The first time this tool is run, it may take several minutes as
there are a lot of javascript files being downloaded behind the scenes. See below for documentation on the various tasks defined in the Grunt config file.
Install Grunt plugins via the following command from the root folder of the project:

        npm install

#### Install 3rd Party Libraries
The Bower package manager works on a similar principal to the Node Package Manager, but it deals exclusively with 
Web Libraries. Bower uses the bower.json file to determine what libraries and versions thereof to download.
Also, the .bowerrc file tells Bower were to install the libraries (app/bower_components).

Install all required 3rd Party Libraries via the following command from the root folder of the project:
  
        bower install
 
That's it! You're ready to run the project and it's various tasks.
 
## Grunt Tasks
All Grunt Tasks are configured in the gruntfile.js file in the root folder of the project. The gruntfile defines all supported tasks 
(e.g. delete temporary directories, start a web server, run the typescript compiler, run unit tests, etc.) and includes configuration 
or ,in some cases, multiple configurations to support varied usages of the same task (e.g. debug vs release).

In most cases, individual tasks are combined into one or more "alias tasks" that allow multiple tasks to be run in a specified order.
Example: delete all files from the .tmp directory, then compile all /*.ts files into a js file in the .tmp directory, then update the 
 index.html file to reference the newly compiled js file).
   
### Local Server
The best task to test out the environment (and the most frequently used) is the Local Server. The Local Server task executes
a number of build tasks prior to starting the server, then starts the server, launches the application and then watches the file system for changes, 
automatically updating as they occur.  

1. The first task is clean:server. This is the 'clean' task, with a parameter of 'server'. The clean command simply deletes the contents of file folders 
based on the specified configuration. The server parameter directs Grunt to delete the contents of the .tmp project folder.
  
2. The next task is configureProxies:server. This task is a pre-configuration to the connect web server. It effectively establishes a secondary 
communication port to allow the file watcher to tell the server when to reload a changed file served on the main port.

3. The next task is concurrent:server. The concurrent task is a catchall that allows us to execute multiple build tasks simultaneously to reduce build time.
The server configuration currently only contains the copy:styles command, which moves the css files from the styles directory to the .tmp/styles directory for processing.
Additional build tasks can be added as they become necessary. 

4. The next task is less:server. The less task compiles /*.less files into /*.css files. The server parameter directs grunt to compile all
.less files into css files written to the .tmp/styles directory.

5. The next task is autoprefixer. The autoprefixer task parses CSS and adds vendor-prefixed CSS properties using the [Can I Use](http://caniuse.com) database.

6. The next task is connect:livereload. The connect task starts the local server and the livereload parameter activates the feature used to 
automatically reload updated files as you modify them.

7. The last task is watch. The watch task monitors the files in the project and automatically raises file change events to the livereload component.

Run the Local Server task by entering the following command:

        grunt serve
        
### Unit Test
Note that Unit Tests for the Fruit1X & Fruit15 projects are pending. 

The Unit Test task runs a few preparation tasks and then launches the Karma unit testing tool.

1. The first block of tasks executed are clean:server, concurrent:test, less:server, autoprefixer and connect:test. See above for descriptions
of each of these tasks.

2. The last task executed is karma. The karma task launches the karma unit testing tool and directs it to use the test/karma.conf.js configuration file. 
This file contains all the files needed to run unit tests and various configuration items for the Karma unit testing tool.
Lastly, the task singleRun configuration item is set to false. This allows developers to run the unit test task as a background task 
 that will automatically re-execute the unit tests whenever a file change is detected. 
 
Run the Unit Test task by entering the following command:

        grunt test
        
### Build for Release
The Build for Release task combines many of the tasks described above with proper concatenation & minification techniques.
Several angular-specific tasks are included to increase performance, and ensure Angular's dependency injection features remains unaffected 
by the minification process.

1. The first block of tasks executed are clean:dist, useminPrepare, concurrent:dist, less:dist and autoprefixer. See above for descriptions
of each of these tasks save useminPrepare.

    1a. The useminPrepare task defines and configures a handful of grunt tasks dynamically. These tasks are designed to prepare files for minification. 
    This implementation defines a concat task, an uglify task & a including concatenation.
  
2. The next task executed is concat. Concat was setup during the above useminPrepare step.
Specifically, this task defines a workflow that will concatenate all files referenced by the app/index.html page and enclosed within 
a `<!-- build:css [filename] -->` or `<!-- build:js [filename] -->` tag. The [filename entry indicates to the useminPrepare task where to output
the concatenated file. Each block defines a seperate file. 4 separate blocks are defined on the page, vendor css, application (custom) css, vendor scripts & application scripts.
The resulting concatenated files are then subject to further processing as described below.

3. The next task executed is ngAnnotate. The ng-annotate plugin adds AngularJS dependency injection annotations.

4. The next task executed is copy:dist. This task copies various files from the main application directory to the dist directory.

6. The next task executed is cssmin. This task minifies the css files found in the .tmp/styles directory and outputs them to the dist/[appname].css file.

7. The next task executed is uglify. This task minifies the js files. Note that the uglify task is defined with the sourceMap configuration setting to true.
This will produce /*.map files for use with debugging the minified js files.

8. The next task executed is filerev. This task will revision your files based on its contents and append a unique file number to the end of the file name.
This ensures that previously cached files cannot be used.

9. The next task executed is usemin. This task will replace the contents of the blocks defined for step 2 above in the index.html file with the final minified versions of the various css /& js files.

10. The last task executed is htmlmin. This task will minify all /*.html files found in the dist folder.

Run the Build task by entering the following command:

        grunt build

# Licensing
See [LICENSE.MD](./LICENSE.MD)