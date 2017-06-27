// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

import * as angular from 'angular';

import { HomeComponent } from './components/home/home-component';
import { FruitUtils } from './components/services/fruit-utils';
import { FruitItemDetailComponent } from './components/fruit-detail/fruit-detail-component';
import { FruitImage } from './components/fruit-detail/fruitImage-directive';
import { FruitListComponent } from './components/fruit-list/fruit-list-component';
import { FruitService } from './components/fruit-list/fruit-service';

// All Html templates must be imported in order to be properly parsed by WebPack.
import './components/home/home-view.html';
import './components/fruit-detail/fruit-detail-view.html';
import './components/fruit-list/fruit-list-view.html';

// Custom interface used to provide a typed property to retrieve state parameters.
interface IFruitDetailRouteParams extends ng.ui.IStateParamsService {
    FruitItemID: string;
}

// The @types/angular-ui-router type definition does not match the actual @uirouter/angularjs library as documented here:
// https://ui-router.github.io/guide/ng1/route-to-component#resolve-bindings. To avoid a compile-time type error, we extend
// the IState interface here and add the missing bindings property to the interface. This will be removed when the type
// definition is updated to match.
interface IStateResolverShim  extends angular.ui.IState {
    bindings?: any;
}

export class AppConfig {

    static $inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider', '$stateParams'];

    constructor(
        private $stateProvider: angular.ui.IStateProvider,
        private $urlRouterProvider: angular.ui.IUrlRouterProvider,
        private $translateProvider: angular.translate.ITranslateProvider,
        private $stateParams: angular.ui.IStateParamsService) {
        this.init();
    }

    private init(): void {

        this.$urlRouterProvider.otherwise('/home');

        this.$stateProvider
            // Home State
            .state('home', {
                url: '/home',
                component: 'homecomponent'
            })

            // Fruit List State
            .state('fruit-list', {
                url: '/fruit-list',
                component: 'fruitlistcomponent'
            })

            // Fruit Detail State
            .state('fruit-detail', {
                url: '/fruit-detail/{FruitItemID}',
                component: 'fruitdetailcomponent',

                // When using Components in Angular 1.6 as the recipient of a state with a resolve, we must map the bindings: {[property name]: 'value} to the bindings property on the component.
                // Note that the component must then declare this input via the bindings property (e.g. bindings { currentfruititem: '<'}). The '<' indicates a one-way binding.
                // Note too that the parameter name used with bindings must be lower case as the bindings matcher is case insensitve.
                bindings: { currentfruititem: 'fruitItemParam' },
                resolve: {
                    fruitItemParam: [
                        '$stateParams', 'fruitService', 'fruitUtils',
                        ($stateParams: IFruitDetailRouteParams,
                        fruitService: FruitService,
                        fruitUtils: FruitUtils) => {

                        // Execute the factory method and cast the result of the async operation to the desired container and return it.
                        return fruitService.GetFruitList().then(
                            (data) => {
                                // Pass the returned array into the service.method along with the desired ID to filter out the desired item.
                                // Note that we case the $stateParams dependency to a custom interface to limit the available parameters,
                                // as opposed to $stateParams['paramName'], which works but is not typed.
                                return fruitUtils.ExtractFruitItem(data.data, Number($stateParams.FruitItemID));
                            }
                        );
                    }]
                }
            } as IStateResolverShim); // See the above description of this interface. It is necessary to support the bindings property.

        this.$translateProvider.useStaticFilesLoader({
            prefix: '/languages/',
            suffix: '.json'
        });
    }
}
(() => {
    angular
        .module('fruitApp15', [
            'ui.router',
            'pascalprecht.translate',
            'tmh.dynamicLocale',
            'ui.grid',
            'ui.grid.selection'])

        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', (
            $stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider,
            $translateProvider: angular.translate.ITranslateProvider,
            $stateParams: angular.ui.IStateParamsService) => {
            return new AppConfig($stateProvider, $urlRouterProvider, $translateProvider, $stateParams);
        }
        ])
        .service('fruitUtils', FruitUtils)
        .service('fruitService', FruitService)
        .component('homecomponent', new HomeComponent())
        .component('fruitlistcomponent', new FruitListComponent())
        .component('fruitdetailcomponent', new FruitItemDetailComponent())
        .component('fruitimagecomponent', new FruitImage());
})();
