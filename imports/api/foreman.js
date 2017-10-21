import { Mongo } from 'meteor/mongo';
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('foremen', function fencerPublication() {
        let foremen = Foreman.find({});
        return foremen;
    });
}