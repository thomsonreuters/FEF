// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

// Specify any other vendor components we will require.
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

// Specify which features of our application we will require.
import { FruitItem } from '../shared/fruit.model';

// Ensure that all providers are decorated with @Injectable, and registered in their parent ngModel's and any consuming component's providers collection.
@Injectable()
// This angular service serves as the application's primary data service. It exposes both list and detail get methods.
// The service accesses data via http using a standard url, but does not use a faux json data file, as per other versions of this reference application.
// Instead, this service accesses data stored in an in-memory database. See the ./data/in-memory-data.service.ts file for details.
export class FruitService {
    // fruitListUrl: string = 'app/fruit';
    private fruitListUrl: string = '/src/data/fruit-data.json';

    // Create an instance of the Http service.
    constructor(private http: Http) { }

    public getFruitItem(fruitItemID: Number): Promise<FruitItem> {

        return this.getFruitList_Promise().then(fruitItems => this.extractFruitItem(fruitItems, fruitItemID));
    }

    // The get list method returns a promise containing an array of all items in the collection.
    public getFruitList_Promise(): Promise<FruitItem[]> {

        // Execute a get all contents of the in-memory database by simply specifying the handle. No additional parameters result in the entire dataset being returned as an array.
        // In this example, the Observable is immediately cast to a Promise and the Http response is converted to an array of the expected type
        // via's it's .json() method in the promise's then method.
        // Any errors are passed to the service's internal handleError method.
        return this.http.get(this.fruitListUrl)
            .toPromise() // Convert the returned observable to a Promise.
            // .then(response => { return response.json().data as FruitItem[]; })
            .then(response => { return response.json() as FruitItem[]; })
            .catch(this.handleError);
    }

    // Observable version of the list method. *** This method is currently not used. ***
    private getFruitList_Observable(): Observable<FruitItem[]> {
        return this.http
            .get(this.fruitListUrl)
            .map((r: Response) => r.json().data as FruitItem[]);
    }

    private extractFruitItem(fruitItems: FruitItem[], fruitItemID: Number): FruitItem {
        let extractedFruitItem: FruitItem;

        fruitItems.forEach(item => {
            if (item.id && item.id === fruitItemID) {
                // When we find the correct item, cast it as the correct container type and return it. 
                extractedFruitItem = <FruitItem>item;
            }
        });

        return extractedFruitItem;
    }

    // Consume any errors produced by the Http.get call and output them to the log.
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}