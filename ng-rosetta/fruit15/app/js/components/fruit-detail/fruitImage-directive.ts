// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="../../index.d.ts" />

module fruit15.fruitItemDetail {

    export class FruitImage implements angular.IComponentOptions {
        public templateUrl: string;
        public template: string;
        public controller: any;
        public controllerAs: string;
        public bindings: any;

        constructor() {
            this.controller = FruitImageController;
            this.controllerAs = 'ctrl';
            this.template = `
                <div>
                    <a ng-href="{{ctrl.url}}" target="new">
                        <img ng-src="{{ctrl.imageurl}}">
                    </a>
                </div>`,
            this.bindings = {
                url: '<',
                imageurl: '<'
            }
        }
    }

    class FruitImageController {
        constructor() {}
    }

}