// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

'use strict';

describe('Fruit Detail Controller', function () {
    var fruitDetailController;

    // Create an instance of the application module.
    beforeEach(module('fruitApp15'));
    
    // Create an instance of the target component and extract it's controller.
    beforeEach(inject(function ($componentController) {
        
        // Extract an instance of the component's controller class.
        fruitDetailController = $componentController('fruitdetailcomponent');
        
    }));

    // Tests start here.
    it('should contain a testableProperty equal to "Test property"', function () {
        expect(fruitDetailController.testableProperty).toBe('Test property');
    });

});