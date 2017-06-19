// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.
// See the project's LICENSE.MD for details. Copyright Thomson Reuters 2017. All rights reserved.

class HomeController {
    private userName: string = 'John';
    private password: string = 'Smith';

    private static $inject = ['$log', '$state'];
    constructor(private $log: angular.ILogService, private $state: angular.ui.IStateService) {
        this.$log.info('Home Controller Loaded.');
    }

    public login(): void {
        // Normally, we'd pass the credentials to an authentication service before proceeding.
        // This could be done in the resolver of the next state, or as part of the login process here.
        this.$state.go('fruit-list');
    }
}

export class HomeComponent implements angular.IComponentOptions {
    public template: string = require('./home-view.html') as string;
    public controller: any = HomeController;
    public controllerAs: string = 'ctlr';
}
