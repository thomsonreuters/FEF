/* jasmine specs for controllers go here */
describe('FEFDataGridModule controllers', function() {
    'use strict';

    var $httpBackend;

    beforeEach(module('FEFDataGridModule'));

    beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        // backend definition common for all tests
        $httpBackend.when('GET', 'data/deliverables.txt').respond(
            {"d": {
                "cols": [
                    {
                        "__type": "SigmaGridColumn:OST",
                        "header": "Entity Name",
                        "hidden": false,
                        "id": "Entity_space_Name",
                        "width": 270
                    }]
            }}
        );

    }));

    it('should create "DataGridController" controller', inject(function ($controller, $rootScope) {

        var ctrl = $controller('DataGridController', {$scope: $rootScope});

        expect($rootScope.name ).toBe('test');

    }));


});
