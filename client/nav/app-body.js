var MENU_KEY = 'menuOpen';
var JOB_LIMIT = 'jobLimit';
var FOREMAN_ID = 'foremanId';
var JOB_SEARCH_TEXT = 'jobSearchText';
Session.setDefault(MENU_KEY, false);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 5000;

Meteor.startup(function () {
  // set up a swipe left / right handler
  $(document.body).touchwipe({
    wipeLeft: function () {
      Session.set(MENU_KEY, false);
    },
    wipeRight: function () {
      Session.set(MENU_KEY, true);
    },
    preventDefaultEvents: false
  });

  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(function () {
    // Launch screen handle created in lib/router.js
    dataReadyHold.release();

    // Show the connection error box
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, CONNECTION_ISSUE_TIMEOUT);
});

Template.appBody.onRendered(function() {
  this.find('#content-container')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn(function () {
            LaunchScreen.hold().release();
        });
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }
  };
});

Template.appBody.selectedForemanId = function() {
  if ($('#filterByForemanSelector').find(':selected').length) {
    return $('#filterByForemanSelector').find(':selected').data().value;
  }
  return "";
};


Template.appBody.buildMeu = function () {
  var foremanId = Session.get(FOREMAN_ID) ? Session.get(FOREMAN_ID) : '';
  var jobLimit = Session.get(JOB_LIMIT) ? Session.get(JOB_LIMIT) : 5;
  var jobSearchText = Session.get(JOB_SEARCH_TEXT) ? Session.get(JOB_SEARCH_TEXT) : "";
  var regex = new RegExp(".*" + jobSearchText + ".*", "i");
  if (foremanId) {
    var jobs = Jobs.find({$and:[{hidden : null}, {'foremen._id':foremanId}, {$or:[{name:regex}, {number:regex}]}]}, {sort : {createDate : -1, name : 1}, limit:jobLimit}, {createDate : 1, name : 1});
  }
  else if (jobSearchText)
  {
    var jobs = Jobs.find({$or:[{name:regex}, {number:regex}]}, {sort : {createDate : -1, name : 1}, limit:jobLimit}, {createDate : 1, name : 1});
  }
  else {
    //var jobs = Jobs.find({hidden : null},  {limit:jobLimit}, {createDate : 1, name : 1});
    var jobs = Jobs.find({$and:[{hidden : null}, {'finishDate': null}]},  {limit:jobLimit}, {createDate : 1, name : 1});
  }
  var jobCheckInCounts = {};
  jobs.forEach(function(job){
    jobCheckInCounts[job._id] = JobCheckIns.find({job_id : job._id}).count();
  });
  return {jobs: jobs, jobCheckInCounts: jobCheckInCounts};
};

Template.appBody.clearFilters = function() {
  Session.set(JOB_SEARCH_TEXT, "");
  $('#jobSearch').val("");
  Session.set(JOB_LIMIT, 5);
  $('#limitJobs5').prop("checked", true);
  Session.set(FOREMAN_ID, "");
  $('#filterByForemanSelector').val("");
};



Template.appBody.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes. #each looks at the _id property of it's
  // items to know when to insert a new item and when to update an old one.
  thisArray: function() {
    return [this];
  },
  menuOpen: function() {
    return Session.get(MENU_KEY) && 'menu-open';
  },
  cordova: function() {
    return Meteor.isCordova && 'cordova';
  },
  userMenuOpen: function() {
    return Session.get(USER_MENU_KEY);
  },
  cordova: function() {
    return Meteor.isCordova && 'cordova';
  },
  jobsList: function() {
    return Template.appBody.buildMeu();
  },
  selectedForemen: function(){
    return Template.appBody.selectedForemanId();
  },
  jobCheckInCount: function(jobCheckInCounts, jobId) {
    if (jobCheckInCounts && jobId) {
      return jobCheckInCounts[jobId];
    }
    return false;
  },
  activeListClass: function() {
    var current = Router.current();
    if (current.route.name === 'listsShow' && current.params._id === this._id) {
      return 'active';
    }
  },
  connected: function() {
    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
      return Meteor.status().connected;
    } else {
      return true;
    }
  }
});

Template.appBody.events({
  'click .js-menu': function() {
    Session.set(MENU_KEY, ! Session.get(MENU_KEY));
  },

  'click .content-overlay': function(event) {
    Session.set(MENU_KEY, false);
    event.preventDefault();
  },
  'click input[name=limitJobs]': function(event) {
    Session.set(JOB_LIMIT,  Number(event.target.defaultValue));
    Template.appBody.buildMeu();
  },

  'click #menu a': function() {
    Session.set(MENU_KEY, false);
  },
  'click .js-new-list': function() {
      Router.go('/jobNew/'+foremenFilterParam());
  },
  'change #filterByForemanSelector': function() {
    Session.set(FOREMAN_ID, String(Template.appBody.selectedForemanId()));
    Template.appBody.buildMeu();
  },

  'keyup #jobSearch': function() {
    var jobSearchText = $('#jobSearch').val();
    if (jobSearchText.length > 3)
    {
      Session.set(JOB_SEARCH_TEXT, $('#jobSearch').val());
      Template.appBody.buildMeu();
    }
  },
  'click #search-btn': function() {
      Session.set(JOB_SEARCH_TEXT, $('#jobSearch').val());
      Template.appBody.buildMeu();
  },

  'click #clearFilters': function() {
    Template.appBody.clearFilters();
  },

  'click .js-admin': function() {
    Router.go('admin');
  }
});

