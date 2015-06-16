
Template.jobsNew.events({
  'click #newJobBtn' : function(e) {
    e.preventDefault();
    Meteor.call('jobNew', function(error){
      if (error)
        return alert(error.reason);
    });
  }
});