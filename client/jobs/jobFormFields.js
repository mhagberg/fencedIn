Template.jobFormFields.helpers({
  isJobTypeSelected : function (jobId, jobType ){
    if (!jobId) return "";
    var job = Jobs.findOne({_id : jobId});
    if (job && job.type === jobType)
      return 'selected';
    else
      return "";
  }
});
Template.jobFormFields.onRendered(function() {
  $('#finish').datetimepicker();
  $('#start').datetimepicker();
  $('#estFinish').datetimepicker();
  $('#estStart').datetimepicker();
});