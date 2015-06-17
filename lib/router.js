Router.configure({
  layoutTemplate: 'adminNav',
  templateNameConverter: 'upperCamelCase'
});

Router.map(function() {
  this.route('adminNav', {
    path: '/'
  });

  this.route('leadsNew', {
    path: '/leadsNew'
  });

  this.route('leadsMy', {
    path: '/leadsMy'
  });

  this.route('leadsUser', {
    path: '/leadsUser'
  });

  this.route('jobs', {
    path: '/jobs'
  });

  this.route('jobsMy', {
    path: '/jobsMy'
  });

  this.route('jobsUser', {
    path: '/jobsUser'
  });

  this.route('jobHistory', {
    path: '/jobHistory'
  });

  this.route('jobCheckIn', {
    path: '/jobCheckIn'
  });

  this.route('jobNew', {
    path: '/jobNew'
  });

  this.route('foremanSelect', {
    path: '/foremanSelect'
  });

  this.route('jobFinished', {
    path: '/jobFinished'
  });

});