// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

Getting Started
================
This application is built based on the feature-based pattern. The pattern is as follows:

	+--app
	|  +--bower_components
	|  +--img
    |  +--js
    |  |  +--components
    |  |  |  +--<<feature>>
    |  |  |  |  +--partials
    |  |  |  |  +--someControler.js
    |  |  |  |  +--templateHtml.html
	|  |  |  +--directives
	|  |  |  +--filters
	|  |  |  +--services
	|  +--app.js
	|  +--controller.js
	|  +--home-view.html
	+--test
	   +--e2e
	   +--spec
	   +--karma.conf.js
	   +--protractor.conf.js

Grunt Commands
--------------
	grunt serve
This command will run a connect web server with live watch on port 9000.

    grunt test
This will run the karma tests using the config file test/karma.config.js

	grunt e2e
This will run the protractor tests using the config file test/protractor.config.js

	grunt build
This will build the web app and add a new folder called dist with the min and uglify files.

The defaults can be updated in the gruntfile.js

If you want to use [protractor](protractor.md) please see the document to see how to install protractor.