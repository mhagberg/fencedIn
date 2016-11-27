//this code is intended to stay with the take picture button.
var onSuccess = function (imageData, jobId, checkin_id) {
  Pictures.insert({
    image: imageData,
    job_id: jobId,
    checkin_id: checkin_id,
    createDate: new Date().getTime()
  });
};

Template.jobHistory.events({
  'click #checkInBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobCheckIn/' + this._id + '/' + foremenFilterParam());
  },
  'click #jobDetailsBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobDetails/' + this._id + '/' + foremenFilterParam());
  },
  'click #finishBtn' : function(e) {
    e.preventDefault();
    Jobs.update({_id : this._id}, {
      $set : {finishDate : new Date().getTime()}
    });
      Meteor.call('sendEmail',{
          to: 'mike.hagberg@gmail.com',
          to: 'nathan@secomafence.com',
          to: 'sales@secomafence.com',
          from: 'mike@secomafence.com',
          subject: 'Finished Job # ' + this.number ,
          text: 'Finished Job # ' + this.number + '. Click this link to see the details. http://fencedin.secomafence.com/admin/jobReport/' + this._id,
          html: ''
      });
  },
  'click #hideBtn' : function(e) {
    e.preventDefault();
      Jobs.update({_id : this._id}, {
        $set : {hidden : true}
    });
  },
  'click .jobLink' : function(e) {
    e.preventDefault();
    Router.go('/jobEdit/' + this.job._id + '/' + foremenFilterParam());
  },
  'click .checkInLink' : function(e) {
    e.preventDefault();
    Router.go('/checkInEdit/' + this._id + '/' + foremenFilterParam());
  },
  "click #takePicture": function () {
    var jobId = this._id;
    MeteorCamera.getPicture(function (error, data) {
      // we have a picture
      if (! error) {
        onSuccess(data, jobId, null);
      }
    });
  },
  'click #checkOutBtn' : function(e) {
    e.preventDefault();
    var checkIn = JobCheckIns.findOne({job_id : this._id}, {sort : {checkOutTime : 1}}, {limit : 1});
    result = JobCheckIns.update({_id : checkIn._id}, {
      $set : {
        checkOutTime : new Date().getTime(),
        systemCheckOutTime : new Date().getTime()
      }
    });
  },
  'click .img-responsive' : function(e) {
    e.preventDefault();

    var firstPic = Pictures.findOne({_id : this._id});
    if (firstPic) {
    var items = [
      {
        src : firstPic.image,
        w : e.target.naturalWidth,
        h : e.target.naturalHeight
      }];
    }
    Pictures.find({job_id : this.job_id}).forEach(function(picture) {
      var w = $("#" + picture._id)[0].naturalWidth;
      var h = $("#" + picture._id)[0].naturalHeight;
      if (picture._id != firstPic._id) {
        items.push(
            {
              src : picture.image,
              w : w,
              h : h
            }
        );
      }
    });

    Session.set('jobPictures', items);
    Session.set('jobId', this.job_id);
    Router.go('/jobPictureView/');
  }
});

Template.jobHistory.helpers({
  loadTimePlusTravelTime : function(checkInId) {
    var checkIn = JobCheckIns.findOne({_id : checkInId});
    return Number(checkIn.loadTime) + Number(checkIn.travelTime);
  },
  cordova: function() {
    return Meteor.isCordova && 'cordova';
  }
});



