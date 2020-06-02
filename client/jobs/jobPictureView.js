Template.jobPictureView.onRendered(function () {

    // define options (if needed)
    let picIndex = Session.get('picIndex');
    let options = {
        history: false,
        quality: 100,
        focus: false,
        escKey: true,
        index: picIndex,
        showAnimationDuration: 0,
        hideAnimationDuration: 0

    };

    var pswpElement = document.querySelectorAll('.pswp')[0];

    var jobPictures = Session.get('jobPictures');
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, jobPictures, options);
    gallery.init();
});

Template.jobPictureView.events({
    'click .pswp__button.pswp__button--close': function (e) {
        e.preventDefault();
        var previous = Session.get('previous');
        var returnUrl = Session.get('returnUrl');
        if (previous) {
            Router.go(previous);
        } else {
            Router.go(returnUrl);
        }
    },
    'click #returnUrl': function (e) {
        e.preventDefault();
        var returnUrl = Session.get('returnUrl');
        Router.go(returnUrl);
    }
});
