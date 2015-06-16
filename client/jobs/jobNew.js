Meteor.methods({
  createJob: function (){
    //ProtinData.update({userId: this.userId}, { $inc: {total: amount}});
    //History.insert({
    //  value : amount,
    //  date : new Date().toTimeString(),
    //  userId : this.userId
    //});
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