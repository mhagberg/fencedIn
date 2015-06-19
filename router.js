Router.configure({
  layoutTemplate: 'adminNav',
  templateNameConverter: 'upperCamelCase'
});

Router.map(function() {
  this.route('jobs', {
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

  this.route('jobsMy', {
    path: '/jobsMy'
  });

  this.route('jobsUser', {
    path: '/jobsUser'
  });

  this.route('/jobHistory/:job_id', function() {
    var job = Jobs.findOne({_id: this.params.job_id});
    var address = Address.findOne({job_id: this.params.job_id});
    var checkIns = JobCheckIns.find({job_id: this.params.job_id}, {sort: {checkInTime: -1}});
    var jobHistory = {job : job, address : address, checkIns : checkIns};
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
    path: '/jobNew'
  });

  this.route('foremanSelect', {
    path: '/foremanSelect'
  });

  this.route('jobFinished', {
    path: '/jobFinished'
  });

});