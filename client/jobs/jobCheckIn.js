Template.jobCheckIn.events({
  'click #checkIn' : function(e) {
    e.preventDefault();
    //we may want to move this to the server so we can gate changes
    var jobId = $('#job_id').val();
    console.debug("geoLocation: " + Geolocation.currentLocation());
    JobCheckIns.insert(
        {
          job_id : jobId,
          foreman_id : $('#foremanSelector').val(),
          fencer_id : $('#fencerSelector').val(),
          loadTime : $('#loadTime').val(),
          travelTime : $('#travelTime').val(),
          notes : $('#notes').val(),
          additionalMaterials : $('#additionalMaterials').val(),
          contactCustomer : $('#contactCustomer').is(":checked"),
          dailyPicture : $('#dailyPicture').is(":checked"),
          toolsMaterials : $('#toolsMaterials').is(":checked"),
          checkInTime : new Date(),
          checkOutTime : null,
          systemCheckInTime: new Date(),
          systemCheckOutTime: null,
          checkInLocation : Geolocation.currentLocation()
        });
    if (!Jobs.findOne({_id : jobId}).startDate) {
        Jobs.update({_id : jobId}, {
          $set : {startDate : new Date()}
        });
    }
    Router.go('/jobHistory/'+jobId);
  }
});


var onSuccess = function (imageData, jobId, checkInId) {
  Photos.insert({
    image: imageData,
    job_id: jobId,
    checkIn_id: checkInId,
    createDate: new Date()
  });
};

Template.jobCheckIn.events({
  "click #takePicture": function () {
    MeteorCamera.getPicture(function (error, data) {
      // we have a picture
      if (! error) {
        onSuccess(data, this.job_id, this._id);
      }
    });
  }
});




