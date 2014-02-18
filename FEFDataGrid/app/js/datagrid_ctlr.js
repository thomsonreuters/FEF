// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.txt for details.
// Copyright Thomson Reuters 2013. All rights reserved.

function DataGridController($scope, $http, $log) {
    'use strict';

    /**** Scope Properties ***/
    $scope.name = 'test';

    $scope.gridData = [];
    $scope.dataURL = null;
    $scope.currentSortField = undefined;
    $scope.currentSortAscending = undefined;
    
    // Set the DataTable ColumnDef Options
    $scope.columnDefs = [{ "bSortable": true }];


    /**** Scope Watches ***/


    /**** Scope Methods ***/
    $scope.refreshDataGrid = function(pageNumber, sortField, sortAscending)
    {
        var dataURL = "../data/datacollection.json";

        var sortFilter = '';

        // If a sort field has been specified, append the appropriate sort text to it.
        if(sortField !== undefined)
        {
            sortFilter = sortField + ' ' + (!sortAscending ? 'asc': 'desc');

            // For this example, we will simply append the sort logic to the query string.
            // Note that the static data file call ignores this parameter in this example.
            dataURL +='?sort=' + sortFilter;
        }

        // Execute the data call.
        // TODO: This should probably be a $resource so we can avoid the string manipulation above.
        $http.get(dataURL).success(function (data, status) {

            var columns = [];
            var column = {};

            angular.forEach(data.d.cols, function (value, key) {

                // Only render columns that are specified.
                if (!value.hidden) {

                    // Create a new column object.
                    column = {};

                    // Store the title in the object.
                    column.sTitle = value.header;
                    column.sWidth = value.width;
                    column.field = value.id;

                    // In this example, I only want to display the 2nd column as a hyperlink.
                    if( key === 1)
                    {
                        // Add the fnRender method to the column property
                        column.fnRender = function (oObj) {

                            // The function returns the html of the element we want to display in the cell.
                            // This example would send the user to the User/Edit/UserID route.
                            return '<a href="#!/user/edit/' + oObj.aData[0] + '">' + oObj.aData[1] + '</a>';

                            // Alternate method using named properties. Note that in order to use property names, the DataTables 'mData' column field specifier must be used to bind the column.
                            // return '<a href="#!/user/edit/' + oObj.aData.userID + '">' + oObj.aData.userName + '</a>';
                        };
                    }

                    // Store the object in the columns collection.
                    columns.push(column);
                }
            });

            // Store the columns collection in the public property.
            $scope.columnDefinitions = columns;

            // Store the grid data in the public property.
            $scope.gridData = data.d.dsOptions.data;

        }).
        error(function (data, status) {
            alert("Error! Status: " + status + " Data: " + data);
        });
   
    };

    // The double click handler to allow us to launch an app from the grid.
    // Note that double click will not work if editing is enabled as the row template changes
    // before the 2nd click can be registered.
    $scope.doubleClickHandler = function(task, index) {
        alert('Double Clicked Row: ' + index);
    };

    $scope.sortGrid = function(column) {
        $log.info( 'Sort Column: ' + column );

        // Iterate through the columns collection to identify the correct column.
        angular.forEach( $scope.columnDefinitions, function(value, key) {

            // Once the correct column is identified, extract the field name from the column object.
            if( value.sTitle === column)
            {
                // If the user has already sorted on this field, then they are switching the sort order.
                if($scope.currentSortField === value.field)
                {
                    $scope.currentSortAscending = (!$scope.currentSortAscending);
                }

                // Persist the sort field.
                $scope.currentSortField = value.field;

                // Refresh the data grid using the new sort field.
                $scope.refreshDataGrid($scope.currentPage, $scope.currentSortField, $scope.currentSortAscending);
            }
        });
    };


    /**** Initial Scope Method Calls ***/

    // Initialize the Grid Data array.
    $scope.refreshDataGrid($scope.currentPage, $scope.currentSortField, $scope.currentSortAscending);
}