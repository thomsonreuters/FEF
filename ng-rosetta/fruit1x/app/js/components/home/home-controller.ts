// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="../../index.d.ts" />

module fruit1x {
    'use strict'


    export class HomeController {
        public testableProperty:string = 'Hello World!';
        
        constructor(private $log: ng.ILogService,  private $state: angular.ui.IStateService) {
            $log.info('Home Controller Loaded.');
        }

        // Transition to the Fruit List state.
        login() {
            this.$state.go('fruit-list');                
        }
    }
}