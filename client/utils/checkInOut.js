
UI.registerHelper("showCheckOutOnLastCheckIn", function() {
  var showCheckout =false;
  var checkIn = JobCheckIns.findOne({}, {sort:{checkOutTime: 1}},{limit: 1});
  if (checkIn.checkOutTime === null){
    showCheckout = true;
  }
  return showCheckout;
});