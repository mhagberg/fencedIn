import { Mongo } from 'meteor/mongo';
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('jobCheckIns', function jobCheckInPublication(job_id) {
        let jobCheckins = JobCheckIns.find({'job_id':job_id});
        return jobCheckins;
    });
    Meteor.publish('allCheckIns', function allCheckInPublication() {
        let allCheckIns = JobCheckIns.find({});
        return allCheckIns;
    });
    Meteor.publish('jobCheckInId', function jobCheckInIdPublication(checkin_id) {
        let allCheckIns = JobCheckIns.find({'_id': checkin_id});
        return allCheckIns;
    });

}