// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="../../index.d.ts" />

module fruit15.fruitItemDetail {

    export class FruitItemDetailComponent implements angular.IComponentOptions {        
        public templateUrl: string;
        public template: string;
        public controller: any;
        public controllerAs: string;
        public bindings: any;

        constructor() {  
            this.templateUrl = 'js/components/fruit-detail/fruit-detail-view.html';
            this.controller = FruitItemDetailController;
            this.controllerAs = 'ctlr';

            // The bindings property is used to recieve the list resolved in the route's state. 
            // Note that the bindings properties are appended to the component's controller. Therefore, this.bindings = { fruitlist: 'value' },
            // becomes this.controller.fruitlist with the appropriate value mapped. Which means it can be bound to on the view like this: {{ctlr.fruitlist}}
            // In order to consume this value, the property must be declared as an input attribute in the component.
            // Example <fruitListComponent fruitlist="$resolve.[resolve property name]"></fruitListComponent>
            this.bindings = {
                currentfruititem: '<'
            }
        }
        
    }

    export class FruitItemDetailController {
        public testableProperty: string = 'Test property';

        constructor() {}            
    }
}