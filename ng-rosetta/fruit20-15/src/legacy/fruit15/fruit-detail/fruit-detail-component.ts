// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.
// See the project's LICENSE.MD for details. Copyright Thomson Reuters 2017. All rights reserved.

import { FruitItem } from '../index';

export class FruitItemDetailComponent implements angular.IComponentOptions {
    public template: string = require('./fruit-detail-view.html') as string;
    public controller: any = FruitItemDetailController;
    public controllerAs: string = 'ctlr';

    // The bindings property is used to recieve the list resolved in the route's state.
    // Note that the bindings properties are appended to the component's controller. Therefore, this.bindings = { fruitlist: 'value' },
    // becomes this.controller.fruitlist with the appropriate value mapped. Which means it can be bound to on the view like this: {{ctlr.fruitlist}}
    // In order to consume this value, the property must be declared as an input attribute in the component.
    // Example <fruitListComponent fruitlist="$resolve.[resolve property name]"></fruitListComponent>
    public bindings: any;

    constructor() {

        // Note that we need to set the bindings in the constructor in order to satisfy the bindings type<any>
        // requirement in the angular.module.component() syntax.
        this.bindings = { currentfruititem: '=' };
    }
}

class FruitItemDetailController {
    private testableProperty: string = 'Test property';
}
