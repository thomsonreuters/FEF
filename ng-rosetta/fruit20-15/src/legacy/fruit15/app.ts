// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.
// See the project's LICENSE.MD for details. Copyright Thomson Reuters 2017. All rights reserved.

import * as angular from 'angular';
import { downgradeComponent } from '@angular/upgrade/static';

// Note that we are importing our application specific files instead of referencing them using /// reference as this is the preferred way to
// provide webpack with the appropriate file references.
// The vendor references represented in the type definition file above are implemented in the vendor.ts file in the root.
// The reference file remains here to provide intellisense.
import { HomeComponent } from './home/home';
import { FruitListComponent } from './fruit-list/fruit-list-component';
import { FruitService } from './fruit-list/fruit-service';
import { FruitItemDetailComponent } from './fruit-detail/fruit-detail-component';
import { FruitUtils } from './services/fruit-utils';
import { FruitImage } from './fruit-detail/fruitimage-directive';

import { SampleComponent } from '../../app/sample-component';

// Custom interface used to provide a typed property to retrieve state parameters.
interface IFruitDetailRouteParams extends ng.ui.IStateParamsService {
    FruitItemID: string;
}

// Define a configuration object, to be passed into angular's module.config method during startup.
export class AppConfig {

    protected static $inject = ['$stateProvider', '$urlRouterProvider'];

    constructor(
        private $stateProvider: angular.ui.IStateProvider,
        private $urlRouterProvider: angular.ui.IUrlRouterProvider) {
        this.initializeStates();
    }

    private initializeStates(): void {

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
                // template: '<fruitlistcomponent></fruitlistcomponent>'
            })

            // Fruit Detail State
            .state('fruit-detail', {
                url: '/fruit-detail/{FruitItemID}',

                // When using Components in Angular 1.5 as the recipient of a state with a resolve, we must map the
                // $resolve.[property name] to a declared input parameter on the component.
                // Note that the component must then declare this input via the bindings property on the component
                // (e.g. bindings { currentfruititem: '<'}). The '<' indicates a one-way binding.
                // Note too that the parameter name used with bindings must be lower case as the bindings matcher is case insensitve.
                template: '<fruitdetailcomponent currentfruititem="$resolve.fruitParam"></fruitdetailcomponent>',
                resolve: {

                    fruitParam: [
                        '$stateParams', 'fruitService', 'fruitUtils', (
                            $stateParams: IFruitDetailRouteParams,
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
                        }
                    ]
                }
            });
    }
}

export const NG1Module = angular
    .module('fruit15', [
        'ui.router',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'ui.grid',
        'ui.grid.selection'])
    .config(['$stateProvider', '$urlRouterProvider', (
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
        return new AppConfig($stateProvider, $urlRouterProvider);
    }
    ])
    .service('fruitUtils', FruitUtils)
    .service('fruitService', FruitService)
    .component('homecomponent', new HomeComponent())
    .component('fruitlistcomponent',  new FruitListComponent())
    .component('fruitdetailcomponent', new FruitItemDetailComponent())
    .component('fruitimagecomponent', new FruitImage())
    // Downgrade NG2 Component and register it as a Directive.
    .directive(
        'samplecomponent',
        downgradeComponent({ component: SampleComponent }) as angular.IDirectiveFactory);
