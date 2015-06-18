Template.jobCheckIn.events({
  'click #checkIn' : function(e) {
    e.preventDefault();
    //we may want to move this to the server so we can gate changes
    JobCheckIns.insert(
        {
          job_id: this.job_id,
          user_Id: this.user_id,
          contactCustomer:$('#contactCustomer').is(":checked"),
          dailyPicture:$('#dailyPicture').is(":checked"),
          toolsMaterials:$('#toolsMaterials').is(":checked"),
          checkInTime: new Date(),
          checkInLocation: "444444-0009-887"
        });
    Router.go('jobs');
  }
});

Template.jobCheckIn.render  = function() {
  console.log(this.data);
};
