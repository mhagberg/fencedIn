Template.jobCheckIn.events({
  'click #checkIn' : function(e) {
    e.preventDefault();
    //we may want to move this to the server so we can gate changes
    var jobId = $('#job_id').val();
    JobCheckIns.insert(
        {
          job_id : jobId,
          foreman_id : $('#foremanSelector').val(),
          fencer_id : $('#fencerSelector').val(),
          loadTime : $('#loadTime').val(),
          travelTime : $('#travelTime').val(),
          notes : $('#notes').val(),
          additionalMaterials : $('#additionalMaterials').val(""),
          contactCustomer : $('#contactCustomer').is(":checked"),
          dailyPicture : $('#dailyPicture').is(":checked"),
          toolsMaterials : $('#toolsMaterials').is(":checked"),
          checkInTime : new Date(),
          checkInLocation : "444444-0009-887"
        });
    if (!Jobs.findOne({_id : jobId}).startDate) {
        Jobs.update({_id : jobId}, {
          $set : {startDate : new Date()}
        });
    }
    Router.go('jobs');
  }
});
