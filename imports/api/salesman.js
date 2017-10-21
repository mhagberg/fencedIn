import { Mongo } from 'meteor/mongo';
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('salesmen', function salesmenPublication() {
        let salesmen = Salesman.find({});
        return salesmen;
    });
}