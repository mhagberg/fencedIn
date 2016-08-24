Template.jobDetails.events({
'click .jobLink' : function(e) {
  e.preventDefault();
  Router.go('/jobEdit/' + this.job._id + '/' + foremenFilterParam());
}
});