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
    'click #toDo': function (e) {
        e.preventDefault();
        Router.go('/admin/jobsToDo/');
    },
    'click #assigned': function (e) {
        e.preventDefault();
        Router.go('/admin/jobsAssigned/');
    },
    'click #finished': function (e) {
        e.preventDefault();
        Router.go('/admin/jobsFinished/');
    },
    'click #canceled': function (e) {
        e.preventDefault();
        Router.go('/admin/jobsCanceled/');
    },
    'click #onHold': function (e) {
        e.preventDefault();
        Router.go('/admin/jobsOnHold/');
    },
    'click #paymentRequired': function (e) {
        e.preventDefault();
        Router.go('/admin/jobsPaymentRequired/');
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
