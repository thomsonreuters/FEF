// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { Component, OnInit }    from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { ActivatedRoute }       from '@angular/router';

// Specify which features of our application we will require.
import { FruitItem }        from '../shared/fruit.model';
import { FruitService }     from '../shared/fruit.service';

// The detail component recieves it's data from the detail route resolver.
// The data item will be passed in as part of the active route. 
@Component({
  selector: 'fruit-detail',
  templateUrl: './fruit-detail.component.html',
  providers: [FruitService]
})
// Implementing the OnInit interface allows the class to publish the ngOnInit function, which is executed during component initialization.
export class FruitDetailComponent implements OnInit {
   // Declare the variables used by the binding engine.
    currentFruitItem: FruitItem;

    // Declare a refernce to the activated route in order to extract the data from it's parameter collection.
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        // Extract the data item from the route, cast it to the expected type to ensure we got what we expected.
        // Note that the propertyName specified in data['propertyName'] was specified on the route's resolver configuration.
        this.currentFruitItem = <FruitItem>this.route.snapshot.data['fruitItem'];
    }
}
