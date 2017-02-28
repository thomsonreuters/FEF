// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="../../index.d.ts" />

module fruit1x {
    'use strict'

    export class FruitUtils {
        public extractFruit(fruitList: Array<any>, fruitItemID: Number): FruitItem {
            var fruitItem: FruitItem;

            // Then, iterate through each item, looking for the specified ID.
            fruitList.forEach(element => {
                if (element.id && element.id === fruitItemID) {
                    // When we find the correct item, cast it as the correct container type and return it. 
                    fruitItem = new FruitItem(element);
                }
            });

            return fruitItem;
        }
    }
}