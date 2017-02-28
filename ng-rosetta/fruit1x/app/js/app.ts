// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/// <reference path="index.d.ts" />

module fruit1x {
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
                    templateUrl: 'js/components/home/home-view.html',
                    controller: HomeController,
                    controllerAs: 'vm'
                })

                // Fruit List State
                .state('fruit-list', {
                    url: '/fruit-list',
                    templateUrl: 'js/components/fruit/fruit-list-view.html',                  
                    controller: FruitController,
                    controllerAs: 'vm'
                })

                // Fruit Detail State
                .state('fruit-detail', {
                    url: '/fruit-detail/{FruitItemID}',
                    templateUrl: 'js/components/fruit/fruit-detail-view.html',
                    controller: FruitDetailController,
                    controllerAs: 'vm',
                    // We're going to use ui-router's Resolve feature to invoke our data service *before* we instantiate the route's controller. 
                    // This way, we retrieve the data and transform it into the approprate container (a FruitItem object) before passing it 
                    // into the controller's constructor.
                    resolve: {   
                        // First, declare the Angular name of the injected service as a resolve reference.
                        fruitFactory: 'fruitFactory',                 
                        
                        // Then consume it as an input parameter of the function to be resolved.
                        fruitItemParam: function($stateParams: IFruitDetailRouteParams, fruitFactory: FruitFactory, fruitUtils: FruitUtils) {
                            
                            // Execute the factory method and cast the result of the async operation to the desired container and return it.
                            return fruitFactory.getFruitList().then(
                                (data) => {
                                    // Pass the returned array into the service.method along with the desired ID to filter out the desired item.
                                    // Note that we case the $stateParams dependency to a custom interface to limit the available parameters, 
                                    // as opposed to $stateParams['paramName'], which works but is not typed.
                                    return fruitUtils.extractFruit(data.data, Number($stateParams.FruitItemID));
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
        .module('fruit1x',  [
        'ui.router',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'ui.grid',
        'ui.grid.selection'])
        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider',
            ($stateProvider, $urlRouterProvider, $translateProvider, $stateParams) => {
                return new fruit1x.AppConfig($stateProvider, $urlRouterProvider, $translateProvider, $stateParams);
            }                        
        ])
        .factory('fruitFactory', ($http: ng.IHttpService) => new fruit1x.FruitFactory($http))        
        .service('fruitUtils', fruit1x.FruitUtils)
        .controller('homeController', fruit1x.HomeController)
        .controller('fruitController', fruit1x.FruitImageDirective)    
        .controller('fruitDetailController', fruit1x.FruitDetailController)
        .directive('fruitImage', fruit1x.FruitImageDirective);
    })();