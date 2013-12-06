function fefDataGridDirective($compile) {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            itemSource: '=',
            columnDefinitions: '=',
            rowClicked: '&',
            rowDblclicked: '&',
            headerClicked: "&"
        },
        link: function(scope, element, attrs) {

            // Default the grid editability to false.
            var isEditable = false;

            // If the directive specifies edit mode, then capture this.
            if(attrs.isRowEditable)
            {
                isEditable = scope.$eval(attrs.isRowEditable);
            }

            /*************** Capture and Apply Data Table Configuration Options *********************/
            // Store the DataTable options in the scope, use defaults if none specified by user
            scope.dataTableOptions = {};

            // Check the table attributes and apply any column definitions found.
            if (attrs.aoColumnDefs !== undefined && attrs.aoColumnDefs.length > 0) {
                scope.dataTableOptions = scope.$eval(attrs.aoColumnDefs);
            } else {
                // If no options were specified on the table, set some defaults.
                scope.dataTableOptions= {
                    "bAutoWidth": false,
                    "bStateSave": true,
                    "bPaginate": false,
                    "bDeferRender": true,
                    "bFilter": false,                    
                    "bDestroy": false,
                    "bProcessing": true,
                    "sDom": '<"top">rt<"bottom"flp><"clear">SR'
                };
            }

            /*************** Capture and Apply Data Table Columns *********************/
            // Check for any declared columns and apply any found.
            var declarativeColumns = [];

            // Look for columns defined with th elements.
            // TODO: This doesn't appear to work. No TH elements are found.
            // Apparently, because of the presence of the full jquery library the directive is returning
            // the function that returns the table in the element. Not the table itself. Investigation pending.
            element.find('th').each(function(index, elem) {
                declarativeColumns.push($(elem).text());
            });

            // If any TH elements were found, store them in the aoColumns property of the DataTable.            
            if (declarativeColumns.length > 0) {
                scope.dataTableOptions.aoColumns = declarativeColumns;
            }
            // Otherwise, check for columns declared in the aoColumns attribute and apply them.
            else if (scope.columnDefinitions) {
                scope.dataTableOptions.aoColumns = scope.columnDefinitions;
            }

            // If any column definitions where defined in the table, apply them here.
            if (attrs.aoColumnDefs) {
                scope.dataTableOptionsaoColumnDefs = scope.$eval(attrs.aoColumnDefs);
            }

            /*************** Event Handlers *********************/
            // Click Handler (Enable Edit Mode) Function.
            scope.rowClickHandler = function(row) {

                // Retrieve the index of the clicked Row.
                var rowIndex = row.index();

                // Do not attempt to apply edit mode to the header row.
                if($(row).parent("thead").length > 0 )
                {
                    return;
                }

                // Call the specified controller function.
                // Convert the row to a rowParameter property as this is what the controller's function is expecting.
                scope.rowClicked({rowParameter: row});

                // If Edit Mode is enabled, apply the edit mode template.
                if(isEditable === true)
                {
                    // If a row was already being edited, then remove edit template and selection class.
                    if (scope.editRow) {

                        // Do not attempt to apply the edit template on the same row that is being edited.
                        if (row.index() === scope.editRow.index())
                        {
                            return;
                        }

                        // Retrieve the data context for the edited row.
                        var editedDataContext = scope.itemSource[scope.editRow.index()];

                        // Validate the row.    
                        if( validateRowChanges(row, dataContext)) {
                            return;
                        }

                        // Convert the row teamplate back to read only.
                        commitRowChanges( scope.editRow, editedDataContext );

                        // Save the row changes to the underlying data context.
                        updateRowDataContext( scope.editRow, editedDataContext);

                        // Remove the selected row styling.
                        scope.editRow.removeClass('row_selected');
                    }

                    // Apply the selection class to the newly selected row.
                    row.addClass('row_selected');

                    // Retrieve the data context for the edited row.
                    var dataContext = scope.itemSource[rowIndex];

                    // Apply the editing template to the newly selected row.
                    applyEditTemplate(row, dataContext);

                    // Store the current row as the selected row.
                    scope.editRow = row;
                }
            };

            // DoubleClick Handler Function.
            scope.rowDoubleClickHandler = function(row) {
                // Call the specified controller function.
                // Convert the rowParameter to the actual row context.
                scope.rowDblclicked({rowParameter: row});
            };

            // THead/Sort Click Handler
            scope.theadClickHandler = function(thead) {
                scope.headerClicked({column: thead[0].innerText});
            };

            /******** Directive Methods ************/
            // Transform the standard row template into a series of input tags bound to
            function applyEditTemplate ( row, rowDataContext ) {

                // Extract all the cells from the row.
                var rowCells = $('>td', row);
                var editCells = [];


                // Insert a text box in each row using the data context as the value source.
                for(var cellCounter = 0; cellCounter < rowCells.length; cellCounter++) {
                    
                    var columnDef = scope.columnDefinitions[cellCounter];
                    var cellDataContext = null;
                    var cellWidth = rowCells[cellCounter].offsetWidth;

                    if (columnDef.mData)
                    {
                        cellDataContext = rowDataContext[columnDef.mData];
                    }
                    else
                    {
                        cellDataContext = rowDataContext[cellCounter];
                    }

                    editCells[cellCounter] = '<td style="width:' + cellWidth + ';"><div class="control-group"><input type="text" value="' + cellDataContext + '"></div></td>';
                }

                // Apply the edit cell Html.
                $(row).html(editCells);

                //Note: sorting causes targeting issues and generally makes everything more complicated so we're just going clear sorting
                // for this first version.
                scope.dataTable.fnSort([]);

                // Redraw the table.
                scope.dataTable.fnDraw();
            }

            // Apply the edits made to the various inputs back into the data grid.
            function commitRowChanges( row, dataContext) {

                var rowIndex = row.index();

                // Extract all the cells from the row.
                var rowCells = $('>td', row);

                // Extract all the inputs
                var textControls = $('input', row);

                // Update each cell in the DataTable row to commit the change to the table and restore the row template.
                for(var cellCounter = 0; cellCounter < rowCells.length; cellCounter++) {
                    scope.dataTable.fnUpdate( textControls[cellCounter].value, rowIndex, cellCounter, false );
                }
            }

            // Update the underlying data context object with the new values in the row.
            function updateRowDataContext( row, dataContext ){

                // Extract all the cells from the row.
                var rowCells = $('>td', row);

                // Update each property in the data context from it's cell.
                for(var cellCounter = 0; cellCounter < rowCells.length; cellCounter++) {
                    dataContext[cellCounter] = scope.dataTable.fnGetData(rowCells[cellCounter]);
                }
            }

            // Validation Example.
            function validateRowChanges( row, dataContext) {
                var errors = false;
                var rowIndex = row.index();


                // Extract all the cells from the row.
                var rowCells = $('>td', row);

                // Extract all the inputs
                var textControls = $('input', row);

                angular.forEach(textControls, function (textControl) {
                    // Require a value in each cell.
                    if (textControl.value === '') {
                        errors = true;
                        $(textControl).parent().addClass('error');
                    }
                    else {
                        $(textControl).parent().removeClass('error');
                    }
                });
            
                return errors;                
            }


            /**** Directive Watches ***/

            // Set a watch on the Controller property assigned to the directive's itemSource in the table declaration. Rebuild the table if it changes.
            scope.$watch('itemSource', function(newValue, oldValue) {
                if( newValue !== oldValue) {

                    var startTime, endTime;

                    // If the Data Table has not already been created..
                    if(scope.dataTable == null)
                    {
                        // Examine the data to see if it has any content. If it doesn't,
                        // then the watch is in it's start up execution.
                        if( newValue != null && newValue.length > 0)
                        {
                            // Retrieve the column information defined in the datatable declaration.
                            // This data should now be present if it was delivered in the data call.
                            if(scope.dataTableOptions.aoColumns === undefined)
                            {
                                scope.dataTableOptions.aoColumns = scope.columnDefinitions;
                            }

                            // Apply the DataTable plugin to the specified element and pass the various options
                            // captured above in as the options parameter..
                            scope.dataTable = element.dataTable(scope.dataTableOptions);

                            startTime = new Date();

                            // Add the newly delivered data to the table.
                            scope.dataTable.fnAddData(newValue);

                            endTime = new Date();

                            console.log('Render time = ' + (endTime - startTime) + 'ms');

                            // Add the click handler to each TR element.
                            $(scope.dataTable).on("click", "tr", function(event){
                                scope.rowClickHandler($(this));
                            });

                            // Add the double click handler to each TR element.
                            $(scope.dataTable).on("dblclick", "tr", function(event){
                                scope.rowDoubleClickHandler($(this));
                            });

                            // Add the click event to the thead area.
                            $(scope.dataTable).on("click", "thead th", function(event){
                                scope.theadClickHandler($(this));
                            });

                        }
                    }
                    else
                    {
                        // Otherwise, refresh the datatable with the new data.
                        var val = newValue || null;

                        if (val) {
                            // Remove the current data from the table.
                            scope.dataTable.fnClearTable();

                            if (scope.editRow) {
                                scope.editRow = undefined;
                            }
                            startTime = new Date();

                            // Add the newly delivered data to the table.
                            scope.dataTable.fnAddData(newValue);

                            endTime = new Date();

                            console.log('Render time = ' + (endTime - startTime) + 'ms');
                        }
                    }
                }
            });
        }
    };
}