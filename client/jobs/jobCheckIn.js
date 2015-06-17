Meteor.methods({
  checkIn: function (){
    JobCheckIns.insert(
        {
          job_id: $('#job_id').val(),
          user_Id: $('#user_Id').val(),
          contactCustomer:$('#contactCustomer').is(":checked"),
          dailyPicture:$('#dailyPicture').is(":checked"),
          toolMaterials:$('#toolMaterials').is(":checked"),
          checkInTime: new Date(),
          checkInLocation: "444444-0009-887"
        });
  }
});

Template.jobCheckIn.events({
  'click #checkIn' : function(e) {
    e.preventDefault();
    Meteor.call('checkIn', function(error){
      if (error)
        return console.error(error.reason);
    });
    Router.go('jobsMy');
  }
});

Template.jobCheckIn.helpers({
  job: function(jobId){
    return Jobs.findOne();
  },
  user: function(userId){
    return Users.findOne();
  }
});