UI.registerHelper('loadTimePlusTravelTime', function (checkInId) {
    var checkIn = JobCheckIns.findOne({_id: checkInId});
    return Number(checkIn.loadTime) + Number(checkIn.travelTime);

});

UI.registerHelper('totalCheckIns', function (jobId) {
    var checkInCount = JobCheckIns.find({job_id: jobId}).count();
    return checkInCount;
});

UI.registerHelper('totalHoursLogged', function (jobId) {
    var totalHours = 0;
    var checkIns = JobCheckIns.find({job_id: jobId});
    checkIns.forEach(function (checkin) {
        var startTime = moment(checkin.checkInTime);
        var endTime = moment(checkin.checkOutTime);
        var duration = moment.duration(endTime.diff(startTime));
        var hours = duration.asHours();
        totalHours = hours + totalHours;
    });
    return totalHours;
});

UI.registerHelper('totalManHours', function (jobId) {
    var totalManHours = 0;
    var numberOfWorkers = 1;
    var checkIns = JobCheckIns.find({job_id: jobId});
    checkIns.forEach(function (checkin) {
        var startTime = moment(checkin.checkInTime);
        var endTime = moment(checkin.checkOutTime);
        var duration = moment.duration(endTime.diff(startTime));
        var hours = duration.asHours();
        if (checkin.foremen) {
            numberOfWorkers = checkin.foremen.length;
        }
        if (checkin.fencers) {
            numberOfWorkers = checkin.fencers.length + numberOfWorkers;
        }

        totalManHours = (hours * numberOfWorkers) + totalManHours;
    });
    return totalManHours;
});