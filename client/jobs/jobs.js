
Template.jobs.events({
  'click #newJobBtn' : function(e) {
    e.preventDefault();
    Router.go('jobNew');
  },
  'click #checkInBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobCheckIn/'+this._id);
  },
  'click #historyBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobHistory/'+this._id);
  },
  'click #finishBtn' : function(e) {
    e.preventDefault();
    result = Jobs.update({_id: this._id}, {
      $set: {finishDate: new Date()}
    });
    console.debug(result);
  }
});

Template.jobs.helpers({
  job: function(){
    return Jobs.find({}, {sort: {createDate:-1}});
  }
});