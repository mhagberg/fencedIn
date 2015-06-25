Template.foremanSelect.helpers({
  foreman : function() {
    return Foreman.find();
  }
});

Template.foremanSelect.helpers({
  isSelected : function(foremanId) {
    if (Foreman.findOne({_id: foremanId}).length)
      return "selected";
    else return "";

  }
});