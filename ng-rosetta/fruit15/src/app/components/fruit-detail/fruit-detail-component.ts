// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

import { FruitItem } from '../../index';

export class FruitItemDetailComponent implements angular.IComponentOptions {
    public template: string = require('./fruit-detail-view.html') as string;
    public controller: any = FruitItemDetailController;
    public controllerAs: string = 'ctlr';

    // The bindings property is used to recieve the selected fruitItem resolved in the route's state.
    // Note that the bindings properties defined in the Component are appended to the Component's Controller.
    // Therefore, this.bindings = { currentfruititem: '<' }, becomes this.controller.fruitlist with the appropriate value mapped.
    // Which means it can be bound to on the view like this: {{ctlr.currentfruititem}}
    public bindings: any = { currentfruititem: '<' };
}

class FruitItemDetailController {
    public testableProperty: string = 'Test property';

    private static $inject = ['$log'];
    constructor(private $log: angular.ILogService) {}

    public $onInit() {
        this.$log.info('Fruit Detail Controller Loaded.');
    }
}
