//Meteor.startup(function () {
//
//  if (Address.find().count() === 0) {
//    Address.insert({
//      _id : "1",
//      job_id: "1",
//      address1 : "190 W 70 E",
//      address2 : "",
//      city : "Seattle",
//      zip : "97754"
//    });
//  }
//
//  if (Foreman.find().count() === 0) {
//    var createDate = new Date().getTime();
//    Foreman.insert(
//        {
//          _id : "1",
//          name : "Don",
//          email : "don@secomaFence.com",
//          createDate : createDate,
//          disableDate : null
//        });
//    Foreman.insert({
//          _id : "2",
//          name : "Jay",
//          email : "jay@secomaFence.com",
//          createDate : createDate,
//          disableDate : null
//        });
//    Foreman.insert({
//          _id : "3",
//          name : "Matt",
//          email : "Matt@secomaFence.com",
//          createDate : createDate,
//          disableDate : null
//        });
//    Foreman.insert({
//      _id : "4",
//      name : "Nico",
//      email : "Nico@secomaFence.com",
//      createDate : createDate,
//      disableDate : null
//    });
//  }
//
//  if (Fencer.find().count() === 0) {
//    var createDate = new Date().getTime();
//    Fencer.insert(
//        {
//          _id : "1",
//          name : "Mark",
//          email : "mark@secomaFence.com",
//          createDate : createDate,
//          disableDate : null
//        });
//    Fencer.insert({
//      _id : "2",
//      name : "David",
//      email : "david@secomaFence.com",
//      createDate : createDate,
//      disableDate : null
//    });
//    Fencer.insert({
//      _id : "3",
//      name : "Brandon",
//      email : "Brandon@secomaFence.com",
//      createDate : createDate,
//      disableDate : null
//    });
//    Fencer.insert({
//      _id : "4",
//      name : "Trevor",
//      email : "Brandon@secomaFence.com",
//      createDate : createDate,
//      disableDate : null
//    });
//  }
//
//  if (Salesman.find().count() === 0) {
//    var createDate = new Date().getTime();
//    Salesman.insert(
//        {
//          _id : "1",
//          name : "Nathan",
//          email : "mark@secomaFence.com",
//          createDate : createDate,
//          disableDate : null
//        });
//    Salesman.insert({
//      _id : "2",
//      name : "Russ",
//      email : "david@secomaFence.com",
//      createDate : createDate,
//      disableDate : null
//    });
//  }
//
//  if (JobCheckIns.find().count() === 0) {
//    var checkInTime = new Date().getTime();
//    JobCheckIns.insert({
//          _id:"1",
//          job_id : "1",
//          foremen : [{
//                      _id : "2",
//                      name : "Jay",
//                      email : "jay@secomaFence.com",
//                      createDate : new Date().getTime(),
//                      disableDate : null
//                    }],
//          fencers : [{_id : "4",
//                     name : "Trevor",
//                     email : "Brandon@secomaFence.com",
//                     createDate : createDate,
//                     disableDate : null}],
//          loadTime: "15",
//          travelTime: "15",
//          notes: "I like this job",
//          addMaterials: "we need a big hammer",
//          contactCustomer : true,
//          toolsMaterials : true,
//          dailyPicture : true,
//          checkInTime: checkInTime,
//          checkInLocation: "someGeoCode"
//        });
//    }
//
//  if (Jobs.find().count() === 0) {
//    var createDate = new Date().getTime();
//      Jobs.insert({
//          _id:"1",
//          foremen:  [{
//            _id : "2",
//            name : "Jay",
//            email : "jay@secomaFence.com",
//            createDate : createDate,
//            disableDate : null
//          }],
//          salesmen: [
//            {
//              _id : "1",
//              name : "Nathan",
//              email : "mark@secomaFence.com",
//              createDate : createDate,
//              disableDate : null
//            }
//          ],
//          name : "Smith",
//          number: "nh1234",
//          address_id: "1",
//          createDate: new Date().getTime(),
//          estStartDate : createDate,
//          estFinishDate : createDate ,
//          startDate : createDate ,
//          finishDate : null,
//          notes : "Rod Iron Fence, 2 Gates, 3 custom weds.",
//          type: "Residential"
//        });
//    }
//
//  //****** This can be used to set Job foremen for jobs that aren't assigned by have checkins from a foreman
//  //if (Jobs.find({'foremen._id': {$exists:false}}).count()) {
//  //  var jobs = Jobs.find({'foremen._id': {$exists:false}});
//  //  jobs.forEach(function(job) {
//  //    var checkIn = JobCheckIns.findOne({$and:[{job_id:job._id}, {'foremen._id': {$exists:true}}]});
//  //    if (checkIn) {
//  //      var foreman = checkIn.foremen;
//  //      Jobs.update(
//  //          {_id : job._id},
//  //          {
//  //            $set : {
//  //              foremen:  [{
//  //                _id : foreman[0]._id,
//  //                name : foreman[0].name,
//  //                email : foreman[0].email,
//  //                createDate : foreman[0].createDate,
//  //                disableDate : foreman[0].disableDate
//  //              }]
//  //            }
//  //          });
//  //    }
//  //  });
//  //}
//
//
//});
//

//    //         Used to hide all old jobs.
//    //var jobs = Jobs.find();
//    //jobs.forEach(function(job) {
//    //  if (job.number < 16500) {
//    //    Jobs.update(
//    //        {_id : job._id},
//    //        {
//    //          $set : {finishDate : new Date().getTime()}
//    //        });
//    //  }
//    //});


// deleteing old checkins and jobs.
// var checkins = JobCheckIns.find();
// checkins.forEach(function(checkin) {
//     if (checkin.checkInTime < 1462097840000) {
//         JobCheckIns.remove({_id: checkin._id});
//     }
// });
//
// var jobs = Jobs.find();
// jobs.forEach(function(job) {
//     if (job.createDate < 1462097840000) {
//         Jobs.remove({_id: job._id});
//     }
// });