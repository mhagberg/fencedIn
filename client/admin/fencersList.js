Template.fencersList.events({
  'click #newFencer' : function(e) {
    e.preventDefault();
    Router.go('/fencerForm');
  },
  'click .fencer-delete' : function(e) {
    e.preventDefault();
    Fencer.update({_id : this._id},
        {
          $set : {
            disableDate : new Date().getTime()
          }
        });
    Router.go('/fencersList');
  },
  'click .editLink' : function(e) {
    e.preventDefault();
    Router.go('/fencerForm/'+this._id);
  }

});