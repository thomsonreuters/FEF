// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

import {} from 'jasmine';
import * as angular from 'angular';
import 'angular-mocks';

import '../../app';
import { FruitListComponent } from './fruit-list-component';

let testComponent: FruitListComponent;

describe('Component FruitListComponent', () => {
    let $componentController: any;
    let ctlr: angular.IControllerProvider;

    beforeEach(angular.mock.module('fruitApp15'));

    beforeEach(inject(function (_$componentController_: any) {
        $componentController = _$componentController_;
    }));

    it('should be defined', () => {
        this.ctrl = $componentController('fruitlistcomponent');

        expect(this.ctrl).toBeDefined();
    });

    it('should have a testableProperty = ', () => {
        this.ctrl = $componentController('fruitlistcomponent');

        expect(this.ctrl.testableProperty).toBe('Test property');
    });
});
