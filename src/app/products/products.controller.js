(function () {

  angular.module('myApp')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = [];

  function ProductsController() {
    console.log('ProductsController');
  }

})();
