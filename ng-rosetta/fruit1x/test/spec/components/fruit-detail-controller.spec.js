// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

'use strict';

describe('fruitDetailController', function () {
    var scope, fruitDetailController;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('fruit1x'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        // create an empty scope.
        scope = $rootScope.$new();

        //declare the controller and inject our empty scope        
        fruitDetailController = $controller('fruitDetailController', {$scope: scope, fruitItemParam: null});        
    }));

    // Tests start here.
    it('should have a variable testableProperty = "Hello World!"', function () {
        expect(fruitDetailController.testableProperty).toBe('Hello World!');
    });
});