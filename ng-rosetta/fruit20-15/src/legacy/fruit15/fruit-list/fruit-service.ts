// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.
// See the project's LICENSE.MD for details. Copyright Thomson Reuters 2017. All rights reserved.

export class FruitService {

    public static $inject = ['$http'];
    constructor(private $http: angular.IHttpService) {

    }

    // Execute an http get to retrieve the static data file.
    // Return the promise so that the consumer can work with the raw data completion of the async get operation.
    public GetFruitList(): ng.IPromise<any> {
        const url: string = 'data/fruit-data.json';
        const result: ng.IPromise<any> = this.$http.get(url);

        return result;
    }
}
