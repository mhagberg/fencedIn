//Meteor.methods({
//  jobFinished: function (){
//    //ProtinData.update({userId: this.userId}, { $inc: {total: amount}});
//    //History.insert({
//    //  value : amount,
//    //  date : new Date().toTimeString(),
//    //  userId : this.userId
//    //});
//    //save job set finshed date
//
//    Router.go('jobsMy');
//  }
//});
//
//Template.jobFinished.rendered = function(e) {
//  e.preventDefault();
//  Meteor.call('jobFinished', function(error) {
//    if (error)
//      return alert(error.reason);
//  });
//};