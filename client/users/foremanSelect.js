Template.foremanSelect.helpers({
  foreman : function() {
    return Foreman.find({disableDate : null});
  }
});