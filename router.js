Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  //waitOn: function() {
  //  return [
  //    Meteor.subscribe('jobs')
  //  ];
  //}
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  if (!LaunchScreen.hidden) {
    dataReadyHold = LaunchScreen.hold();
  }
}

Router.map(function() {
  this.route('/jobEdit/:job_id', function() {
    var job = Jobs.findOne({_id: this.params.job_id});
    var jobEdit = {job : job};
    this.render('jobEdit', {data: function (){
      return jobEdit;
    } });
  });

  this.route('/checkInEdit/:checkIn_id', function() {
    var checkIn = JobCheckIns.findOne({_id: this.params.checkIn_id});
    var job = Jobs.findOne({_id: checkIn.job_id});
    var pictures = Pictures.find({checkin_id: checkIn._id});
    var checkInEdit = {checkIn : checkIn, job : job, pictures: pictures};
    this.render('checkInEdit', {data: function (){
      return checkInEdit;
    } });
  });

  this.route('/jobHistory/:job_id', function() {
    var job = Jobs.findOne({_id: this.params.job_id});
    var checkIns = JobCheckIns.find({job_id: this.params.job_id}, {sort: {checkInTime: -1}});
    var pictures = Pictures.find({job_id: this.params.job_id});
    var jobHistory = {job : job, checkIns : checkIns, pictures: pictures};
    this.render('jobHistory', {data: function (){
      return jobHistory;
    } });
  });

  this.route('/jobHistory/:job_id/:foremenIds', function() {
    var job = Jobs.findOne({_id: this.params.job_id});
    var foremenIds = this.params.foremenIds;
    var checkIns = JobCheckIns.find({job_id: this.params.job_id}, {sort: {checkInTime: -1}});
    var pictures = Pictures.find({job_id: this.params.job_id});
    var jobHistory = {job : job, checkIns : checkIns, pictures: pictures, foremen: foremenIds};
    this.render('jobHistory', {data: function (){
      return jobHistory;
    } });
  });


  this.route('/jobCheckIn/:job_id', function() {
    var checkIn = {job_id:this.params.job_id}
    delete Session.keys['previewImage'];
    this.render('jobCheckIn', {data: function() {
      return checkIn}
    });
  });

  this.route('home', {
    path: '/',
    action: function() {
      var job = Jobs.findOne({hidden:null}, {sort: {createDate: -1}});
      if (job) {
        Router.go('/jobHistory/' + job._id);
      } else
      {
        Router.go('/jobNew');
      }
  }});

  this.route('/jobNew');

  this.route('/salesmenList', function() {
    var salesmen = Salesman.find({disableDate : null});
    var data = {salesmen: salesmen};
    this.render('salesmenList', {data: function (){
      return data;
    } });
  });

  this.route('/salesmanForm');

  this.route('/salesmanForm/:salesman_id', function() {
    var salesman = Salesman.findOne({_id: this.params.salesman_id});
    this.render('salesmanForm', {data: function() {
      return salesman}
    });
  });

  this.route('/foremenList', function() {
    var foremen = Foreman.find({disableDate : null});
    var data = {foremen: foremen};
    this.render('foremenList', {data: function (){
      return data;
    } });
  });

  this.route('/foremanForm');

  this.route('/foremanForm/:foreman_id', function() {
    var foreman = Foreman.findOne({_id: this.params.foreman_id});
    this.render('foremanForm', {data: function() {
      return foreman}
    });
  });


  this.route('/fencersList', function() {
    var fencer = Fencer.find({disableDate : null});
    var data = {fencer: fencer};
    this.render('fencersList', {data: function (){
      return data;
    } });
  });

  this.route('/hiddenJobs', function() {
    var jobs = Jobs.find({hidden : true}, { name: 1, number: 1, createDate: 1, finishDate: 1}, {sort:{createDate:-1}});
    var data = {jobs: jobs};
    this.render('hiddenJobs', {data: function (){
      return data;
    } });
  });


  this.route('/fencerForm');

  this.route('/fencerForm/:fencer_id', function() {
    var fencer = Fencer.findOne({_id: this.params.fencer_id});
    this.render('fencerForm', {data: function() {
      return fencer}
    });
  });

  this.route('foremanSelect', {
    path: '/foremanSelect'
  });

  this.route('jobFinished', {
    path: '/jobFinished'
  });
  this.route('join');
  this.route('signin');

  this.route('admin', {
    path: '/admin'
  });
});