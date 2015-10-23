
Template.jobHistory.events({
  'click #checkInBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobCheckIn/'+this._id +'/'+ foremenFilterParam());
  },
  'click #finishBtn' : function(e) {
    e.preventDefault();
      Jobs.update({_id: this._id}, {
      $set: {finishDate: new Date().getTime()}
    });
  },
  'click #hideBtn' : function(e) {
    e.preventDefault();
      var x;
      if (confirm("Click OK if you really want to hide this job? You will have to go to the admin page to un-hide it.") == true) {
        Jobs.update({_id: this._id}, {
        $set: {hidden: true}
        });
      }
  },
  'click .jobLink' : function(e) {
    e.preventDefault();
    Router.go('/jobEdit/'+this.job._id + '/' + foremenFilterParam());
  },
  'click .checkInLink' : function(e) {
    e.preventDefault();
    Router.go('/checkInEdit/'+this._id+'/'+ foremenFilterParam());
  },
  'click #checkOutBtn' : function(e) {
    e.preventDefault();
    var checkIn = JobCheckIns.findOne({job_id: this._id}, {sort:{checkOutTime:1}},{limit:1});
    result = JobCheckIns.update({_id: checkIn._id}, {
      $set:
      {
        checkOutTime: new Date().getTime(),
        systemCheckOutTime: new Date().getTime()
      }
    });
  }
});

Template.jobHistory.helpers({
  loadTimePlusTravelTime: function(checkInId){
    var checkIn = JobCheckIns.findOne({_id: checkInId});
    return Number(checkIn.loadTime) + Number(checkIn.travelTime);
  }
});



