Template.webCam.onRendered(function () {
    let element = $("body");
    MeteorCamera.showPreview(element);
});
Template.webCam.events({
    'click #returnUrl': function (e) {
        e.preventDefault();
        let returnUrl = Session.get('returnUrl');
        Router.go(returnUrl);
    }
    // 'click #saveImage': function (e) {
    //     let imageDataUrl = MeteorCamera.takeSnapshot();
    //     Meteor.call('saveFile', imageDataUrl, jobId);
    //     MeteorCamera.hide();
    //     let returnUrl = Session.get('returnUrl');
    //     Router.go(returnUrl);
    // }
});