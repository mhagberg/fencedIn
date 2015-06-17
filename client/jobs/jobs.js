
Template.jobs.events({
  'click #newJobBtn' : function(e) {
    e.preventDefault();
    Router.go('jobNew');
  }
});


Template.jobs.helpers({
  job: function(jobId){
    return Jobs.find({}, {sort: {createDate:-1}});
  }
});