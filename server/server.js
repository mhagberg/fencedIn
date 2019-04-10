import '../imports/api/jobs.js';
import '../imports/api/pictures.js';
import '../imports/api/fencer.js';
import '../imports/api/salesman.js';
import '../imports/api/jobCheckIns.js';
import '../imports/api/foreman.js';

Meteor.startup(function() {

});


Meteor.methods({

});

Meteor.methods({
    tagPicture: function(pictureId, tagArray){
        Pictures.update({_id:pictureId},
          {
              $set: {
                  tags: tagArray
              }
          });
    },
    saveFile: function(dataUrl, jobId){
        Pictures.insert({
            image: dataUrl,
            job_id: jobId,
            checkin_id: null,
            createDate: new Date().getTime()
        });
    },
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
  },
    sendEmail: function (mailFields) {
        console.log("about to send email...");
        check([mailFields.to, mailFields.from, mailFields.subject, mailFields.text, mailFields.html], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Meteor.Mailgun.send({
            to: mailFields.to,
            from: mailFields.from,
            subject: mailFields.subject,
            text: mailFields.text,
            html: mailFields.html
        });
        console.log("email sent!");
    }
});

