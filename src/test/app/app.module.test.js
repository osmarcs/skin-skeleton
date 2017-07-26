describe("App Module:", function() {

  var module1;
  before(function() {
    module1 = angular.module("myApp");
  });

  it("should be registered", function() {
    expect(module1).not.to.equal(null);
  });
});
