(function () {

  angular.module('myApp')
    .controller('TemplateController', TemplateController);

  TemplateController.$inject = [];

  function TemplateController() {
    console.log('TemplateController');
  }

})();
