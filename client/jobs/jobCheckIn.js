Template.jobCheckIn.events({
  'click #checkIn' : function(e) {
    e.preventDefault();
    //we may want to move this to the server so we can gate changes
    var foremen = [];
    $('#foremanSelector').find(':selected').each(function(i, selected){
      foremen[i] = $(selected).data().value;
    });
    var fencers = [];
    $('#fencerSelector').find(':selected').each(function(i, selected){
      fencers[i] = $(selected).data().value;
    });
    var jobId = $('#job_id').val();
   var checkin_id = JobCheckIns.insert(
        {
          job_id : jobId,
          foremen : foremen,
          fencers : fencers,
          loadTime : $('#loadTime').val(),
          travelTime : $('#travelTime').val(),
          notes : $('#notes').val(),
          additionalMaterials : $('#additionalMaterials').val(),
          contactCustomer : $('#contactCustomer').is(":checked"),
          dailyPicture : $('#dailyPicture').is(":checked"),
          toolsMaterials : $('#toolsMaterials').is(":checked"),
          checkInTime : new Date().getTime(),
          checkOutTime : null,
          systemCheckInTime: new Date().getTime(),
          systemCheckOutTime: null,
          checkInLocation : Geolocation.currentLocation()
        });
    if (!Jobs.findOne({_id : jobId}).startDate) {
        Jobs.update({_id : jobId}, {
          $set : {startDate : new Date().getTime()}
        });
    }
    var pictureId = Session.get('pictureId');
    Pictures.update({_id: pictureId},
        {
        $set: {
          checkin_id : checkin_id
        }
    });
    Router.go('/jobHistory/'+jobId + '/' + foremenFilterParam());
  }
});




