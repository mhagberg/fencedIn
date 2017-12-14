import { Mongo } from 'meteor/mongo';

// export const Pictures = new Mongo.Collection('picture');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('imagesGallery', function picturePublication() {
        let pictures = Pictures.find({},{sort:{"createDate": -1}, limit:100});
        return pictures;
    });
    Meteor.publish('pictureCount', function picturePublication() {
        let pictures = Pictures.find({},{job_id: 1});
        return pictures;
    });
    Meteor.publish('jobPictures', function picturePublication(job_id) {
        let pictures = Pictures.find({'job_id':job_id});
        return pictures;
    });}

