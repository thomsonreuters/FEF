// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="../../index.d.ts" />

module fruit1x {
    'use strict'

    // Custom interface used to provide a typed property on scope to expose the loadDetail method.
    interface IFruitListScope extends angular.IScope {
        loadDetail: Function;
    }
    
    export class FruitController {
        private testableProperty: string = 'Binding Works';
        private isLoaderBusy: boolean = true;
        private fruitList: any[];
        private gridModel: uiGrid.IGridOptions = {};

        // These items need to be manually injected, otherwise dependency injection fails.
        // Note that the second parameter is the name of the state resolve parameter being passed in.
        static $inject = ['$scope', '$state', '$timeout', 'fruitFactory'];

        // Consume the necessary services, plus the resolved values provided by the router.
        constructor(
            private $scope: IFruitListScope,
            private $state: angular.ui.IStateService,
            private $timeout: angular.ITimeoutService,
            private fruitFactory: FruitFactory) {

            $scope.loadDetail = function (fruitItemID: any) {
                
                // Navigate to the detail state, passing the expected routing parameter in as an object with the expected routing property (FruitItemID).
                $state.go('fruit-detail', { FruitItemID: fruitItemID });
            }

            // Configure the data grid.                
            this.gridModel.multiSelect = false;
            this.gridModel.modifierKeysToMultiSelect = false;
            this.gridModel.noUnselect = true;
            this.gridModel.enableRowSelection = true;
            this.gridModel.enableRowHeaderSelection = false;
            this.gridModel.rowHeight = 100;

            // Define the grid columns.
            this.gridModel.columnDefs = [
                { name: 'id', visible: false },
                { name: 'common_name', displayName: 'Name' },
                { name: 'species', displayName: 'Species' },
                { name: 'region', displayName: 'Region' },
                { name: 'url', visible: false },
                { name: 'image_url', displayName: 'Image', width: 100, cellTemplate: '<img style="width:90px;height:90px;" ng-src="{{grid.getCellValue(row, col)}}" >' }
            ];

            // Apply Event Handlers.
            this.gridModel.onRegisterApi = function (gridApi) {

                // Attach an event handler to the rowSelectionChanged event.
                // Note that the ui-grid requires interaction with the scope object,
                // otherwise, scope would be unecessary in this controller.
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                   
                    // Extract the ID property from the object bound to the selected row.
                    $scope.loadDetail(row.entity['id']);

                });
            };

            // Impose a timer on the service load to simulate a loading delay.
            this.$timeout(500).then(() => {

                // Execute the factory method and cast the result of the async operation to the desired container and return it.
                this.fruitFactory.getFruitList().then(
                    (data: any) => {
                        // The FlexGrid's item-source property is bound to the fruitList of this object.
                        // Simply populating it here will automatically render the results in the view.                                        
                        this.gridModel.data = data.data;

                        // The busy loader is bound to this property. Setting it to true after the service has run will disable it.
                        this.isLoaderBusy = false;
                    }
                );
            })
        };
    }
}