Template.salesmanForm.events({
  'click #saveUpdate' : function(e) {
    e.preventDefault();
    if ($('#salesman_id').val()) {
      Salesman.update({_id : this._id},
          {
            $set : {
              name : $('#name').val(),
              email : $('#email').val()
            }
          });
    } else {
      Salesman.insert(
          {
            name : $('#name').val(),
            email : $('#email').val(),
            createDate : new Date().getTime()
          });
    }
    Router.go('/salesmenList');
  }
});