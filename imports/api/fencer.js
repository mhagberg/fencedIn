import { Mongo } from 'meteor/mongo';
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('fencers', function fencerPublication() {
        let fencers = Fencer.find({});
        return fencers;
    });
}