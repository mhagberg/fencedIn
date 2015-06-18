
Template.jobs.events({
  'click #newJobBtn' : function(e) {
    e.preventDefault();
    Router.go('jobNew');
  },
  'click #checkInBtn' : function(e) {
    e.preventDefault();
    console.debug(this);
    Router.go('/jobCheckIn/'+this._id);
  },
  'click #historyBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobHistory/'+this._id);
  }
});

Template.jobs.helpers({
  job: function(jobId){
    return Jobs.find({}, {sort: {createDate:-1}});
  }
});