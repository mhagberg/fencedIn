

Meteor.startup(function() {

});


Meteor.methods({
  updateCheckIn: function (checkInId,foremanId,fencerId,loadTime,travelTime,notes,additionalMaterials
      ,contactCustomer,dailyPicture,toolsMaterials,checkInTime,checkInLocation
  ){
    JobCheckIns.update({_id : checkInId},
        {
          $set : {
            foreman_id : foremanId,
            fencer_id : fencerId,
            loadTime : loadTime,
            travelTime : travelTime,
            notes : notes,
            additionalMaterials : additionalMaterials,
            contactCustomer : contactCustomer,
            dailyPicture : dailyPicture,
            toolsMaterials : toolsMaterials,
            checkInTime : checkInTime,
            checkInLocation : checkInLocation
          }
        });
  }
});

