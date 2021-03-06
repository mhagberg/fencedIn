
UI.registerHelper("showCheckOutOnLastCheckIn", function(jobId) {
  var showCheckout =false;
  var checkIn = JobCheckIns.findOne({job_id: jobId}, {sort:{checkOutTime: 1}},{limit: 1});
  if (checkIn && checkIn.checkOutTime === null){
    showCheckout = true;
  }
  return showCheckout
});

UI.registerHelper("hasImage", function(image) {
  var result = false;
  if (image){
    result = true;
  }
  return result;
});
