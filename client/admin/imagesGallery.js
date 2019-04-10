Template.imagesGallery.events({
    'change #uploadFile': function (e) {
        e.preventDefault();
        let jobId = event.target.job_id;
        let fileReader = new FileReader();
        let file = event.target.files[0];
        if (!file) return;
        fileReader.onload = function (event) {
            let dataUrl = event.target.result;
            Meteor.call('saveFile', dataUrl, jobId);
        };
        fileReader.readAsDataURL(file);
        location.reload();
    },
    'click .img-responsive': function (e) {
        e.preventDefault();

        var firstPic = RecentImages.findOne({_id: this._id});
        if (firstPic) {
            var items = [
                {
                    src: firstPic.image,
                    w: e.target.naturalWidth,
                    h: e.target.naturalHeight
                }];
        }
        RecentImages.find({}, {sort: {"createDate": -1}}).forEach(function (picture, index) {
            var w = $("#" + picture._id)[0].naturalWidth;
            var h = $("#" + picture._id)[0].naturalHeight;
            if (picture._id == firstPic._id) {
                Session.set('picIndex', index + 1)
            }
            items.push(
              {
                  src: picture.image,
                  w: w,
                  h: h
              }
            );
        });

        Session.set('jobPictures', items);
        Session.set('returnUrl', '/admin/imagesGallery/');
        Router.go('/jobPictureView/');
    },
    'change :checkbox': function (e) {
        e.preventDefault();
        const target = event.target;
        const tagText = target.value;
        let tagArray = this.tags;
        if (!tagArray) {
            tagArray = [];
        }
        if (target.checked) {
            if (tagArray.indexOf(tagText) === -1) {
                tagArray.push(tagText);
            }
        }
        if (!target.checked) {
            if (tagArray.indexOf(tagText) !== -1) {
                tagArray.splice(tagArray.indexOf(tagText), 1);
            }
        }
        Meteor.call('tagPicture', this._id, tagArray);
        this.tags = tagArray;
    },
});


