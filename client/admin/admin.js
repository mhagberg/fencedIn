Template.admin.events({
  'click .configure-salesman' : function(e) {
    e.preventDefault();
    Router.go('salesmenList');
  },
  'click .configure-foreman' : function(e) {
    e.preventDefault();
    Router.go('foremenList');
  },
  'click .configure-fencer' : function(e) {
    e.preventDefault();
    Router.go('fencersList');
  },
  'click .configure-hiddenJobs' : function(e) {
    e.preventDefault();
    Router.go('hiddenJobs');
  }
});