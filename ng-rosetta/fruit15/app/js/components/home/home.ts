// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="../../index.d.ts" />

module fruit15.home {

    export class HomeComponent implements angular.IComponentOptions {
        public templateUrl: string;
        public controller: any;
        public controllerAs: string;        
        public bindings: any; // Note that we aren't binding to an external scope, so no bindings are necessary. Leaving this in place as reference.

        constructor() {
            this.templateUrl = 'js/components/home/home-view.html';
            // We need to reference the controller with no instance so that dependency injection can run.
            this.controller = HomeController;
            this.controllerAs = 'ctlr';
        }
    }

    class HomeController {
        private userName: string;
        private password: string;

        static $inject = ['$log', '$state'];
        constructor(private $log: angular.ILogService, private $state: angular.ui.IStateService) {
            this.$log.info('Home Controller Loaded.');
        }

        login(): void {
            // Normally, we'd pass the credentials to an authentication service before proceeding.
            // This could be done in the resolver of the next state, or as part of the login process here.
            this.$state.go('fruit-list');
        }
    }
}