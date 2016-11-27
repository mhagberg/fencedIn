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



// checkIns.forEach(function(checkin){
//     total =+ 1;
// });