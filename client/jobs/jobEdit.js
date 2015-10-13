Template.jobEdit.events({
  'click #updateJob' : function(e) {
    e.preventDefault();
    var addressId = $('#addressId').val();
    Address.update({_id: addressId}, {
        $set : {
          address1 : $('#address1').val(),
          address2 : $('#address2').val(),
          city : $('#city').val(),
          zip : $('#zip').val()
        }
    });

    var foremen = [];
    $('#foremanSelector').find(':selected').each(function(i, selected){
      foremen[i] = $(selected).data().value;
    });
    var salesmen = [];
    $('#salesmanSelector').find(':selected').each(function(i, selected){
      salesmen[i] = $(selected).data().value;
    });

    var jobId = $('#jobId').val();
    Jobs.update({_id: jobId},
        {
          $set :{
            address_id: addressId,
            foremen: foremen,
            salesmen: salesmen,
            name : $('#name').val(),
            number: $('#number').val(),
            phone: $('#phone').val(),
            estStartDate : $('#estStart').val(),
            startDate : $('#start').val(),
            estFinishDate : $('#estFinish').val(),
            finishDate : $('#finish').val(),
            notes : $('#notes').val(),
            type : $('#type').val()
          }
        });
    Router.go('/jobHistory/'+jobId);
  }
});
