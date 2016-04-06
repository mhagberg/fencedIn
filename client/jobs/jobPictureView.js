Template.jobPictureView.onRendered(function(){

  // define options (if needed)
  var options = {
    // history & focus options are disabled on CodePen
    history : false,
    focus : false,

    showAnimationDuration : 0,
    hideAnimationDuration : 0

  };

  var pswpElement = document.querySelectorAll('.pswp')[0];

  var jobPictures = Session.get('jobPictures');
  var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, jobPictures, options);
  gallery.init();
});

Template.jobPictureView.events({
  'click .pswp__button.pswp__button--close' : function(e) {
    e.preventDefault();
    var jobId = Session.get('jobId');
    Router.go('/jobHistory/' + jobId + '/' + foremenFilterParam());
    Router.go('/jobHistory/'+jobId+'/'+ foremenFilterParam());
  }
});
