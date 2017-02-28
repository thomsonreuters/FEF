// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="../../index.d.ts" />

module fruit1x {
    'use strict'

    export class FruitFactory  {

        constructor( private $http: ng.IHttpService )
        {
            
        }

        // Execute an http get to retrieve the static data file.
        // Return the promise so that the consumer can work with the raw data completion of the async get operation.
        getFruitList(): ng.IPromise<any> {
            var url: string = 'data/fruit-data.json';
            var result: ng.IPromise< any > = this.$http.get( url );

            return result;
        }
    }
}