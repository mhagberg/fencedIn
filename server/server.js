

Meteor.startup(function() {

});


Meteor.methods({
  updateCheckIn: function (checkInId,foremen,fencers,loadTime,travelTime,notes,additionalMaterials
      ,contactCustomer,dailyPicture,toolsMaterials,checkInTime, checkOutTime,checkInLocation
  ){
    JobCheckIns.update({_id : checkInId},
        {
          $set : {
            foremen : foremen,
            fencers : fencers,
            loadTime : loadTime,
            travelTime : travelTime,
            notes : notes,
            additionalMaterials : additionalMaterials,
            contactCustomer : contactCustomer,
            dailyPicture : dailyPicture,
            toolsMaterials : toolsMaterials,
            checkInTime : checkInTime,
            checkOutTime : checkOutTime,
            systemCheckInTime : new Date(),
            systemCheckOutTime : null,
            checkInLocation : checkInLocation
          }
        });
  }
});

