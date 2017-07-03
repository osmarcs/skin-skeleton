(function () {

  angular.module('myApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = [];

  function HomeController() {
    console.log('HomeController');
  }

})();
