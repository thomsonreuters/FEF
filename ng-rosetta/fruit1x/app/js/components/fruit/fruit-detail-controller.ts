// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="../../index.d.ts" />

module fruit1x {
    'use strict'

    export class FruitDetailController {
        private currentFruitItem: FruitItem;

        // The incoming parameter will be passed in via the Router.
        // The fruitItemParam name maps to the property on resolver of the detail state.
        // It is a function that ultimately returns an object of type FruitItem.
        constructor(private fruitItemParam: FruitItem) {
            this.currentFruitItem = fruitItemParam;
        }
    }
}
