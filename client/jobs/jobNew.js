Meteor.methods({
createJob: function (){
  console.debug("saving address:");
  var address_Id = Address.insert(
        {
          address1: $('#address1').val(),
          address2: $('#address2').val(),
          city: $('#city').val(),
          zip: $('#zip').val()
        });
  console.debug("saving Job");
    Jobs.insert(
        {
          address_id: address_Id,
          user_id: $('#foremanSelector').val(),
          name : $('#name').val(),
          number: $('#number').val(),
          createDate: new Date(),
          estStartDate : $('#estStartDate').val(),
          estFinishDate : $('#estFinishDate').val(),
          startDate : $('#startDate').val(),
          finishDate : $('#finishDate').val(),
          notes : $('#notes').val(),
          type : $('#type').val()
        });
    Router.go('jobs');
  }
});

Template.jobNew.events({
  'click #createJob' : function(e) {
    e.preventDefault();
    Meteor.call('createJob', function(error){
      if (error)
        return console.error(error.reason);
    });
  }
});