Meteor.startup(function () {

  if (Address.find().count() === 0) {
    Address.insert({
      _id : "1",
      address1 : "190 W 70 E",
      address2 : "",
      city : "Seattle",
      zip : "97754"
    });
    Address.insert({
      _id : "2",
      address1 : "12 W 300 E",
      address2 : "",
      city : "Tacoma",
      zip : "84041"
    });
    Address.insert({
      _id : "3",
      address1 : "1234 W 300 E",
      address2 : "",
      city : "Tacoma",
      zip : "84041"
    });
    Address.insert({
      _id : "4",
      address1 : "1234 W 300 E",
      address2 : "",
      city : "Tacoma",
      zip : "84041"
    });
    Address.insert({
      _id : "5",
      address1 : "1234 W 300 E",
      address2 : "",
      city : "Tacoma",
      zip : "84041"
    });
  }

  if (Customers.find().count() === 0) {
    Customers.insert({
      _id : "1",
      name : "Sam Jones",
      phone : "801-444-0021",
      address_id : "1",
      notes : "Long time Residential Customer"
    });
    Customers.insert({
      _id : "2",
      name : "Tim Dude",
      phone : "801-444-0021",
      address_id : "2",
      notes : "wants it all for free"
    });
    Customers.insert({
      _id : "3",
      name : "Fed Mac",
      phone : "801-444-0021",
      address_id : "3",
      notes : "Repeat customer"
    });
    Customers.insert({
      _id : "4",
      name : "Papa P",
      phone : "801-444-0021",
      address_id : "4",
      notes : "Big Commercial contact"
    });
  }


  if (Users.find().count() === 0) {
    var createDate = new Date();
    Users.insert(
        {
          _id : "5",
          name : "Mike Hagberg",
          email : "mike@secomaFence.com",
          roles : ["admin", "foreman", "salesman"],
          createDate : createDate.setDate(createDate.getDate + 5),
          disableDate : null
        });
    Users.insert({
          _id : "4",
          name : "Nathan Hagberg",
          email : "nathan@secomaFence.com",
          roles : ["admin", "foreman", "salesman"],
          createDate : createDate,
          disableDate : null
        });
    Users.insert({
          _id : "3",
          name : "Alyssa",
          email : "Alyssa@secomaFence.com",
          roles : ["admin", "foreman", "salesman"],
          createDate : createDate,
          disableDate : null
        });
    Users.insert({
          _id : "2",
          name : "Russ",
          email : "Russ@secomaFence.com",
          roles : ["salesman"],
          userId : "4",
          createDate : createDate,
          disableDate : null
        });
    Users.insert({
          _id : "1",
          name : "Matt",
          email : "matt@secomaFence.com",
          roles : ["foreman"],
          createDate : createDate,
          disableDate : null
        });
  }


  if (JobCheckIns.find().count() === 0) {
    var checkInTime = new Date();
    JobCheckIns.insert({
          _id:"1",
          job_id : "1",
          user_id : "1",
          contactCustomer : true,
          toolsMaterials : true,
          dailyPicture : true,
          checkInTime: checkInTime,
          checkInLocation: "someGeoCode"
        });
    //JobCheckIns.insert({
    //      _id:"2",
    //      job_id : "1",
    //      user_id : "1",
    //      contactCustomer : true,
    //      toolsMaterials : true,
    //      dailyPicture : true,
    //      checkInTime : checkInTime.setDate(checkInTime.getDate() + 5),
    //      checkInLocation: "someGeoCode"
    //    });
    //JobCheckIns.insert({
    //      _id:"3",
    //      job_id : "1",
    //      user_id : "1",
    //      contactCustomer : true,
    //      toolsMaterials : true,
    //      dailyPicture : true,
    //      checkInTime: checkInTime,
    //      checkInLocation: "someGeoCode"
    //    });
    //JobCheckIns.insert({
    //      _id:"4",
    //      job_id : "2",
    //      user_id : "2",
    //      contactCustomer : true,
    //      toolsMaterials : true,
    //      dailyPicture : true,
    //      checkInTime: checkInTime,
    //      checkInLocation: "someGeoCode"
    //    });
    }

  if (Jobs.find().count() === 0) {
    var createDate = new Date();
      Jobs.insert({
          _id:"1",
          user_id: "1",
          name : "Smith",
          number: "nh1234",
          address_id: "1",
          createDate: new Date(),
          estStartDate : createDate,
          estFinishDate : createDate ,
          startDate : createDate ,
          finishDate : createDate.setDate(createDate.getDate()+5),
          notes : "Rod Iron Fence, 2 Gates, 3 custom weds.",
          type: "Residential"
        });
    Jobs.insert({
          _id : "2",
          user_id: "2",
          name : "Big Tree Apartments",
					number: "nh1234",
          address_id: "2",
          createDate: new Date(),
          estStartDate : createDate,
          estFinishDate : createDate ,
          startDate : createDate ,
          finishDate : createDate.setDate(createDate.getDate()+33),
          notes : "200 ft Rod Iron Fence, 1 Gates, 3 custom weds.",
          type: "Commercial"
        });
    Jobs.insert({
          _id : "3",
          user_id: "3",
          name : "Bellview School District",
          number: "nh1234",
          address_id: "3",
          createDate: new Date(),
          estStartDate : createDate,
          estFinishDate : createDate ,
          startDate : createDate ,
          finishDate : createDate.setDate(createDate.getDate()+22) ,
          notes : "100 ft Rod Iron Fence, 7 Gates, 8 custom weds.",
          type: "Commercial"
        });
    Jobs.insert({
          _id : "4",
          user_id: "1",
          name : "Peterson",
          number: "nh1234",
          address_id: "4",
          createDate: new Date(),
          estStartDate : createDate,
          estFinishDate : createDate ,
          startDate : createDate ,
          finishDate : createDate.setDate(createDate.getDate()+55),
          notes : "1222 ft Rod Iron Fence, 7 Gates, 8 custom weds.",
          type: "Residential"
        });
    }
  });