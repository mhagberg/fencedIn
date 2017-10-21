import { Mongo } from 'meteor/mongo';

// export const Jobs = new Mongo.Collection('jobs');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('jobsLimit', function jobsLimitPublication(jobLimit) {
        let jobs = Jobs.find({$and:[{hidden : null}, {$or:[{'finishDate': null}, {'finishDate': ""}]}]}, {sort : {createDate : -1}, limit:jobLimit}, {createDate : 1, name : 1, number: 1});
        return jobs;
    });
    Meteor.publish('jobsSearch', function jobsSearchPublication(jobLimit, jobSearchText) {
        var regex = new RegExp(".*" + jobSearchText + ".*", "i");
        let jobs =  Jobs.find({$or:[{name:regex}, {number:regex}]}, {sort : {createDate : -1, name : 1}, limit:jobLimit}, {createDate : 1}).fetch();
        return jobs;
    });
    Meteor.publish('jobs', function jobsPublication() {
        let jobs = Jobs.find({$and:[{hidden : null}, {$or:[{'finishDate': null}, {'finishDate': ""}]}]}, {sort : {createDate : -1}, limit:1000}, {createDate : 1, name : 1, number: 1});
        return jobs;
    });
}