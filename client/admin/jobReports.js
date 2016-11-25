Template.jobReports.events({

});

Template.jobReports.events({
    'click #jobReport' : function(e) {
        e.preventDefault();
        Router.go('/admin/jobReport/'+this._id);
    }
});