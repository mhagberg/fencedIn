var onSuccess = function (imageData, jobId, checkin_id) {
  var pictureId = Pictures.insert({
    image: imageData,
    job_id: jobId,
    checkin_id: checkin_id,
    createDate: new Date().getTime()
  });
  Session.set('pictureId', pictureId);
  Session.set('previewImage', imageData);
};

Template.checkInForm.events({
  "click #takePicture": function () {
    MeteorCamera.getPicture(function (error, data) {
      // we have a picture
      if (! error) {
        onSuccess(data, this.job_id.value, this.checkIn_id.value);
      }
    });
  }
});


Template.checkInForm.onRendered(function() {
  $('#checkInTime').datetimepicker();
  $('#checkOutTime').datetimepicker();
});