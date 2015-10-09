Template.salesmenList.events({
  'click #newSalesman' : function(e) {
    e.preventDefault();
    Router.go('/salesmanForm');
  },
  'click .salesman-delete' : function(e) {
    e.preventDefault();
    Salesman.update({_id : this._id},
        {
          $set : {
            disableDate : new Date()
          }
        });
    Router.go('/salesmenList');
  },
  'click .editLink' : function(e) {
    e.preventDefault();
    Router.go('/salesmanForm/'+this._id);
  }

});