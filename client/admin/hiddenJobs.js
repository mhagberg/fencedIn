Template.hiddenJobs.events({
  'click #un-hideBtn' : function(e) {
    e.preventDefault();
    if (confirm("Click OK if you really want to un-hide this job?") == true) {
      Jobs.update({_id: this._id}, {
        $set: {hidden: null}
      });
    }
    Router.go('/hiddenJobs/');
  }
});