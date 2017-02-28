// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="index.d.ts" />

module fruit15 {
    'use strict'
    
    // Custom interface used to provide a typed property to retrieve state parameters.
    interface IFruitDetailRouteParams extends ng.ui.IStateParamsService {
        FruitItemID: string;
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
                    template: '<homecomponent></homecomponent>'
                })

                // Fruit List State
                .state('fruit-list', {
                    url: '/fruit-list',                    
                    template: '<fruitlistcomponent></fruitlistcomponent>'                   
                })

                // Fruit Detail State
                .state('fruit-detail', {
                    url: '/fruit-detail/{FruitItemID}',

                    // When using Components in Angular 1.5 as the recipient of a state with a resolve, we must map the $resolve.[property name] to a declared input parameter on the component.
                    // Note that the component must then declare this input via the bindings property on the component (e.g. bindings { currentfruititem: '<'}). The '<' indicates a one-way binding.
                    // Note too that the parameter name used with bindings must be lower case as the bindings matcher is case insensitve.                    
                    template: '<fruitdetailcomponent currentfruititem="$resolve.fruitItemParam"></fruitdetailcomponent>',
                    resolve: {                           
                        fruitItemParam: (
                            $stateParams: IFruitDetailRouteParams, 
                            fruitService: fruitList.FruitService, 
                            fruitUtils: fruit15.FruitUtils) => {
                            
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
                    }              
                });

            this.$translateProvider.useStaticFilesLoader({
                prefix: '/languages/',
                suffix: '.json'
            });
        }
    }
}
(() => {
    angular
        .module('fruitApp15',  [
        'ui.router',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'ui.grid',
        'ui.grid.selection'])
        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider',
            ($stateProvider, $urlRouterProvider, $translateProvider, $stateParams) => {
                return new fruit15.AppConfig($stateProvider, $urlRouterProvider, $translateProvider, $stateParams);
            }
        ])
        .service('fruitUtils', fruit15.FruitUtils)
        .service('fruitService', fruit15.fruitList.FruitService)
        .component('homecomponent', new fruit15.home.HomeComponent())
        .component('fruitlistcomponent', new fruit15.fruitList.FruitListComponent())
        .component('fruitdetailcomponent', new fruit15.fruitItemDetail.FruitItemDetailComponent())
        .component('fruitimagecomponent', new fruit15.fruitItemDetail.FruitImage());
    })();