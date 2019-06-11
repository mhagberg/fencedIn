Router.configure({
    // we use the  appBody template to define the layout for the entire app
    layoutTemplate: 'appBody',

    // the appNotFound template is used for unknown routes and missing lists
    notFoundTemplate: 'appNotFound',

    // show the appLoading template whilst the subscriptions below load their data
    loadingTemplate: 'appLoading',

});

dataReadyHold = null;

if (Meteor.isClient) {
    // Keep showing the launch screen on mobile devices until we have loaded
    // the app's data
    if (!LaunchScreen.hidden) {
        dataReadyHold = LaunchScreen.hold();
    }
    Meteor.subscribe('salesmen');
    Meteor.subscribe('foremen');
    Meteor.subscribe('fencers');
}

Router.jobEdit = function (rout, job_id, foremenId) {

    var job = Jobs.findOne({_id: job_id});
    var jobEdit = {job: job, foremen: foremenId};
    rout.render('jobEdit', {
        data: function () {
            return jobEdit;
        }
    });
};

Router.jobReport = function (rout, job_id) {
    Meteor.subscribe('jobPictures', job_id);
    Meteor.subscribe('oneJob', job_id);
    Meteor.subscribe('jobCheckInsByJobId', job_id);
    var job = Jobs.findOne({_id: job_id});
    var pictures = Pictures.find({job_id: job_id});
    var jobReport = {job: job, pictures: pictures};
    rout.render('jobReport', {
        data: function () {
            return jobReport;
        }
    });
};

