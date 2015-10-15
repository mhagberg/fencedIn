Meteor.startup(function () {

  if (Address.find().count() === 0) {
    Address.insert({
      _id : "1",
      job_id: "1",
      address1 : "190 W 70 E",
      address2 : "",
      city : "Seattle",
      zip : "97754"
    });
  }

  if (Foreman.find().count() === 0) {
    var createDate = new Date().getTime();
    Foreman.insert(
        {
          _id : "1",
          name : "Don",
          email : "don@secomaFence.com",
          createDate : createDate,
          disableDate : null
        });
    Foreman.insert({
          _id : "2",
          name : "Jay",
          email : "jay@secomaFence.com",
          createDate : createDate,
          disableDate : null
        });
    Foreman.insert({
          _id : "3",
          name : "Matt",
          email : "Matt@secomaFence.com",
          createDate : createDate,
          disableDate : null
        });
    Foreman.insert({
      _id : "4",
      name : "Nico",
      email : "Nico@secomaFence.com",
      createDate : createDate,
      disableDate : null
    });
  }

  if (Fencer.find().count() === 0) {
    var createDate = new Date().getTime();
    Fencer.insert(
        {
          _id : "1",
          name : "Mark",
          email : "mark@secomaFence.com",
          createDate : createDate,
          disableDate : null
        });
    Fencer.insert({
      _id : "2",
      name : "David",
      email : "david@secomaFence.com",
      createDate : createDate,
      disableDate : null
    });
    Fencer.insert({
      _id : "3",
      name : "Brandon",
      email : "Brandon@secomaFence.com",
      createDate : createDate,
      disableDate : null
    });
    Fencer.insert({
      _id : "4",
      name : "Trevor",
      email : "Brandon@secomaFence.com",
      createDate : createDate,
      disableDate : null
    });
  }

  if (Salesman.find().count() === 0) {
    var createDate = new Date().getTime();
    Salesman.insert(
        {
          _id : "1",
          name : "Nathan",
          email : "mark@secomaFence.com",
          createDate : createDate,
          disableDate : null
        });
    Salesman.insert({
      _id : "2",
      name : "Russ",
      email : "david@secomaFence.com",
      createDate : createDate,
      disableDate : null
    });
  }

  if (JobCheckIns.find().count() === 0) {
    var checkInTime = new Date().getTime();
    JobCheckIns.insert({
          _id:"1",
          job_id : "1",
          foremen : [{
                      _id : "2",
                      name : "Jay",
                      email : "jay@secomaFence.com",
                      createDate : new Date().getTime(),
                      disableDate : null
                    }],
          fencers : [{_id : "4",
                     name : "Trevor",
                     email : "Brandon@secomaFence.com",
                     createDate : createDate,
                     disableDate : null}],
          loadTime: "15",
          travelTime: "15",
          notes: "I like this job",
          addMaterials: "we need a big hammer",
          contactCustomer : true,
          toolsMaterials : true,
          dailyPicture : true,
          checkInTime: checkInTime,
          checkInLocation: "someGeoCode"
        });
    }

  if (Jobs.find().count() === 0) {
    var createDate = new Date().getTime();
      Jobs.insert({
          _id:"1",
          foremen:  [{
            _id : "2",
            name : "Jay",
            email : "jay@secomaFence.com",
            createDate : createDate,
            disableDate : null
          }],
          salesmen: [
            {
              _id : "1",
              name : "Nathan",
              email : "mark@secomaFence.com",
              createDate : createDate,
              disableDate : null
            }
          ],
          name : "Smith",
          number: "nh1234",
          address_id: "1",
          createDate: new Date().getTime(),
          estStartDate : createDate,
          estFinishDate : createDate ,
          startDate : createDate ,
          finishDate : null,
          notes : "Rod Iron Fence, 2 Gates, 3 custom weds.",
          type: "Residential"
        });
    }

  if (Jobs.find({billingContact: null}).count() !== 0) {
    var jobs = Jobs.find();
    jobs.forEach(function(job) {
      JobCheckIns.update(
          {_id : job._id},
          {
            $set : {
              billingContact : {
                name : "",
                phone : "",
                address : {
                  address1 : "",
                  address2 : "",
                  city : "",
                  state : "",
                  zip : ""
                }
              },
              locationContact : {
                name : "",
                phone : "",
                address : {
                  address1 : "",
                  address2 : "",
                  city : "",
                  state : "",
                  zip : ""
                }
              },
            }
          });
    });
  }


});

