Template.jobStatus.events({
    'change .jobStatusChange': function (e) {
        e.preventDefault();
        let jobId = this._id;
        const finished = "Finished";
        if (this.status === event.target.value) {
            return
        }
        if (event.target.value === finished) {
            Jobs.update({_id: jobId},
              {
                  $set: {
                      finishDate: new Date().getTime(),
                      status: finished
                  }
              });
        } else {
            Jobs.update({_id: jobId},
              {
                  $set: {
                      status: event.target.value,
                      finishDate: null
                  }
              });
        }
    },
    'click .jobStatusBtn': function (e) {
        e.preventDefault();
        $('#searchText').val("");
        const val = $("#foremanFilter").val();
        const jobStatus = e.target.value;
        Session.set('jobStatus', jobStatus);
        if (val != "All")
        {
            Router.go('/admin/jobStatus/' + jobStatus + '/' + val);
        } else {
            Router.go('/admin/jobStatus/' + jobStatus);
        }
    },
    'change #foremanFilter': function (e) {
        e.preventDefault();
        $('#searchText').val("");
        const val = $("#foremanFilter").val();
        if (val != "All")
        {
            const jobStatus = Session.get('jobStatus');
            Router.go('/admin/jobStatus/' + jobStatus + '/' + val);
        } else {
           return;
        }
    },
    'keyup #searchText': function (e) {
        e.preventDefault();
        let jobSearchText = e.target.value;
        if (jobSearchText.length > 3) {
            Router.go('/admin/jobStatusSearch/' + jobSearchText);
        }
    },
    'click .jobCardLink': function (e) {
        e.preventDefault();
        Router.go('/jobHistory/' + this._id + '/');
    },
    'click #foremanSelector': function (e) {
        e.preventDefault();
        let jobId = this._id;
        let foremen = [];
        $('.foremanSelector'+jobId).find(':selected').each(function (i, selected) {
            foremen[i] = $(selected).data().value;
        });
        Jobs.update({_id: jobId},
          {
              $set: {
                  foremen: foremen
              }
          });
    }
});

Template.jobStatus.onRendered(function () {
    $('#content-container').css({
        'left': '0px',
        'position': '0px'
    });
    if (! Session.get('jobStatus')) {
        Session.set('jobStatus', 'Assigned');
    }
});
