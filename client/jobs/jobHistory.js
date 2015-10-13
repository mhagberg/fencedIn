
Template.jobHistory.events({
  'click #checkInBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobCheckIn/'+this._id);
  },
  'click #finishBtn' : function(e) {
    e.preventDefault();
    result = Jobs.update({_id: this._id}, {
      $set: {finishDate: new Date().getTime()}
    });
  },
  'click .jobLink' : function(e) {
    e.preventDefault();
    Router.go('/jobEdit/'+this.job._id);
  },
  'click .checkInLink' : function(e) {
    e.preventDefault();
    Router.go('/checkInEdit/'+this._id);
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



