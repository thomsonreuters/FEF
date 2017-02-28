// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="../../index.d.ts" />

module fruit1x {
    'use strict'

    // Creating a typed version of scope to allow typed interaction with the necessary properties.
    export interface IFruitImageScope extends angular.IScope {        
        url: String;
        imageURL: String;
    }

    export function FruitImageDirective(): angular.IDirective {
        return {
            // Render the template using parameters mapped from the parent scope.
            template: `
                <div>
                    <a ng-href="{{url}}" target="new">
                        <img ng-src="{{imageurl}}">
                    </a>
                </div>`,
            // Ensure the appropriate properties are mapped from the parent scope so that they can be consumed by the template.
            scope: {
                'url': '=',
                'imageurl': '='
            },
            // Because we are simply consuming raw properties in scope and binding to them, we don't need to perform any functions here.
            // Leaving the signature in place for reference. 
            link: (scope: IFruitImageScope, element: any, attrs: any) => {                
            }
        }
    }
}