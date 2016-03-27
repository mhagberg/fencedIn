Template.jobHistory.events({
  'click #checkInBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobCheckIn/' + this._id + '/' + foremenFilterParam());
  },
  'click #finishBtn' : function(e) {
    e.preventDefault();
    Jobs.update({_id : this._id}, {
      $set : {finishDate : new Date().getTime()}
    });
  },
  'click #hideBtn' : function(e) {
    e.preventDefault();
    var x;
    if (confirm("Click OK if you really want to hide this job? You will have to go to the admin page to un-hide it.") == true) {
      Jobs.update({_id : this._id}, {
        $set : {hidden : true}
      });
    }
  },
  'click .jobLink' : function(e) {
    e.preventDefault();
    Router.go('/jobEdit/' + this.job._id + '/' + foremenFilterParam());
  },
  'click .checkInLink' : function(e) {
    e.preventDefault();
    Router.go('/checkInEdit/' + this._id + '/' + foremenFilterParam());
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
    var pswpElement = document.querySelectorAll('.pswp')[0];

    var firstPic = Pictures.findOne({_id : this._id});
    var items = [
      {
        src : firstPic.image,
        w : e.target.naturalWidth,
        h : e.target.naturalHeight
      }];
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
    })
    ;

    // define options (if needed)
    var options = {
      // history & focus options are disabled on CodePen
      history : false,
      focus : false,

      showAnimationDuration : 0,
      hideAnimationDuration : 0

    };

    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }
});

Template.jobHistory.helpers({
  loadTimePlusTravelTime : function(checkInId) {
    var checkIn = JobCheckIns.findOne({_id : checkInId});
    return Number(checkIn.loadTime) + Number(checkIn.travelTime);
  }
});



