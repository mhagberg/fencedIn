Template.fencerDisplay.helpers({
  fencer : function(fencerId) {
    console.debug('fencerDisplay.fencerId: '+ fencerId);
    return Fencer.find({_id: fencerId});
  }
});