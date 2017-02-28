// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

// Specify which features of our application we will require.
import { FruitItem } from './shared/fruit.model';
import { FruitService } from './shared/fruit.service';

// Ensure that all providers are decorated with @Injectable, and registered in their parent ngModel's and any consuming component's providers collection.
@Injectable()
// Implementing the Resolve<type> allows the class to publish the resolve method,
// which is consumed by the routing engine. 
export class FruitDetailResolver implements Resolve<FruitItem> {
    // Instantiate our data service to allow the resolver to request the item
    // specified on the route parameters.
    constructor(private fruitService: FruitService) { }

    // Pass the activateed route and state into the resolve method and specify the type of object to be returned.
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FruitItem> {

        // Extract the specified id from the activated route parameters, and pass it into the service call.
        return this.fruitService.getFruitItem(Number(route.params['id']));
    }
}