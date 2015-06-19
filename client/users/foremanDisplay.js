Template.foremanDisplay.helpers({
  foreman : function(foremanId) {
    console.debug('foremanDisplay.foremanId: '+ foremanId);
    result = Foreman.find({_id: foremanId});
    console.debug(result);
    return Foreman.find({_id: foremanId});
  }
});