//UI.registerHelper("foremenFilterParam", function() {
//  var current = Router.current();
//  return current.params.foremenId;
//});

foremenFilterParam = function() {
  return Router.current().params.foremenId ? Router.current().params.foremenId : "";
};