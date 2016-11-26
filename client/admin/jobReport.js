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
    }
});



// checkIns.forEach(function(checkin){
//     total =+ 1;
// });