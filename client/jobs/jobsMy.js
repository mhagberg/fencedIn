Meteor.methods({
  jobNew: function (){
    //ProtinData.update({userId: this.userId}, { $inc: {total: amount}});
    //History.insert({
    //  value : amount,
    //  date : new Date().toTimeString(),
    //  userId : this.userId
    //});
    Router.go('jobNew');
  }
});

Template.jobsMy.events({
  'click #newJobBtn' : function(e) {
    e.preventDefault();
    Meteor.call('jobNew', function(error){
      if (error)
        return alert(error.reason);
    });
  }
});