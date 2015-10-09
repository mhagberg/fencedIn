Template.fencerForm.events({
  'click #saveUpdate' : function(e) {
    e.preventDefault();
    if ($('#fencer_id').val()) {
      Fencer.update({_id : this._id},
          {
            $set : {
              name : $('#name').val(),
              email : $('#email').val()
            }
          });
    } else {
      Fencer.insert(
          {
            name : $('#name').val(),
            email : $('#email').val(),
            createDate : new Date()
          });
    }
    Router.go('/fencersList');
  }
});