Template.jobFormFields.helpers({
  isJobTypeSelected : function (jobId, jobType ){
    if (Jobs.findOne({_id: jobId}).type === jobType)
      return 'selected'
    else
      return "";
  }
});