import {Mongo} from 'meteor/mongo';

// export const Jobs = new Mongo.Collection('jobs');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('jobsLimit', function jobsLimitPublication(jobLimit) {
        let jobs = Jobs.find({'finishDate': null}, {
            sort: {createDate: -1},
            limit: jobLimit
        }, {createDate: 1, name: 1, number: 1});
        return jobs;
    });
    Meteor.publish('jobsSearch', function jobsSearchPublication(regex) {
        let jobs = Jobs.find({$or: [{name: regex}, {number: regex}]}, {
            limit: 10
        }, {createDate: 1});
        return jobs;
    });
    Meteor.publish('jobs', function jobsPublication() {
        let jobs = Jobs.find({'finishDate': null}, {
            sort: {createDate: -1},
        }, {createDate: 1, name: 1, number: 1});
        return jobs;
    });

    Meteor.publish('job_Reports', function jobReportsPublication() {
        let jobs = Jobs.find({'finishDate': {"$ne": null}}, {
            sort: {'finishDate': -1},
        }, {name: 1, number: 1, createDate: 1, finishDate: 1});
        return jobs;
    });
    Meteor.publish('allJobs', function allJobsPublication() {
        let jobs = Jobs.find({});
        return jobs;
    });
    Meteor.publish('oneJob', function oneJobPublication(jobId) {
        let jobs = Jobs.find({_id: jobId});
        return jobs;
    });
    Meteor.publish('jobCheckInsByJobId', function jobCheckIns(jobId) {
        return JobCheckIns.find({job_id: jobId});
    });

    Meteor.publish('jobsAssigned', function jobsAssignedPublication() {
        return Jobs.find({'status': {"$eq": "Assigned"}});
    });

    Meteor.publish('jobsToDo', function () {
        return Jobs.find({'status': {"$eq": "To Do"}});
    });

    Meteor.publish('jobsFinished', function () {
        return Jobs.find({'status': {"$eq": "Finished"}});
    });

    Meteor.publish('jobsCanceled', function () {
        return Jobs.find({'status': {"$eq": "Canceled"}});
    });

    Meteor.publish('jobsOnHold', function () {
        return Jobs.find({'status': {"$eq": "On Hold"}});
    });

    Meteor.publish('jobsInvoiced', function () {
        return Jobs.find({'status': {"$eq": "Invoiced"}});
    });
}
