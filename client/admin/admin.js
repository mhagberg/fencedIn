Template.admin.events({
  'click .salesmanDiv' : function(e) {
    e.preventDefault();
    Router.go('salesmenList');
  },
  'click .foremanDiv' : function(e) {
    e.preventDefault();
    Router.go('foremenList');
  },
  'click .fencerDiv' : function(e) {
    e.preventDefault();
    Router.go('fencersList');
  },
  'click .hiddenJobsDiv' : function(e) {
    e.preventDefault();
    Router.go('hiddenJobs');
  },
  'click .jobReportsDiv' : function(e) {
    e.preventDefault();
    Router.go('jobReports');
  },
    'click .ImagesGalleryDiv' : function(e) {
        e.preventDefault();
        Router.go('/admin/imagesGallery/');
    }
});