// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Specify which features of our application we will require.
import { FruitItem } from '../shared/fruit.model';
import { FruitService } from '../shared/fruit.service';

// The list component retrieves it's data via a custom service call made during initialization.
// The table's row selection changed event is bound to the loadDetail event handler, which
// navigates the user to the detail route, passing the id of the selected row as a route parameter.

@Component({
    selector: 'fruit-list',
    templateUrl: './fruit-list.component.html',
    providers: [FruitService]
})
// Implementing the OnInit interface allows the class to publish the ngOnInit function, which is executed during component initialization.
export class FruitListComponent implements OnInit {
    // Declare the variables used by the binding engine.
    public loading: boolean;
    private rowData: any[];
    private columnDefs: any[];

    // Create instances off the data service and router service.
    constructor(private fruitService: FruitService, private router: Router) { }

    // During component initialization, execute the data service call to retrieve the grid data.
    public ngOnInit(): void {
        this.getFruitList();
    }

    // Execute a data service call. Persist the resulting data in class level variable to allow the binding engine to access it.
    public getFruitList(): void {
        // Enable the loading flag.
        this.loading = true;

        // Execute the get list call on the data service.
        this.fruitService.getFruitList_Promise().then((fruitItems) => {

            this.rowData = fruitItems;

            // Disable the loading flag.
            this.loading = false;
        });
    }

    // Consume the grid's row selection event arguments and navigate to the detail route.
    public loadDetail(fruitItem: FruitItem): void {

        // Navigate to the detail route, passing the data item ID as a route parameter via the syntax: ['route name', 'parameter1 value'].
        // Note that the detail route declaration maps the incoming value via the "fruit-detail/:id" route definition.
        // This will result in any value being passed into the parameter1 value will be accessable in the recieving 
        // Component or Route Resolver via ActivatedRoute.params['id'].
        this.router.navigate(['fruit-detail', fruitItem.id]);
    }

    // Navigate to the fruit-vendor route.
    public loadVendor(): void {
        // Note that this route is lazy loaded via the angular-router.
        this.router.navigate(['fruit-vendor']);
    }
}
