/**
 * Created by mike.hagberg on 11/25/16.
 */
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
    Session.set('previous', '/admin/reports/jobReport/'+this.job_id);
    Router.go('/jobPictureView/');
}
});
// checkIns.forEach(function(checkin){
//     total =+ 1;
// });