Router.map(function () {
    this.route('/jobEdit/:job_id', function () {
        return Router.jobEdit(this, this.params.job_id, "");
    });
    this.route('/admin/jobReport/:job_id', function () {
        return Router.jobReport(this, this.params.job_id, "");
    });
    this.route('/jobEdit/:job_id/:foremenId', function () {
        return Router.jobEdit(this, this.params.job_id, this.params.foremenId);
    });
    this.route('/checkInEdit/:checkIn_id', function () {
        return Router.checkIn(this, this.params.checkIn_id);
    });
    this.route('/checkInEdit/:checkIn_id/:foremenId', function () {
        return Router.checkIn(this, this.params.checkIn_id, this.params.foremenId);
    });
    this.route('/jobHistory/:job_id', function () {
          return Router.jobHistory(this, this.params.job_id, "")
      }
    );
    this.route('/jobHistory/:job_id/:foremenId', function () {
          return Router.jobHistory(this, this.params.job_id, this.params.foremenId);
      }
    );
    this.route('/admin/imagesGallery/', function () {
          return Router.imagesGallery(this)
      }
    );
    this.route('/admin/imageByTag/', function () {
          return Router.imageByTag(this)
      }
    );
    this.route('/jobDetails/:job_id', function () {
        return Router.jobDetails(this, this.params.job_id, "")
    });
    this.route('/jobCheckIn/:job_id', function () {
        return Router.jobCheckIn(this, this.params.job_id, "")
    });
    this.route('/jobCheckIn/:job_id/:foremenId', function () {
        return Router.jobCheckIn(this, this.params.job_id, this.params.foremenId)
    });

    this.route('/admin/checkInPerJobByForeman/', function () {
          return Router.checkInPerJobByForeman(this)
      }
    );
    this.route('home', {
        path: '/',
        action: function () {
            Router.go('/jobNew/' + foremenFilterParam());
        }
    });
    this.route('/jobNew');
    this.route('/admin/reports/loading');
    this.route('/jobPictureView');
    this.route('/jobNew/:foremenId', function () {
        var data = {foremen: this.params.foremenId};
        this.render('jobNew', {
            data: function () {
                return data;
            }
        });
    });

    this.route('/salesmenList', function () {
        var salesmen = Salesman.find({disableDate: null});
        var data = {salesmen: salesmen};
        this.render('salesmenList', {
            data: function () {
                return data;
            }
        });
    });

    this.route('/salesmanForm');

    this.route('/salesmanForm/:salesman_id', function () {
        var salesman = Salesman.findOne({_id: this.params.salesman_id});
        this.render('salesmanForm', {
            data: function () {
                return salesman
            }
        });
    });

    this.route('/foremenList', function () {
        var foremen = Foreman.find({disableDate: null});
        var data = {foremen: foremen};
        this.render('foremenList', {
            data: function () {
                return data;
            }
        });
    });

    this.route('/foremanForm');

    this.route('/foremanForm/:foreman_id', function () {
        var foreman = Foreman.findOne({_id: this.params.foreman_id});
        this.render('foremanForm', {
            data: function () {
                return foreman
            }
        });
    });


    this.route('/fencersList', function () {
        var fencer = Fencer.find({disableDate: null});
        var data = {fencer: fencer};
        this.render('fencersList', {
            data: function () {
                return data;
            }
        });
    });

    this.route('/jobReports', function () {
        Meteor.subscribe('job_Reports');
        var jobs = Jobs.find({'finishDate': {$exists: true, $ne: ""}}, {sort: {'finishDate': -1}}, {
            name: 1,
            number: 1,
            createDate: 1,
            finishDate: 1
        });
        var data = {jobs: jobs};
        this.render('jobReports', {
            data: function () {
                return data;
            }
        });
    });

    let loadingNoData = function () {
        this.render('jobStatus', {
            data: function () {
                return {};
            }
        });
    };

    let loadJobsStatusWithData = function (status) {
        let jobsByStatus = Jobs.find({"status": {"$eq": status}}, {sort: {"number": -1}});
        const allForemen = Foreman.find({});
        let data = {jobsByStatus: jobsByStatus, statusTitle: status, foreman: allForemen};
        this.render('jobStatus', {
            data: function () {
                return data;
            }
        });
    };

    this.route('/admin/jobsAssigned', function () {
        let jobsAssigned = Meteor.subscribe('jobsAssigned');
        if (jobsAssigned.ready()) {
            loadJobsStatusWithData.call(this,"Assigned");
        } else {
            loadingNoData.call(this);
        }
    });

    this.route('/admin/jobsToDo/', function () {
        let jobsToDo = Meteor.subscribe('jobsToDo');
        if (jobsToDo.ready()) {
            loadJobsStatusWithData.call(this, "To Do");
        } else {
            loadingNoData.call(this);
        }
    });



    this.route('/admin/jobsFinished/', function () {
        let jobsFinished = Meteor.subscribe('jobsFinished');
        if (jobsFinished.ready()) {
            loadJobsStatusWithData.call(this, "Finished");
        } else {
            loadingNoData.call(this);
        }
    });


    this.route('/admin/jobsCanceled/', function () {
        let jobsCanceled = Meteor.subscribe('jobsCanceled');
        if (jobsCanceled.ready()) {
            loadJobsStatusWithData.call(this, "Canceled");
        } else {
            loadingNoData.call(this);
        }
    });

    this.route('/admin/jobsOnHold/', function () {
        let jobsOnHold = Meteor.subscribe('jobsOnHold');
        if (jobsOnHold.ready()) {
            loadJobsStatusWithData.call(this, "On Hold");
        } else {
            loadingNoData.call(this);
        }
    });

    this.route('/admin/jobsPaymentRequired/', function () {
        let jobsPaymentRequired = Meteor.subscribe('jobsPaymentRequired');
        if (jobsPaymentRequired.ready()) {
            loadJobsStatusWithData.call(this, "Payment Required");
        } else {
            loadingNoData.call(this);
        }
    });

    this.route('/fencerForm');

    this.route('/fencerForm/:fencer_id', function () {
        var fencer = Fencer.findOne({_id: this.params.fencer_id});
        this.render('fencerForm', {
            data: function () {
                return fencer
            }
        });
    });

    this.route('foremanSelect', {
        path: '/foremanSelect'
    });

    this.route('jobFinished', {
        path: '/jobFinished'
    });

    this.route('admin', {
        path: '/admin'
    });
});

Router.checkIn = function (rout, checkIn_id, foremenId) {
    Meteor.subscribe('jobCheckInId', checkIn_id);
    var checkIn = JobCheckIns.findOne({_id: checkIn_id});
    var job = Jobs.findOne({_id: checkIn.job_id});
    var pictures = Pictures.find({checkin_id: checkIn_id});
    var checkInEdit = {checkIn: checkIn, job: job, pictures: pictures, foremen: foremenId};
    rout.render('checkInEdit', {
        data: function () {
            return checkInEdit;
        }
    });
};

Router.imagesGallery = function (rout) {
    Meteor.subscribe('recentImagesPipeLine');
    var pictures = RecentImages.find({}, {sort: {"createDate": -1}});
    var returnPictures = {pictures: pictures};
    rout.render('imagesGallery', {
        data: function () {
            return returnPictures;
        }
    });
};

