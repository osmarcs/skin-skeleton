(function() {
  angular.module('myApp', [
      'ui.router',
      'oc.lazyLoad'
    ])
    .constant('CONFIG', {
      'app': './app/',
      'api': 'api/'
    })
    .run(runApp);

  runApp.$inject = [
    '$rootScope',
    '$state'
  ];

  function runApp($rootScope, $state) {
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParam) {});

    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParam) {});

    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParam) {});
  }


})();
