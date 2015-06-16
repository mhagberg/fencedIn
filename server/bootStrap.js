//Meteor.startup(function () {
//
//  if (Address.find().count() === 0) {
//    Address.insert({
//      _id : "1",
//      address : "190 W 70 E",
//      address2 : "",
//      city : "Seattle",
//      zip : "97754"
//    });
//    Address.insert({
//      _id : "2",
//      address : "12 W 300 E",
//      address2 : "",
//      city : "Tacoma",
//      zip : "84041"
//    });
//    Address.insert({
//      _id : "3",
//      address : "1234 W 300 E",
//      address2 : "",
//      city : "Tacoma",
//      zip : "84041"
//    });
//    Address.insert({
//      _id : "4",
//      address : "1234 W 300 E",
//      address2 : "",
//      city : "Tacoma",
//      zip : "84041"
//    });
//    Address.insert({
//      _id : "5",
//      address : "1234 W 300 E",
//      address2 : "",
//      city : "Tacoma",
//      zip : "84041"
//    });
//  }
//
//  if (Customers.find().count() === 0) {
//    Customers.insert({
//      _id : "1",
//      name : "Sam Jones",
//      phone : "801-444-0021",
//      address_id : "1",
//      notes : "Long time Residential Customer"
//    });
//    Customers.insert({
//      _id : "2",
//      name : "Tim Dude",
//      phone : "801-444-0021",
//      address_id : "2",
//      notes : "wants it all for free"
//    });
//    Customers.insert({
//      _id : "3",
//      name : "Fed Mac",
//      phone : "801-444-0021",
//      address_id : "3",
//      notes : "Repeat customer"
//    });
//    Customers.insert({
//      _id : "4",
//      name : "Papa P",
//      phone : "801-444-0021",
//      address_id : "4",
//      notes : "Big Commercial contact"
//    });
//  }
//
//  if (Users.find().count() === 0) {
//
//    Users.insert(
//        {
//          _id : "5",
//          name : "Mike Hagberg",
//          email : "mike@secomaFence.com",
//          roles : ["admin", "foreman", "salesman"],
//          createDate : new Date(),
//          disableDate : null
//        });
//    Users.insert({
//          _id : "4",
//          name : "Nathan Hagberg",
//          email : "nathan@secomaFence.com",
//          roles : ["admin", "foreman", "salesman"],
//          createDate : new Date(),
//          disableDate : null
//        });
//    Users.insert({
//          _id : "3",
//          name : "Alyssa",
//          email : "Alyssa@secomaFence.com",
//          roles : ["admin", "foreman", "salesman"],
//          createDate : new Date(),
//          disableDate : null
//        });
//    Users.insert({
//          _id : "2",
//          name : "Russ",
//          email : "Russ@secomaFence.com",
//          roles : ["salesman"],
//          userId : "4",
//          createDate : new Date(),
//          disableDate : null
//        });
//    Users.insert({
//          _id : "1",
//          name : "Matt",
//          email : "matt@secomaFence.com",
//          roles : ["foreman"],
//          createDate : new Date(),
//          disableDate : null
//        });
//  }
//
//
//  if (JobCheckIns.find().count() === 0) {
//    JobCheckIns.insert({
//          _id:"1",
//          job_id : "1",
//          user_id : "1",
//          contactCustomer : true,
//          toolMaterials : true,
//          dailyPicture : true,
//          checkInTime: new Date(),
//          checkInLocation: "someGeoCode"
//        });
//    JobCheckIns.insert({
//          _id:"2",
//          job_id : "1",
//          user_id : "1",
//          contactCustomer : true,
//          toolMaterials : true,
//          dailyPicture : true,
//          checkInTime: new Date()+2,
//          checkInLocation: "someGeoCode"
//        });
//    JobCheckIns.insert({
//          _id:"3",
//          job_id : "1",
//          user_id : "1",
//          contactCustomer : true,
//          toolMaterials : true,
//          dailyPicture : true,
//          checkInTime: new Date()+3,
//          checkInLocation: "someGeoCode"
//        });
//    JobCheckIns.insert({
//          _id:"4",
//          job_id : "2",
//          user_id : "2",
//          contactCustomer : true,
//          toolMaterials : true,
//          dailyPicture : true,
//          checkInTime: new Date(),
//          checkInLocation: "someGeoCode"
//        });
//    JobCheckIns.insert({
//          _id:"5",
//          job_id : "2",
//          user_id : "2",
//          contactCustomer : true,
//          toolMaterials : true,
//          dailyPicture : true,
//          checkInTime: new Date(),
//          checkInLocation: "someGeoCode"
//        });
//    JobCheckIns.insert({
//          _id:"6",
//          job_id : "2",
//          user_id : "2",
//          contactCustomer : true,
//          toolMaterials : true,
//          dailyPicture : true,
//          checkInTime: new Date()+2,
//          checkInLocation: "someGeoCode"
//        });
//    JobCheckIns.insert({
//          _id:"7",
//          jobId : 3,
//          contactCustomer : true,
//          toolMaterials : true,
//          dailyPicture : true,
//          checkInTime: new Date()+3,
//          checkInLocation: "someGeoCode"
//        });
//    JobCheckIns.insert({
//            _id:"8",
//            job_id : "3",
//            user_id : "3",
//            contactCustomer : true,
//            toolMaterials : true,
//            dailyPicture : true,
//            checkInTime: new Date(),
//            checkInLocation: "someGeoCode"
//        });
//    JobCheckIns.insert({
//            _id:"9",
//            job_id : "4",
//            user_id : "4",
//            contactCustomer : true,
//            toolMaterials : true,
//            dailyPicture : true,
//            checkInTime: new Date(),
//            checkInLocation: "someGeoCode"
//        });
//    }
//
//  if (Jobs.find().count() === 0) {
//      Jobs.insert({
//          _id:"1",
//          name : "Smith",
//          estStartDate : new Date(),
//          estFinishDate : new Date() +30,
//          startDate : new Date() + 15,
//          finishDate : new Date + 25,
//          notes : "Rod Iron Fence, 2 Gates, 3 custom weds.",
//          type: "Residential"
//        });
//    Jobs.insert({
//          _id : "2",
//          name : "Big Tree Apartments",
//          estStartDate : new Date()+4,
//          estFinishDate : new Date() +39,
//          startDate : new Date() + 12,
//          finishDate : new Date + 44,
//          notes : "200 ft Rod Iron Fence, 1 Gates, 3 custom weds.",
//          type: "Commercial"
//        });
//    Jobs.insert({
//          _id : "3",
//          name : "Bellview School District",
//          estStartDate : new Date()+8,
//          estFinishDate : new Date() +33,
//          startDate : new Date() + 2,
//          finishDate : new Date + 46,
//          notes : "100 ft Rod Iron Fence, 7 Gates, 8 custom weds.",
//          type: "Commercial"
//        });
//    Jobs.insert({
//          _id : "4",
//          name : "Peterson",
//          estStartDate : new Date()+5,
//          estFinishDate : new Date() +53,
//          startDate : new Date() + 74,
//          finishDate : new Date + 156,
//          notes : "1222 ft Rod Iron Fence, 7 Gates, 8 custom weds.",
//          type: "Residential"
//        });
//    }
//  });