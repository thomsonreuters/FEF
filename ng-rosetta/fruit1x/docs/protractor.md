// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

Protrator Setup
===============

Prerequisites
-------------

Protractor is a [Node.js](http://nodejs.org/) program. To run, you will need to have Node.js installed. You will download Protractor package using [npm](https://www.npmjs.org/), which comes with Node.js. Check the version of Node.js you have by running `node --version`. It should be greater than v0.10.0.

You may have to down load the selenium jar file from here [download](http://docs.seleniumhq.org/download/). place this file in your protrator folder. ie. *$NODE_HOME/node_modules/protractor/selenium*


By default, Protractor uses the [Jasmine](http://jasmine.github.io/1.3/introduction.html) test framework for its testing interface. This tutorial assumes some familiarity with Jasmine.

This tutorial will set up a test using a local standalone Selenium Server to control browsers. You will need to have the [Java Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html) installed to run the standalone Selenium Server. Check this by running `java -version` from the command line.

Setup
-----

Use npm to install Protractor globally with:

    npm install -g protractor

This will install two command line tools, `protractor` and `webdriver-manager`. Try running `protractor --version` to make sure it's working.

The `webdriver-manager` is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:

    webdriver-manager update

Now start up a server with:

    webdriver-manager start

This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. Leave this server running throughout the tutorial. You can see information about the status of the server at `http://localhost:4444/wd/hub`.

Run
-----
Once you have protractor install now you can run your tests. 

#####Step 1.
Create Jasmine tests in your e2e folder with the tempate of *_spec.js

#####Step 2.
Start up webdriver with the command
	webdriver-manager start

#####Step 3
Start up your web servier with
	grunt serve

#####Step 4
Run your tests with the command
	grunt e2e

This will run your tests using a standalone Selemium server.