//this code is intended to stay with the take picture button.
var onSuccess = function (imageData, jobId, checkin_id) {
    Pictures.insert({
        image: imageData,
        job_id: jobId,
        checkin_id: checkin_id,
        createDate: new Date().getTime()
    });
};

Template.jobHistory.events({
    'change input': function (e) {
        e.preventDefault();
        let jobId = this._id;
        let fileReader = new FileReader();
        let file = event.target.files[0];
        if (!file) return;
        fileReader.onload = function (event) {
            let dataUrl = event.target.result;
            Meteor.call('saveFile', dataUrl, jobId);
        };
        fileReader.readAsDataURL(file);
    },
    'click #checkInBtn': function (e) {
        e.preventDefault();
        Router.go('/jobCheckIn/' + this._id + '/' + foremenFilterParam());
    },
    'click #jobDetailsBtn': function (e) {
        e.preventDefault();
        Router.go('/jobDetails/' + this._id + '/' + foremenFilterParam());
    },
    'click #finishBtn': function (e) {
        e.preventDefault();
        Jobs.update({_id: this._id}, {
            $set: {finishDate: new Date().getTime()}
        });
        Meteor.call('sendEmail', {
            to: 'nathan.secoma@hotmail.com',
            from: 'mike.hagberg@gmail.com',
            subject: 'Finished Job # ' + this.number,
            text: 'Finished Job # ' + this.number + '. Click this link to see the details. http://fencedin.secomafence.com/admin/jobReport/' + this._id,
            html: ''
        });
    },
    'click #hideBtn': function (e) {
        e.preventDefault();
        Jobs.update({_id: this._id}, {
            $set: {hidden: true}
        });
    },
    'click .jobLink': function (e) {
        e.preventDefault();
        Router.go('/jobEdit/' + this.job._id + '/' + foremenFilterParam());
    },
    'click .checkInLink': function (e) {
        e.preventDefault();
        Router.go('/checkInEdit/' + this._id + '/' + foremenFilterParam());
    },
    "click #takePicture": function () {
        var jobId = this._id;
        MeteorCamera.getPicture(function (error, data) {
            // we have a picture
            if (!error) {
                onSuccess(data, jobId, null);
            }
        });
    },
    'click #checkOutBtn': function (e) {
        e.preventDefault();
        var checkIn = JobCheckIns.findOne({job_id: this._id}, {sort: {checkOutTime: 1}}, {limit: 1});
        result = JobCheckIns.update({_id: checkIn._id}, {
            $set: {
                checkOutTime: new Date().getTime(),
                systemCheckOutTime: new Date().getTime()
            }
        });
    },
    'click .img-responsive': function (e) {
        e.preventDefault();
        let img = new Image();
        var firstPic = Pictures.findOne({_id: this._id});
        if (firstPic) {
            img.src = firstPic.image;
            if (img.naturalHeight === 0) return;
            var items = [
                {
                    src: firstPic.image,
                    w: img.naturalWidth,
                    h: img.naturalHeight
                }];
        }
        Pictures.find({job_id: this.job_id}).forEach(function (picture, index) {
            img.src = picture.image;
            if (img.naturalHeight === 0) return;
            let w = img.naturalWidth;
            let h = img.naturalHeight;
            if (picture._id == firstPic._id) {
                Session.set('picIndex', index + 1)
            }
            items.push(
              {
                  src: img.src,
                  w: w,
                  h: h
              }
            );
        });

        Session.set('jobPictures', items);
        Session.set('jobId', this.job_id);
        Session.set('returnUrl', '/jobHistory/' + this.job_id + '/' + foremenFilterParam());
        Router.go('/jobPictureView/');
    }
});

Template.jobHistory.helpers({
    loadTimePlusTravelTime: function (checkInId) {
        var checkIn = JobCheckIns.findOne({_id: checkInId});
        return Number(checkIn.loadTime) + Number(checkIn.travelTime);
    },
    cordova: function () {
        return Meteor.isCordova && 'cordova';
    }
});



