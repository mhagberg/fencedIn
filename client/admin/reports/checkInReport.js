Template.checkInReport.events({
    'click #jobReport': function (e) {
        e.preventDefault();
        Router.go('/jobReport/' + this.job_id);
    },
    'click #un-finish': function (e) {
        Jobs.update({_id: this.job_id},
            {
                $set: {
                    finishDate: null,
                }
            });
        Router.go('/jobReports/');
    }
});