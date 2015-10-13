Template.jobNew.events({
  'click #createJob' : function(e) {
    e.preventDefault();
    var address_Id = Address.insert(
        {
          address1: $('#address1').val(),
          address2: $('#address2').val(),
          city: $('#city').val(),
          zip: $('#zip').val()
        });

    var foremen = [];
    $('#foremanSelector').find(':selected').each(function(i, selected){
      foremen[i] = $(selected).data().value;
    });
    var salesmen = [];
    $('#salesmanSelector').find(':selected').each(function(i, selected){
      salesmen[i] = $(selected).data().value;
    });

    var jobId = Jobs.insert(
        {
          address_id: address_Id,
          foremen: foremen,
          salesmen: salesmen,
          name : $('#name').val(),
          number: $('#number').val(),
          phone: $('#phone').val(),
          createDate: new Date().getTime(),
          estStartDate : $('#estStart').val(),
          estFinishDate : $('#estFinish').val(),
          notes : $('#notes').val(),
          type : $('#type').val()
        });
    Router.go('/jobHistory/'+jobId);
  }
});