Template.checkInEdit.events({
  'click #checkInUpdate' : function(e) {
    e.preventDefault();
    //form.serilize
    var jobId = $('#job_id').val();
    var checkInId = $('#checkIn_id').val();
    var foremen = [];
    $('#foremanSelector').find(':selected').each(function(i, selected){
      foremen[i] = $(selected).data().value;
    });
    var fencers = [];
    $('#fencerSelector').find(':selected').each(function(i, selected){
      fencers[i] = $(selected).data().value;
    });
    var loadTime = $('#loadTime').val();
    var travelTime = $('#travelTime').val();
    var notes = $('#notes').val();
    var additionalMaterials = $('#additionalMaterials').val();
    var contactCustomer = $('#contactCustomer').is(":checked");
    var dailyPicture = $('#dailyPicture').is(":checked");
    var toolsMaterials = $('#toolsMaterials').is(":checked");
    var checkInTime = convertToUnix($('#checkInTime').data("DateTimePicker").date());
    var checkOutTime = null;
    if ($('#checkOutTime').data("DateTimePicker")){
      checkOutTime = convertToUnix($('#checkOutTime').data("DateTimePicker").date());
    }
    function convertToUnix(adate){
      if (adate)
      {
        return adate.valueOf();
      }
    };

    Meteor.call('updateCheckIn', checkInId,foremen,fencers,loadTime,travelTime,
        notes,additionalMaterials,contactCustomer,dailyPicture,toolsMaterials,checkInTime,checkOutTime,"location", function(error, id){
      if (error) {
        return alert(error.reason);
      }
          Router.go('/jobHistory/'+jobId);
    });
  }
});