UI.registerHelper('loadTimePlusTravelTime', function (checkInId) {
    var checkIn = JobCheckIns.findOne({_id: checkInId});
    return Number(checkIn.loadTime) + Number(checkIn.travelTime);

});