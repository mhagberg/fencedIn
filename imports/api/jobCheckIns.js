import { Mongo } from 'meteor/mongo';
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('jobCheckIns', function jobCheckInPublication(job_id) {
        let jobCheckins = JobCheckIns.find({'job_id':job_id});
        return jobCheckins;
    });
    Meteor.publish('allCheckIns', function allCheckInPublication() {
        debugger;
        console.log('hey, in the server for jobCheckins');
        let allCheckIns = JobCheckIns.find({});
        return allCheckIns;
    });
    Meteor.publish('jobCheckInId', function jobCheckInIdPublication(checkin_id) {
        let checkinsFound = JobCheckIns.find({'_id': checkin_id});
        return checkinsFound;
    });


//     Meteor.publish('jobCheckByForeman', function jobCheckInByForeman(foremanName) {
//         debugger;
//         let checkinsFound = JobCheckIns.find({'foremen': {$eleMatch: {'name': foremanName}}});
//         return checkinsFound;
//     });
 }