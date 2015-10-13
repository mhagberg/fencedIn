var onSuccess = function (imageData, jobId, checkin_id) {
  Pictures.insert({
    image: imageData,
    job_id: jobId,
    checkin_id: checkin_id,
    createDate: new Date().getTime()
  });
};

Template.checkInForm.events({
  "click #takePicture": function () {
    MeteorCamera.getPicture(function (error, data) {
      // we have a picture
      if (! error) {
        console.debug("jobId: " + this.job_id.value);
        onSuccess(data, this.job_id.value, this.checkIn_id.value);
      }
    });
  }
});
