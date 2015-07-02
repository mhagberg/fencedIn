
Template.jobHistory.events({
  'click #checkInBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobCheckIn/'+this._id);
  },
  'click #finishBtn' : function(e) {
    e.preventDefault();
    result = Jobs.update({_id: this._id}, {
      $set: {finishDate: new Date()}
    });
  },
  'click #editJobBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobEdit/'+this._id);
  },
  'click #editCheckIn' : function(e) {
    e.preventDefault();
    Router.go('/checkInEdit/'+this._id);
  }
});