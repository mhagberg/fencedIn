Template.jobReports.events({
    'click #jobReport': function (e) {
        e.preventDefault();
        Router.go('/jobReport/' + this._id);
    },
    'click #un-finish': function (e) {
        Jobs.update({_id: this._id},
          {
              $set: {
                  finishDate: null,
              }
          })
        Router.go('/jobReports/');
    }
    });