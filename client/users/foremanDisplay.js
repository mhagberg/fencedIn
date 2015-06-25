Template.foremanDisplay.helpers({
  foreman : function(foremanId) {
    if (!foremanId) return "";
    var foreGuy = Foreman.findOne({_id: foremanId});
    return foreGuy.name;
  }
});