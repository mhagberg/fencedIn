Template.filterByForemanSelect.helpers({
  foreman : function() {
    return Foreman.find({disableDate : null});
  }
});