Router.imageByTag = function (rout) {
    Meteor.subscribe('chainLinkPics');
    var chainLinkPics = Pictures.find({"tags": {$elemMatch: {$eq: "Chain Link"}}}, {
        "_id": 1,
        "createDate": 1,
        "image": 1,
        "job_id": 1,
        "tags": 1
    }, {sort: {"createDate": -1}});
    Meteor.subscribe('wooodPics');
    var wooodPics = Pictures.find({"tags": {$elemMatch: {$eq: "Wood"}}}, {
        "_id": 1,
        "createDate": 1,
        "image": 1,
        "job_id": 1,
        "tags": 1
    }, {sort: {"createDate": -1}});
    Meteor.subscribe('vinylPics');
    var vinylPics = Pictures.find({"tags": {$elemMatch: {$eq: "Vinyl"}}}, {
        "_id": 1,
        "createDate": 1,
        "image": 1,
        "job_id": 1,
        "tags": 1
    }, {sort: {"createDate": -1}});
    Meteor.subscribe('ornamntalIronPics');
    var ornamntalIronPics = Pictures.find({"tags": {$elemMatch: {$eq: "Ornamental Iron"}}}, {
        "_id": 1,
        "createDate": 1,
        "image": 1,
        "job_id": 1,
        "tags": 1
    }, {sort: {"createDate": -1}});
    Meteor.subscribe('otherPics');
    var otherPics = Pictures.find({"tags": {$elemMatch: {$eq: "Other"}}}, {
        "_id": 1,
        "createDate": 1,
        "image": 1,
        "job_id": 1,
        "tags": 1
    }, {sort: {"createDate": -1}});
    rout.render('imageByTag', {
        data: function () {
            return {
                chainLinkPics: chainLinkPics,
                woodPics: wooodPics,
                vinylPics: vinylPics,
                ornamentalIronPics: ornamntalIronPics,
                otherPics: otherPics
            };
            ;
        }
    });
};

Router.jobHistory = function (rout, job_id, foremenId) {
    Meteor.subscribe('jobPictures', job_id);
    Meteor.subscribe('jobCheckIns', job_id);
    var job = Jobs.findOne({_id: job_id});
    var checkIns = JobCheckIns.find({job_id: job_id}, {sort: {checkInTime: -1}});
    var pictures = Pictures.find({job_id: job_id});
    var jobHistory = {job: job, checkIns: checkIns, pictures: pictures, foremen: foremenId};
    rout.render('jobHistory', {
        data: function () {
            return jobHistory
        }
    });
};


Router.jobCheckIn = function (rout, job_id, foremenId) {
    Meteor.subscribe('jobPictures', job_id);
    Meteor.subscribe('jobCheckIns', job_id);
    delete Session.keys['previewImage'];
    var checkIn = {job_id: job_id, foremen: foremenId}
    rout.render('jobCheckIn', {
        data: function () {
            return checkIn
        }
    });
};


Router.checkInPerJobByForeman = function (rout) {
    // Prep the data needed for the
    let foremanIdResults = Foreman.find({disableDate: null}, {fields: {_id: 1}}).fetch();
    let foremanIds = [];
    foremanIdResults.forEach(function (result) {
        foremanIds.push(result._id);
    });

    // Prep bar chart data for all time.
    let dateTo = moment().endOf('day').unix();
    let dateFrom = moment().startOf('day').subtract(100, 'years').unix();
    let allTimeSubscription = Meteor.subscribe('barChartData', foremanIds, dateFrom, dateTo, "$avg");
    // Prep bar chart data for last 30 days.
    dateFrom = moment().startOf('day').subtract(30, 'days').unix();
    let last30DaysSubscription = Meteor.subscribe('barChartData', foremanIds, dateFrom, dateTo, "$sum");
    // Prep bar chart data for yesterday.
    dateFrom = moment().startOf('day').subtract(1, 'days').unix();
    let yesterdaySubscription = Meteor.subscribe('barChartData', foremanIds, dateFrom, dateTo, "$sum");
    let allJobs = Meteor.subscribe('allJobs');

    if (allTimeSubscription.ready() && last30DaysSubscription.ready() && yesterdaySubscription.ready() && allJobs.ready()) {
        rout.render('checkInPerJobByForeman', {
            data: function () {
                return {};
            }
        });
    } else {
        rout.render('loading');
    }
};

Router.jobDetails = function (rout, job_id, foremenId) {
    Meteor.subscribe('jobPictures', job_id);
    Meteor.subscribe('jobCheckIns', job_id);
    delete Session.keys['previewImage'];
    var job = Jobs.findOne({_id: job_id});
    var checkIns = JobCheckIns.find({job_id: job_id}, {sort: {checkInTime: -1}});
    var pictures = Pictures.find({job_id: job_id});
    var jobHistory = {job: job, checkIns: checkIns, pictures: pictures, foremen: foremenId};
    rout.render('jobDetails', {
        data: function () {
            return jobHistory;
        }
    });
};