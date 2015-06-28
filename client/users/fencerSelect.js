Template.fencerSelect.helpers({
  fencer : function() {
    return Fencer.find();
  }
});

Template.fencerSelect.helpers({
  isSelected : function(fencerId) {
    if (Fencer.findOne({_id: fencerId}).length)
      return "selected";
    else return "";

  }
});