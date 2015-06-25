Template.fencerDisplay.helpers({
  fencer : function(fencerId) {
    if (!fencerId) return "";
    var fenceGu = Fencer.findOne({_id: fencerId});
    return fenceGu.name;
  }
});