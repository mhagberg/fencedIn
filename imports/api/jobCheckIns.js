import {Mongo} from 'meteor/mongo';

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('jobCheckIns', function jobCheckInPublication(job_id) {
        let jobCheckins = JobCheckIns.find({'job_id': job_id});
        return jobCheckins;
    });
    Meteor.publish('allCheckIns', function allCheckInPublication() {
        // debugger;
        let allCheckIns = JobCheckIns.find({});
        return allCheckIns;
    });

    Meteor.publish('jobCheckInId', function jobCheckInIdPublication(checkin_id) {
        let checkinsFound = JobCheckIns.find({'_id': checkin_id});
        return checkinsFound;
    });

    // // Meteor.publish('checkIn_Report', function checkInReportPublication() {
    // //     let checkInsAndJob = [];
    // //     let dateFrom = moment().startOf('day').subtract(3, 'days').unix() * 1000;
    // //     let checkInsPerJobPipelineYesterday =
    // //         [
    // //             {
    // //                 "$project": {
    // //                      // "_id" : Mongo.ObjectID,
    // //                     "jc": "$$ROOT"
    // //                 }
    // //             },
    // //             {
    // //                 "$lookup": {
    // //                     "localField": "jc.job_id",
    // //                     "from": "jobs",
    // //                     "foreignField": "_id",
    // //                     "as": "j"
    // //                 }
    // //             },
    // //             {
    // //                 "$unwind": {
    // //                     "path": "$j",
    // //                     "preserveNullAndEmptyArrays": false
    // //                 }
    // //             },
    // //             {
    // //                 "$match": {
    // //                     "jc.checkInTime": {
    // //                         "$gt": dateFrom
    // //                     }
    // //                 }
    // //             },
    // //             {
    // //                 "$sort": {
    // //                     "jc.checkInTime": -1
    // //                 }
    // //             },
    // //             {
    // //                 "$project": {
    // //                     "jc.checkIn_id": "$jc._id",
    // //                     "jc.job_id": "$jc.job_id",
    // //                     "jc.checkInTime": "$jc.checkInTime",
    // //                     "jc.loadTime": "$jc.loadTime",
    // //                     "j.name": "$j.name",
    // //                     "j.job_id": "$j._id",
    // //                     "j.createDate": "$j.createDate",
    // //                     "j.finishDate": "$j.finishDate",
    // //                     "j.number": "$j.number",
    // //                 }
    // //             }
    // //         ];
    //
    //     let collection = JobCheckIns.rawCollection();
    //     let result_id = "";
    //     Promise.await(collection.aggregate(checkInsPerJobPipelineYesterday).toArray()).forEach(function (result) {
    //         result_id = result._id;
    //         console.log("FinishDate: " + result.j.finishDate);
    //         checkInsAndJob.push({
    //             job_id: result.j.job_id,
    //             name: result.j.name,
    //             number: result.j.number,
    //             startDate: result.j.startDate,
    //             finishDate: result.j.finishDate,
    //             checkInTime: result.jc.checkInTime,
    //             checkIn_id: result.jc.checkIn_id,
    //             checkInLoadTime: result.jc.loadTime,
    //             checkInJob_id: result.jc.job_id
    //         });
    //     });
    //     this.added('checkInsAndJob', result_id, {checkInsAndJobs: checkInsAndJob});
    //     return this.ready();
    // });


    // Meteor.publish('barChartData', function getBarChartData(foremanIds, dateFrom, dateTo, groupByOperator) {
    //     let totalJobsPerForemanPipeline = [
    //         {
    //             "$match": {
    //                 "$and": [
    //                     {"checkInTime": {"$gte": dateFrom * 1000}},
    //                     {"checkInTime": {"$lt": dateTo * 1000}}
    //                 ]
    //             }
    //         },
    //         {
    //             "$unwind": {
    //                 "path": "$foremen"
    //             }
    //         },
    //         {
    //             "$match": {
    //                 "foremen._id": {
    //                     "$in": foremanIds
    //                 }
    //             }
    //         },
    //         {
    //             "$group": {
    //                 "_id": {
    //                     "job_id": "$job_id",
    //                     "foremanName": "$foremen.name"
    //                 }
    //             }
    //         },
    //         {
    //             "$group": {
    //                 "_id": "$_id.foremanName",
    //                 "totalJobsPerForeman": {
    //                     "$sum": 1
    //                 }
    //             }
    //         },
    //         {
    //             "$sort": {
    //                 "_id": 1
    //             }
    //         }
    //     ];
    //
    //     let checkInsPerJobPipeline = [
    //         {
    //             "$match": {
    //                 "$and": [
    //                     {"checkInTime": {"$gte": dateFrom * 1000}},
    //                     {"checkInTime": {"$lt": dateTo * 1000}}
    //                 ]
    //             }
    //         },
    //         {
    //             "$unwind": {
    //                 "path": "$foremen"
    //             }
    //         },
    //         {
    //             "$match": {
    //                 "foremen._id": {
    //                     "$in": foremanIds
    //                 }
    //             }
    //         },
    //         {
    //             "$group": {
    //                 "_id": {
    //                     "job_id": "$job_id",
    //                     "foremanName": "$foremen.name"
    //                 },
    //                 "checkinsPerJobPerUser": {
    //                     "$sum": 1
    //                 }
    //             }
    //         },
    //         {
    //             "$group": {
    //                 "_id": "$_id.foremanName",
    //                 "checkinsPerJob": {
    //                     [groupByOperator]: "$checkinsPerJobPerUser"
    //                 }
    //             }
    //         },
    //         {
    //             "$sort": {
    //                 "_id": 1
    //             }
    //         }
    //     ];
    //
    //     let picturesPerJobPipeline = [
    //         {
    //             "$match": {
    //                 "$and": [
    //                     {"checkInTime": {"$gte": dateFrom * 1000}},
    //                     {"checkInTime": {"$lt": dateTo * 1000}}
    //                 ]
    //             }
    //         },
    //         {
    //             "$unwind": {
    //                 "path": "$foremen"
    //             }
    //         },
    //         {
    //             "$match": {
    //                 "foremen._id": {
    //                     "$in": foremanIds
    //                 }
    //             }
    //         },
    //         {
    //             "$group": {
    //                 "_id": {
    //                     "job_id": "$job_id",
    //                     "foremanName": "$foremen.name"
    //                 }
    //             }
    //         },
    //         {
    //             "$lookup": {
    //                 "from": "picture",
    //                 "localField": "_id.job_id",
    //                 "foreignField": "job_id",
    //                 "as": "picture"
    //             }
    //         },
    //         {$unwind: "$picture"},
    //         { $group:{
    //                 _id: "$name",
    //                 size: {$first : "$size"},
    //                 totalCount : {$sum: 1}
    //             }
    //         },
    //         {
    //             "$group": {
    //                 "_id": "$_id.foremanName",
    //                 "picturesPerJob": {
    //                     [groupByOperator]: "$totalCount"
    //                 }
    //             }
    //         },
    //         {
    //             "$sort": {
    //                 "_id": 1
    //             }
    //         }
    //     ];
    //
    //     let foremanNames = [];
    //     let totalJobsPerForeman = [];
    //     let checkinsPerJob = [];
    //     let picturesPerJob = [];
    //
    //     let collection = JobCheckIns.rawCollection();
    //     Promise.await(collection.aggregate(totalJobsPerForemanPipeline).toArray()).forEach(function (result) {
    //         foremanNames.push(result._id);
    //         totalJobsPerForeman.push(result.totalJobsPerForeman);
    //     });
    //
    //     Promise.await(collection.aggregate(checkInsPerJobPipeline).toArray()).forEach(function (result) {
    //         checkinsPerJob.push(result.checkinsPerJob);
    //     });
    //
    //     Promise.await(collection.aggregate(picturesPerJobPipeline).toArray()).forEach(function (result) {
    //         picturesPerJob.push(result.picturesPerJob);
    //     });
    //
    //     console.log(dateFrom + '|' + dateTo);
    //
    //     // Add the data needed for the response.
    //     let chartData = {
    //         labels: foremanNames,
    //         datasets: [{
    //             label: 'Jobs By foremen',
    //             fillColor: 'rgba(10,90,70,0.2)',
    //             strokeColor: 'rgba(20,20,80,1)',
    //             pointColor: 'rgba(220,220,220,1)',
    //             pointStrokeColor: '#000000',
    //             pointHighlightFill: '#000000',
    //             pointHighlightStroke: 'rgba(220,220,220,1)',
    //             data: totalJobsPerForeman
    //         }, {
    //             label: 'CheckIn\'s By Foremen',
    //             fillColor: 'rgba(220,20,20,0.2)',
    //             strokeColor: 'rgba(320,90,220,1)',
    //             pointColor: 'rgba(151,187,205,1)',
    //             pointStrokeColor: '#000000',
    //             pointHighlightFill: '#000000',
    //             pointHighlightStroke: 'rgba(151,187,205,1)',
    //             data: checkinsPerJob
    //         }, {
    //             label: 'Pictures\'s By Foremen',
    //             fillColor: 'rgba(72,96,255,0.2)',
    //             strokeColor: 'rgba(66,80,220,1)',
    //             pointColor: 'rgba(151,187,205,1)',
    //             pointStrokeColor: '#000000',
    //             pointHighlightFill: '#000000',
    //             pointHighlightStroke: 'rgba(151,187,205,1)',
    //             data: picturesPerJob
    //         }]
    //     };
    //
    //     // console.log(foremanNames);
    //     // console.log(totalJobsPerForeman);
    //     // console.log(avgCheckinsPerJob);
    //     // console.log(avgPicturesPerJob);
    //     // console.log('-------------------------------');
    //
    //     // console.log(chartData);
    //
    //     this.added('barChart', dateFrom + '|' + dateTo, chartData);
    //
    //     return this.ready();
    // });


//     Meteor.publish('jobCheckByForeman', function jobCheckInByForeman(foremanName) {
//         debugger;
//         let checkinsFound = JobCheckIns.find({'foremen': {$eleMatch: {'name': foremanName}}});
//         return checkinsFound;
//     });
}