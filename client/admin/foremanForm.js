Template.foremanForm.events({
  'click #saveUpdate' : function(e) {
    e.preventDefault();
    if ($('#foreman_id').val()) {
      Foreman.update({_id : this._id},
          {
            $set : {
              name : $('#name').val(),
              email : $('#email').val()
            }
          });
    } else {
      Foreman.insert(
          {
            name : $('#name').val(),
            email : $('#email').val(),
            createDate : new Date().getTime()
          });
    }
    Router.go('/foremenList');
  }
});