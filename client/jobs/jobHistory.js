Template.jobHistory.helpers({
  jobCheckInItem: function(jobId) {
    //return JobCheckIns.find({job_id: jobId},{sort:{checkInTime:-1},limit: 5});
    return JobCheckIns.find({},{sort:{checkInTime:-1}});
  },

  job: function(jobId){
         return Jobs.findOne();
         //return Jobs.findOne({_id: jobId})
      },

  address: function(jobId){
    return Address.findOne();
    //return Address.findOne({_id: jobId})
  }
});