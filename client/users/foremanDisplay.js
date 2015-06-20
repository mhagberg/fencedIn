Template.foremanDisplay.helpers({
  foreman : function(foremanId) {
    var foreGuy = Foreman.findOne({_id: foremanId});
    return foreGuy.name;
  }
});