Template.imagesGallery.events({
'click .img-responsive' : function(e) {
    e.preventDefault();

    var firstPic = Pictures.findOne({_id : this._id});
    if (firstPic) {
        var items = [
            {
                src : firstPic.image,
                w : e.target.naturalWidth,
                h : e.target.naturalHeight
            }];
    }
    Pictures.find({},{limit:500}).forEach(function(picture, index) {
        var w = $("#" + picture._id)[0].naturalWidth;
        var h = $("#" + picture._id)[0].naturalHeight;
        if (picture._id == firstPic._id) {
            Session.set('picIndex', index+1)
        }
        items.push(
          {
              src : picture.image,
              w : w,
              h : h
          }
        );
    });

    Session.set('jobPictures', items);
    Session.set('returnUrl', '/admin/imagesGallery/');
    Router.go('/jobPictureView/');
}
});