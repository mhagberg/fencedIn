/**
 * Created by mike.hagberg on 11/25/16.
 */
Template.jobReport.helpers({
    totalCheckIns : function(jobId) {
        var checkInCount = JobCheckIns.find({job_id: jobId}).count();
        return checkInCount;
    },
    totalHoursLogged : function (jobId) {
        var totalHours =0;
        var checkIns = JobCheckIns.find({job_id: jobId});
        checkIns.forEach(function(checkin) {
            var startTime = moment(checkin.checkInTime);
            var endTime = moment(checkin.checkOutTime);
            var duration = moment.duration(endTime.diff(startTime));
            var hours = duration.asHours();
            totalHours = hours + totalHours;
        });
        return totalHours;
    },

    totalManHours : function (jobId) {
        var totalManHours =0;
        var numberOfWorkers =1;
        var checkIns = JobCheckIns.find({job_id: jobId});
        checkIns.forEach(function(checkin) {
            var startTime = moment(checkin.checkInTime);
            var endTime = moment(checkin.checkOutTime);
            var duration = moment.duration(endTime.diff(startTime));
            var hours = duration.asHours();
            if (checkin.foremen) {
                numberOfWorkers = checkin.foremen.length;
            }
            if (checkin.fencers)
            {
                numberOfWorkers = checkin.fencers.length + numberOfWorkers;
            }

            totalManHours = (hours * numberOfWorkers) + totalManHours;
        });
        return totalManHours;
    }
});
Template.jobReport.events({
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
    Pictures.find({job_id : this.job_id}).forEach(function(picture) {
        var w = $("#" + picture._id)[0].naturalWidth;
        var h = $("#" + picture._id)[0].naturalHeight;
        if (picture._id != firstPic._id) {
            items.push(
                {
                    src : picture.image,
                    w : w,
                    h : h
                }
            );
        }
    });

    Session.set('jobPictures', items);
    Session.set('jobId', this.job_id);
    Session.set('previous', '/admin/jobReport/'+this.job_id);
    Router.go('/jobPictureView/');
}
});
// checkIns.forEach(function(checkin){
//     total =+ 1;
// });