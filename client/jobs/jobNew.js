Meteor.methods({
  createJob: function (){
    Jobs.insert({name: $('#name').val(),
    estStartDate: $('#estStartDate').val(),
    estFinishDate: $('#estFinishDate').val(),
    startDate: $('#startDate').val(),
    finishDate: $('#finishDate').val(),
    notes: this.notes,
    type: this.type,
    user_id: $('#foremanSelect').val(),
    });
    Router.go('jobsMy');
  }
});

Template.jobNew.events({
  'click #createJob' : function(e) {
    e.preventDefault();
    Meteor.call('createJob', function(error){
      if (error)
        return alert(error.reason);
    });
  }
});