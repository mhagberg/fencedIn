Template.checkInReport.events({
    'click #jobReport': function (e) {
        e.preventDefault();
        Router.go('/jobReport/' + this.job_id);
    },
    'click .jobNumberLink': function (e) {
        e.preventDefault();
        Router.go('/jobHistory/' + this.job_id);
    },
});