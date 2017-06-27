// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

import { FruitService } from './fruit-service';
import { FruitItem } from '../../index';

export class FruitListComponent implements angular.IComponentOptions {
    public template: string = require('./fruit-list-view.html') as string;
    public controller: any = FruitListController;
    public controllerAs: string = 'ctlr';
}

class FruitListController {
    // These items need to be manually injected, otherwise dependency injection fails.
    // Note that the second parameter is the name of the state resolve paramet
    private gridModel: uiGrid.IGridOptions = {};
    private isLoaderBusy: boolean = true;
    public testableProperty: string = 'Test property';

    // Consume the necessary services.
    private static $inject = ['$log', '$scope', '$state', '$timeout', 'fruitService'];
    constructor(
        private $log: angular.ILogService,
        private $scope: angular.IScope,
        private $state: angular.ui.IStateService,
        private $timeout: angular.ITimeoutService,
        private fruitService: FruitService) { }

    public $onInit() {
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
        this.gridModel.onRegisterApi = (gridApi: uiGrid.IGridApi) => {

            // Attach an event handler to the rowSelectionChanged event.
            // Note that the ui-grid requires interaction with the scope object,
            // otherwise, scope would be unecessary in this controller.
            gridApi.selection.on.rowSelectionChanged(this.$scope, (row: uiGrid.IGridRowOf<FruitItem>) => {

                // Extract the ID property from the object bound to the selected row.
                this.loadDetail(row.entity.id);

            });
        };

        // Impose a timer on the service load to simulate a loading delay.
        this.$timeout(500).then(() => {
            // Make a call to the service to retrieve the data list.
            this.fruitService.GetFruitList().then(
                (data) => {
                    // The Grid's object model is bound to the gridModel object.
                    // Simply populating the data property here will automatically render the results in the view.
                    this.gridModel.data = data.data;

                    // The busy loader is bound to this property. Setting it to true after the service has run will disable it.
                    this.isLoaderBusy = false;
                }
            );
        });

        this.$log.info('Fruit List Controller Loaded.');
    }

    public loadDetail(fruitItemID: any) {

        // Then, navigate to the detail state, passing the expected routing parameter in as an object
        // with the expected routing property (fruitItemId).
        this.$state.go('fruit-detail', { FruitItemID: fruitItemID });
    }
}
