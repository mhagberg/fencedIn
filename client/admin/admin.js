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
  'click .jobReportsDiv' : function(e) {
    e.preventDefault();
    Router.go('jobReports');
  },
    'click .ImagesGalleryDiv' : function(e) {
        e.preventDefault();
        Router.go('/admin/imagesGallery/');
    },
    'click .ImagesPreviewDiv' : function(e) {
        e.preventDefault();
        window.location.href = 'http://www.secomafence.com/recent-work-new/';
    },
  'click .reportsDiv' : function(e) {
    e.preventDefault();
    Router.go('/admin/checkInPerJobByForeman/');
  },
  'click .jobStatusDiv' : function(e) {
  e.preventDefault();
  Router.go('/admin/jobsAssigned/');
}
});

Template.admin.onRendered(function () {
  $('#content-container').css({
    'left': '0px',
    'position': '0px'
  });
});