import { Mongo } from 'meteor/mongo';
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('jobCheckIns', function jobCheckInPublication(job_id) {
        let jobCheckins = JobCheckIns.find({'job_id':job_id});
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
    Meteor.publish('barChartData', function getBarChartData(foremanIds, dateFrom, dateTo) {
        // debugger;
        let totalJobsPerForemanPipeline = [
            {
                "$match": {
                    "$and": [
                        {"checkInTime": {"$gte": dateFrom * 1000}},
                        {"checkInTime": {"$lt": dateTo * 1000}}
                    ]
                }
            },
            {
                "$unwind": {
                    "path": "$foremen"
                }
            },
            {
                "$match" : {
                    "foremen._id" : {
                        "$in" : foremanIds
                    }
                }
            },
            {
                "$group": {
                    "_id": {
                        "job_id": "$job_id",
                        "foremanName": "$foremen.name"
                    }
                }
            },
            {
                "$group": {
                    "_id": "$_id.foremanName",
                    "totalJobsPerForeman": {
                        "$sum": 1
                    }
                }
            },
            {
                "$sort": {
                    "_id": 1
                }
            }
        ];

        let avgCheckInsPerJobPipeline = [
            {
                "$match": {
                    "$and": [
                        {"checkInTime": {"$gte": dateFrom * 1000}},
                        {"checkInTime": {"$lt": dateTo * 1000}}
                    ]
                }
            },
            {
                "$unwind": {
                    "path": "$foremen"
                }
            },
            {
                "$match": {
                    "foremen._id" : {
                        "$in" : foremanIds
                    }
                }
            },
            {
                "$group": {
                    "_id": {
                        "job_id": "$job_id",
                        "foremanName": "$foremen.name"
                    },
                    "checkinsPerJobPerUser": {
                        "$sum": 1
                    }
                }
            },
            {
                "$group": {
                    "_id": "$_id.foremanName",
                    "avgCheckinsPerJob": {
                        "$avg": "$checkinsPerJobPerUser"
                    }
                }
            },
            {
                "$sort": {
                    "_id": 1
                }
            }
        ];

        let avgPicturesPerJobPipeline = [
            {
                "$match": {
                    "$and": [
                        {"checkInTime": {"$gte": dateFrom * 1000}},
                        {"checkInTime": {"$lt": dateTo * 1000}}
                    ]
                }
            },
            {
                "$unwind": {
                    "path": "$foremen"
                }
            },
            {
                "$match": {
                    "foremen._id" : {
                        "$in" : foremanIds
                    }
                }
            },
            {
                "$group": {
                    "_id": {
                        "job_id": "$job_id",
                        "foremanName": "$foremen.name"
                    }
                }
            },
            {
                "$lookup": {
                    "from": "picture",
                    "localField": "_id.job_id",
                    "foreignField": "job_id",
                    "as": "picture"
                }
            },
            {
                "$project": {
                    "pictureCount": {
                        "$size": "$picture"
                    }
                }
            },
            {
                "$group": {
                    "_id": "$_id.foremanName",
                    "avgPicturesPerJob": {
                        "$avg": "$pictureCount"
                    }
                }
            },
            {
                "$sort": {
                    "_id": 1
                }
            }
        ];

        let foremanNames = [];
        let totalJobsPerForeman = [];
        let avgCheckinsPerJob = [];
        let avgPicturesPerJob = [];

        let collection = JobCheckIns.rawCollection();
        Promise.await(collection.aggregate(totalJobsPerForemanPipeline).toArray()).forEach(function (result) {
            foremanNames.push(result._id);
            totalJobsPerForeman.push(result.totalJobsPerForeman);
        });

        Promise.await(collection.aggregate(avgCheckInsPerJobPipeline).toArray()).forEach(function (result) {
            avgCheckinsPerJob.push(result.avgCheckinsPerJob);
        });

        Promise.await(collection.aggregate(avgPicturesPerJobPipeline).toArray()).forEach(function (result) {
            avgPicturesPerJob.push(result.avgPicturesPerJob);
        });

        console.log(dateFrom + '|' + dateTo);

        // Add the data needed for the response.
        let chartData = {
            labels: foremanNames,
            datasets: [{
                label: 'Jobs By foremen',
                fillColor: 'rgba(10,90,70,0.2)',
                strokeColor: 'rgba(20,20,80,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#000000',
                pointHighlightFill: '#000000',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: totalJobsPerForeman
            }, {
                label: 'CheckIn\'s By Foremen',
                fillColor: 'rgba(220,20,20,0.2)',
                strokeColor: 'rgba(320,90,220,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#000000',
                pointHighlightFill: '#000000',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: avgCheckinsPerJob
            }, {
                label: 'Pictures\'s By Foremen',
                fillColor: 'rgba(72,96,255,0.2)',
                strokeColor: 'rgba(66,80,220,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#000000',
                pointHighlightFill: '#000000',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: avgPicturesPerJob
            }]
        };

        // console.log(foremanNames);
        // console.log(totalJobsPerForeman);
        // console.log(avgCheckinsPerJob);
        // console.log(avgPicturesPerJob);
        // console.log('-------------------------------');

        // console.log(chartData);

        this.added('barChart', dateFrom + '|' + dateTo, chartData);

        return this.ready();
    });


//     Meteor.publish('jobCheckByForeman', function jobCheckInByForeman(foremanName) {
//         debugger;
//         let checkinsFound = JobCheckIns.find({'foremen': {$eleMatch: {'name': foremanName}}});
//         return checkinsFound;
//     });
 }