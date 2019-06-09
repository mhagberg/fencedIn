Template.jobEdit.events({
  'click #updateJob' : function(e) {
    e.preventDefault();
    let foremen = [];
    $('#foremanSelector').find(':selected').each(function(i, selected){
      foremen[i] = $(selected).data().value;
    });
    var salesmen = [];
    $('#salesmanSelector').find(':selected').each(function(i, selected){
      salesmen[i] = $(selected).data().value;
    });

    var jobId = $('#jobId').val();
    var estStart = convertToUnix($('#estStart').data("DateTimePicker").date());
    var startDate = convertToUnix($('#start').data("DateTimePicker").date());
    var estFinishDate = convertToUnix($('#estFinish').data("DateTimePicker").date());
    var finishDate = convertToUnix($('#finish').data("DateTimePicker").date());

    function convertToUnix(adate){
      if (adate)
      {
        return adate.valueOf();
      }
    };


    Jobs.update({_id: jobId},
        {
          $set :{
            billingContact : {
              name : $('#contactNameBilling').val(),
              phone : $('#contactPhoneBilling').val(),
              address : {
                address1 : $('#address1Billing').val(),
                address2 : $('#address2Billing').val(),
                city : $('#cityBilling').val(),
                state : $('#stateBilling').val(),
                zip : $('#zipBilling').val()
              }
            },
            locationContact : {
              name : $('#contactNameLocation').val(),
              phone : $('#contactPhoneLocation').val(),
              address : {
                address1 : $('#address1Location').val(),
                address2 : $('#address2Location').val(),
                city : $('#cityLocation').val(),
                state : $('#stateLocation').val(),
                zip : $('#zipLocation').val()
              }
            },
            foremen: foremen,
            salesmen: salesmen,
            name : $('#name').val(),
            number: $('#number').val(),
            estStartDate : estStart,
            startDate : startDate,
            estFinishDate : estFinishDate,
            finishDate : finishDate,
            notes : $('#notes').val(),
            type : $('#type').val()
          }
        });
    Router.go('/jobHistory/'+jobId+'/'+foremenFilterParam());
  },
  'click #copyContactInfoBtn' : function(e) {
    e.preventDefault();
    $('#contactNameLocation').val($('#contactNameBilling').val());
    $('#contactPhoneLocation').val($('#contactPhoneBilling').val());
    $('#address1Location').val($('#address1Billing').val());
    $('#address2Location').val($('#address2Billing').val());
    $('#cityLocation').val($('#cityBilling').val());
    $('#stateLocation').val($('#stateBilling').val());
    $('#zipLocation').val($('#zipBilling').val());
  }
});
