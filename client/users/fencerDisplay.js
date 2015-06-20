Template.fencerDisplay.helpers({
  fencer : function(fencerId) {
    var fenceGu = Fencer.findOne({_id: fencerId});
    return fenceGu.name;
  }
});