
Template.jobHistory.events({
  'click #checkInBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobCheckIn/'+this._id);
  },
  'click #finishBtn' : function(e) {
    e.preventDefault();
    result = Jobs.update({_id: this._id}, {
      $set: {finishDate: new Date()}
    });
  },
  'click #editJobBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobEdit/'+this._id);
  },
  'click #editCheckIn' : function(e) {
    e.preventDefault();
    Router.go('/checkInEdit/'+this._id);
  },
  'click #checkOutBtn' : function(e) {
    e.preventDefault();
    var checkIn = JobCheckIns.findOne({job_id: this._id}, {sort:{checkOutTime:1}},{limit:1});
    result = JobCheckIns.update({_id: checkIn._id}, {
      $set:
      {
        checkOutTime: new Date(),
        systemCheckOutTime: new Date()
      }
    });
  }
});

Template.jobHistory.helpers({
  loadTimePlusTravelTime: function(checkInId){
    var checkIn = JobCheckIns.findOne({_id: checkInId});
    return checkIn.loadTime + checkIn.travelTime;
  }
});


