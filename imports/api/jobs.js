// export const Jobs = new Mongo.Collection('jobs');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('jobsSearch', function jobsSearchPublication(regex,jobLimit) {
        const query = {$or: [{name: regex}, {number: regex}]};
        const options = {sort: {createDate: -1}, limit: jobLimit};
        return jobs = Jobs.find(query,{createDate: 1, name: 1, number: 1}, options);
    });
    Meteor.publish('jobs', function jobsPublication(jobLimit) {
        const query = {"finishDate": {$eq: null}};
        const options = {sort: {createDate: -1}, limit: jobLimit};
        return Jobs.find(query, {createDate: 1, name: 1, number: 1}, options);
    });

    Meteor.publish('job_Reports', function jobReportsPublication() {
        return Jobs.find({'finishDate': {"$ne": null}}, {
            sort: {'finishDate': -1},
        }, {name: 1, number: 1, createDate: 1, finishDate: 1});
    });
    Meteor.publish('allJobs', function allJobsPublication() {
        return Jobs.find({});
    });
    Meteor.publish('oneJob', function oneJobPublication(jobId) {
        return Jobs.find({_id: jobId});
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
