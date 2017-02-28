// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="../index.d.ts" />

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

export const HomeComponent = {
    templateUrl: './home-view.html', 
    controller: HomeController,
    controllerAs: 'ctlr'
    //bindings: {} // Note that we aren't binding to an external scope, so no bindings are necessary. Leaving this in place as reference.
}
