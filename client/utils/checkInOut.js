
UI.registerHelper("showCheckOutOnLastCheckIn", function(jobId) {
  var showCheckout =false;
  console.debug("jobId: " + jobId);
  var checkIn = JobCheckIns.findOne({job_id: jobId}, {sort:{checkOutTime: 1}},{limit: 1});
  if (checkIn.checkOutTime === null){
    showCheckout = true;
  }
  return showCheckout;
});