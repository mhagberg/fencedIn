Template.foremenList.events({
  'click #newForeman' : function(e) {
    e.preventDefault();
    Router.go('/foremanForm');
  },
  'click .foreman-delete' : function(e) {
    e.preventDefault();
    Foreman.update({_id : this._id},
        {
          $set : {
            disableDate : new Date().getTime()
          }
        });
    Router.go('/foremenList');
  },
  'click .editLink' : function(e) {
    e.preventDefault();
    Router.go('/foremanForm/'+this._id);
  }

});