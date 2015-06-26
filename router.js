//Router.configure({
//  layoutTemplate: 'appBody',
//  templateNameConverter: 'upperCamelCase'
//});

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
  //    Meteor.subscribe('publicLists'),
  //    Meteor.subscribe('privateLists')
  //  ];
  //}
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function() {
  this.route('/jobEdit/:job_id', function() {
    var job = Jobs.findOne({_id: this.params.job_id});
    var address = Address.findOne({_id: job.address_id});
    var jobEdit = {job : job, address : address};
    this.render('jobEdit', {data: function (){
      return jobEdit;
    } });
  });

  this.route('/jobHistory/:job_id', function() {
    var job = Jobs.findOne({_id: this.params.job_id});
    var address = Address.findOne({job_id: this.params.job_id});
    var checkIns = JobCheckIns.find({job_id: this.params.job_id}, {sort: {checkInTime: -1}});
    var foreman = Foreman.findOne({_id: job.foreman_id});
    var salesman = Salesman.findOne({_id: job.salesman_id});
    var jobHistory = {job : job, address : address, checkIns : checkIns, foreman: foreman, salesman: salesman};
    this.render('jobHistory', {data: function (){
      return jobHistory;
    } });
  });

  this.route('/jobCheckIn/:job_id', function() {
    this.render('jobCheckIn', {
      data: function() {return Jobs.findOne({_id: this.params.job_id})
    }});
  });

  this.route('jobNew', {
    path: '/'
  });

  this.route('foremanSelect', {
    path: '/foremanSelect'
  });

  this.route('jobFinished', {
    path: '/jobFinished'
  });
  this.route('join');
  this.route('signin');

});