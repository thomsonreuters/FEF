// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.txt for details.
// Copyright Thomson Reuters 2013. All rights reserved.

// Define the Quiz Module as an Angular Module.
var FEFDataGridModule = angular.module('FEFDataGridModule', []);


/**** Controller Initialization ***/
FEFDataGridModule.controller('DataGridController', DataGridController);

/**** Directive Initialization ***/

// Front End Framework Data Grid Directive
FEFDataGridModule.directive('fefDataGrid', fefDataGridDirective);
