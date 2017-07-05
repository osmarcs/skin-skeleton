(function() {
  angular.module('myApp')
    .config(MyConfig);

  MyConfig.$inject = [
    'CONFIG',
    '$urlRouterProvider',
    '$stateProvider'
  ];

  function MyConfig(CONFIG, $urlRouterProvider, $stateProvider) {

    $stateProvider.state('site', {
        abstract: true,
        templateUrl: CONFIG.app + 'template/index.html',
        controller: 'TemplateController',
        controllerAs: 'vm',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([CONFIG.app + 'template/template.controller.js'])
          }]
        }
      })
      .state('site.home', {
        url: '/',
        templateUrl: CONFIG.app + 'home/index.html',
        controller: 'HomeController',
        controllerAs: 'vmHome',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([CONFIG.app + 'home/home.controller.js'])
          }]
        }
      })
      .state('site.products', {
        url: '/products',
        templateUrl: CONFIG.app + 'products/index.html',
        controller: 'ProductsController',
        controllerAs: 'vmHome',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([CONFIG.app + 'products/products.controller.js'])
          }]
        }
      });
    $urlRouterProvider.otherwise('/');
  }

})();
