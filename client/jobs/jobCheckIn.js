Template.jobCheckIn.events({
  'click #checkIn' : function(e) {
    e.preventDefault();
    //we may want to move this to the server so we can gate changes
    var jobId = $('#job_id').val();
    console.debug('job_id: '+ jobId +
        ' foreman_id:' + $('#foremanSelector').val() +
        ' fencer_id:' + $('#fencerSelector').val() +
        ' contactCustomer: ' + $('#contactCustomer').is(":checked") +
        ' dailyPicture: ' +$('#dailyPicture').is(":checked") +
        ' toolsMaterials: '+ $('#toolsMaterials').is(":checked")+
        ' checkInTime: ' + new Date() +
        ' checkInLocation: 444444-0009-887');
    result = JobCheckIns.insert(
        {
          job_id: jobId,
          foreman_id: $('#foremanSelector').val(),
          fencer_id: $('#fencerSelector').val(),
          contactCustomer:$('#contactCustomer').is(":checked"),
          dailyPicture:$('#dailyPicture').is(":checked"),
          toolsMaterials:$('#toolsMaterials').is(":checked"),
          checkInTime: new Date(),
          checkInLocation: "444444-0009-887"
        });
    Jobs.update({_id: jobId}, {
      $set: {startDate: new Date()}
    });
    console.debug(result);
    Router.go('jobs');
  }
});
