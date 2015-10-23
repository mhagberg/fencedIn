var MENU_KEY = 'menuOpen';
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

Template.appBody.selectedForemenIds = function() {
  if ($('#filterByForemanSelector').find(':selected').length) {
    return $('#filterByForemanSelector').find(':selected').data().value;
  }
  return "";
};


Template.appBody.buildMeu = function () {
  var current = Router.current();
  var foremenIds = current.params.foremenId;
  if (foremenIds) {
    var jobs = Jobs.find({$and:[{hidden : null}, {'foremen._id':{$in:[foremenIds]}}]}, {sort : {createDate : -1, name : 1}}, {createDate : 1, name : 1},{limit:10});
  } else {
    var jobs = Jobs.find({hidden : null}, {sort : {createDate : -1, name : 1}}, {createDate : 1, name : 1}, {limit:50});
  }
  var jobCheckInCounts = {};
  jobs.forEach(function(job){
    jobCheckInCounts[job._id] = JobCheckIns.find({job_id : job._id}).count();
  });
  return {jobs: jobs, jobCheckInCounts: jobCheckInCounts};
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
    return Template.appBody.selectedForemenIds();
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

  'click #menu a': function() {
    Session.set(MENU_KEY, false);
  },
  'click .js-new-list': function() {
      Router.go('/jobNew/'+foremenFilterParam());
  },
  'change #filterByForemanSelector': function() {
    var current = Router.current();
    Router.go('/jobHistory/'+ current.params.job_id +'/'+ Template.appBody.selectedForemenIds());
  },

  'click .js-admin': function() {
    Router.go('admin');
  }
});
