Template.jobNew.events({
  'click #createJob' : function(e) {
    e.preventDefault();
    console.debug("saving address:");
    var address_Id = Address.insert(
        {
          address1: $('#address1').val(),
          address2: $('#address2').val(),
          city: $('#city').val(),
          zip: $('#zip').val()
        });
    var jobId = Jobs.insert(
        {
          address_id: address_Id,
          foreman_id: $('#foremanSelector').val(),
          salesman_id: $('#salesmanSelector').val(),
          name : $('#name').val(),
          number: $('#number').val(),
          phone: $('#phone').val(),
          createDate: new Date(),
          estStartDate : $('#estStart').val(),
          estFinishDate : $('#estFinish').val(),
          notes : $('#notes').val(),
          type : $('#type').val()
        });
    Router.go('/jobHistory/'+jobId);
  }
});