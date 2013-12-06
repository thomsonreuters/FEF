// Define the Quiz Module as an Angular Module.
var FEFDataGridModule = angular.module('FEFDataGridModule', []);


/**** Controller Initialization ***/
FEFDataGridModule.controller('DataGridController', DataGridController);

/**** Directive Initialization ***/

// Front End Framework Data Grid Directive
FEFDataGridModule.directive('fefDataGrid', fefDataGridDirective);
