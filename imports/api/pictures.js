import {Mongo} from 'meteor/mongo';

// export const Pictures = new Mongo.Collection('picture');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('recentImagesPipeLine', function getRecentImages() {
        let recentImagesPipeline = [
            {
                "$match": {
                    "createDate": {
                        "$gte": 1.536554927E12
                    }
                }
            },
            {
                "$sort": {
                    "createDate": -1.0
                }
            },
            {
                "$limit": 700.0
            }
        ];
        var options = {
            allowDiskUse: false,
        };

        let aSubscriptionMember = this;
        let collection = Pictures.rawCollection();
        Promise.await(collection.aggregate(recentImagesPipeline, options).toArray()).forEach(function (result) {
            aSubscriptionMember.added('recentImages', result._id, result);
        });
        return aSubscriptionMember.ready();
    });

    // Meteor.publish('imagesGallery', function picturePublication() {
    //     return Pictures.find({}, {sort: {"createDate": -1}, limit: 100});
    // });
    Meteor.publish('chainLinkPics', function picturePublication() {
        return Pictures.find({"tags": {$elemMatch: {$eq: "Chain Link"}}}, {
            "_id": 1,
            "createDate": 1,
            "image": 1,
            "job_id": 1,
            "tags": 1
        }, {sort: {"createDate": -1}});
    });

    Meteor.publish('wooodPics', function picturePublication() {
        return Pictures.find({"tags": {$elemMatch: {$eq: "Wood"}}}, {
            "_id": 1,
            "createDate": 1,
            "image": 1,
            "job_id": 1,
            "tags": 1
        }, {sort: {"createDate": -1}});
    });


    Meteor.publish('vinylPics', function picturePublication() {
        return Pictures.find({"tags": {$elemMatch: {$eq: "Vinyl"}}}, {
            "_id": 1,
            "createDate": 1,
            "image": 1,
            "job_id": 1,
            "tags": 1
        }, {sort: {"createDate": -1}});
    });


    Meteor.publish('ornamntalIronPics', function picturePublication() {
        return Pictures.find({"tags": {$elemMatch: {$eq: "Ornamental Iron"}}}, {
            "_id": 1,
            "createDate": 1,
            "image": 1,
            "job_id": 1,
            "tags": 1
        }, {sort: {"createDate": -1}});
    });


    Meteor.publish('otherPics', function picturePublication() {
        return Pictures.find({"tags": {$elemMatch: {$eq: "Other"}}}, {
            "_id": 1,
            "createDate": 1,
            "image": 1,
            "job_id": 1,
            "tags": 1
        }, {sort: {"createDate": -1}});
    });


    Meteor.publish('pictureCount', function picturePublication() {
        let pictures = Pictures.find({}, {job_id: 1});
        return pictures;
    });
    Meteor.publish('jobPictures', function picturePublication(job_id) {
        let pictures = Pictures.find({'job_id': job_id});
        return pictures;
    });
}

