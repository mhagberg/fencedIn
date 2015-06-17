
Template.jobsMy.events({
  'click #newJobBtn' : function(e) {
    e.preventDefault();
    Router.go('jobNew');
  }
});

user_id = 5;   //Mike Hagberg //temp until I figure out how to load data on page load


Template.jobsMy.helpers({
   job: function() {
     //return Jobs.find({user_id: user_id}, {sort: {createDate:-1}, limit:10});
     return Jobs.find({}, {sort: {createDate:-1}, limit:10});
   }
});