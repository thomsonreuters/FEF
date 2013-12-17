![Thomson Reuters Logo](http://cdn1.im.thomsonreuters.com/wp-content/themes/Im/images/tr-logo.png)

# DataTables AngularJS Directive #
**Author: David Owen (david.owen@thomsonreuters.com)**

**Project Demo: http://thomsonreuters.github.io/FEF/**

This project is built to host an Angular Directive that allows the usage of the DataTables.js open source control as an Angular Data Grid.

Notable Features include: 

- Simple Edit Features
- Isolated Scope
- Dynamic Column Generation from Service Data
- Server Side Sort logic

See the Roadmap section below for details and for what's coming next.

## Notable Features ##

### Simple Edit Features ###
The **is-row-editable** setting allows the directive to enable edit mode on a clicked row. When this feature is enabled, the contents of the target row is replaced by a series of input tags. Leaving the row commits the changes to the UI and the underlying data context.

A more robust and dynamic editing template is in the works.

### Isolated Scope ###
Using an Isolated Scope in the directive encapsulates the directive logic and only allows it access to the controller properties and methods mapped in the HTML declaration. It also allows multiple instances to be used on the same page.

The current version supports the following Controller member mappings:

- itemSource (required) - Indicates the property on the controller to be used to populate the DataTable with data. The directive will apply a watch on this property during initialization and will watch for changes.
 
- columnDefinitions (required) - Indicates the property on the controller to be used to set column data on the table. Note that the directive does contain logic to extract this information from table header elements, but this functionality is not yet functional. Once this logic is enabled, this property becomes optional.

- rowClicked (optional) - Indicates the method on the controller to pass the clicked row object to.
- rowDblclicked (optional) - Indicates the method on the controller to pass the double-clicked row object to.

- headerClicked (optional) - Indicates the method on the controller to pass the clicked header object to. This feature allows the controller to intercept sort events for the purpose of including them in it's service calls. 

### Dynamic Column Generation ###
The directive allows the controller to pass an array of column objects into it to allow for dynamic headers, visibility settings, etc. This example includes the column data in the service call to simulate a server-side driven table layout.
 
### Server Side Sort Logic ###
As mentioned above, the directive will pass the sorted column to the controller on header click (i.e. the native DataTables sort feature). The sample controller contains logic to build a query string parameter from the sort information to allow it to request a server side sort. This is required for supporting a server side paging solution. 

## Acknowledgements ##
Thanks to the [DataTables](http://datatables.net/ "DataTables") team. The DataTables library is a lightweight, feature rich grid solution with a great plugin community.

Also, a special thanks to Adam Webber, who's initial work on an AngularJS DataTables [directive](https://groups.google.com/forum/#!topic/angular/vM2DEMK_NMA) helped demonstrate some of the core concepts of the interaction between a Directive and the DataTables API:  [http://jsfiddle.net/zdam/pb9ba/](http://jsfiddle.net/zdam/pb9ba/)

## How to Use the FEFDataGrid Directive ##
1. Ensure all necessary files are available in your project (AngularJS, JQuery & DataTables Libraries and the FEFDataGrid.js directive file).

2. Add a controller that populates a property for the data (ex: gridData) and a property for the column definitions (ex: column Definitions).

Example:

	function DataGridController($scope) {
		$scope.gridData = [];
		$scope.columnDefinitions = [];		
	}


3. Add a reference to the directive to your page and map the item-source attribute to the data property in your controller and the column-definitions attribute to the column property in the controller. Note: ensure you populate the column property in your controller before the data property as changes to the data property trigger the rendering logic.

Example: 

    <table fef-data-grid
           class="dataTable"
           item-source="gridData"
           column-definitions="columnDefinitions">
    </table> 

## Getting Started With The Sample ##

**1. Install NodeJS**

The source code is packaged with the files necessary to run it in a local web server and to be tested using the Karma test tools. To get started you must first download and install NodeJS. Get the latest version here: [http://nodejs.org/](http://nodejs.org/)

**2. Install the necessary support files.**

Once you’ve successfully installed Node, you must install the various required node modules into the project directory via the Node Package Manager. To do so, open a console and navigate to the project root directory. From this directory run this command:


    npm install

**3. Run the local web server**

Once the Node Package Manager has completed downloading the Grunt Connect plugin, start the pre-configured web server by running the following command from the same directory:

	grunt server

While the web server is running, open your browser and navigate to http://localhost:8000


**Code Verification**

Run the following command to verify the correct usage of lower case and perform linting via JSHint on the source code directory:

	grunt 

## Unit Testing ##
To run the unit tests, run the following command from the repository root:

	grunt test

## Known Issues ##
1. Selecting a 2nd row for editing will occasionally skip the logic to restore the currently edited row to read only.
2. Switching to Edit Mode does not apply a width style to the dynamically generated input controls. Therefore, the grid will scroll horizontally when in edit mode.
3. Native sorting causes targeting issues with the row click event and is therefore disabled during edit mode. 

## Road Map ##
The following features are either in progress or identified for the next development cycle:

1. Cell Types: The ability to display images and hyperlinks.
2. Client/Server Side Pagination: wiring a series of paging controls to the directive and executing serer side pagination calls via the controller.
3. Multi-select: via row checkbox selection. 
4. Right-click Context Menu 
5. Performance Enhancements via visualization plugin. 
6. Enhanced edit features 

# Project File Structure #

    root directory \
		gruntfile.js - Grunt JS Task Configuration file. Used to run the Connect Web Server.
		package.json - Node package manifest file.

		app directory \ 
			index.html - Grid Gadget Prototype Host Page.

			css directory \ - Required CSS files.

			data directory \ - Static JSON files used to mock service calls.

			js directory \ - Application logic.
				app.js - Root Angular Application Module.
				datagrid_ctlr.js - Angular Grid Controller.
				fefdatagrid.js - Angular DataTables Directive.
				
			lib directory \ - Various 3rd Party JS Libraries.

		config directory \
			karma.conf.js - Karma Test Runner Configuration File.

		scripts directory \
			test.sh - Karma Unit Test Execution Batch File

		test directory \
 

			lib directory \ Protractor Supporting 3rd Party Libraries

			unit directory \ Karma Unit Tests