Meteor.methods({
  checkIn: function (){
    //ProtinData.update({userId: this.userId}, { $inc: {total: amount}});
    //History.insert({
    //  value : amount,
    //  date : new Date().toTimeString(),
    //  userId : this.userId
    //});
    Router.go('jobsMy');
  }
});

Template.jobCheckIn.events({
  'click #checkIn' : function(e) {
    e.preventDefault();
    Meteor.call('checkIn', function(error){
      if (error)
        return alert(error.reason);
    });
  }
});