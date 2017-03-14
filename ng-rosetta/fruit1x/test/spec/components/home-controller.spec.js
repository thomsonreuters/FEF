'use strict';

describe('homeController', function () {
    var scope, homeController;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('fruit1x'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        // create an empty scope.
        scope = $rootScope.$new();

        //declare the controller and inject our empty scope        
        homeController = $controller('homeController', {$scope: scope});        
    }));

    // Tests start here.
    it('should have a variable testableProperty = "Hello World!"', function () {
        expect(homeController.testableProperty).toBe('Hello World!');
    });
});