Template.jobNew.events({
  'click #createJob' : function(e) {
    e.preventDefault();
    if ($('#name').val() && $('#number').val()) {
      var foremen = [];
      $('#foremanSelector').find(':selected').each(function(i, selected) {
        foremen[i] = $(selected).data().value;
      });
      var salesmen = [];
      $('#salesmanSelector').find(':selected').each(function(i, selected) {
        salesmen[i] = $(selected).data().value;
      });

      var jobId = Jobs.insert(
          {
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
            foremen : foremen,
            salesmen : salesmen,
            name : $('#name').val(),
            number : $('#number').val(),
            createDate : new Date().getTime(),
            estStartDate : $('#estStart').val(),
            estFinishDate : $('#estFinish').val(),
            notes : $('#notes').val(),
            type : $('#type').val()
          });
      Router.go('/jobHistory/' + jobId + '/' + foremenFilterParam());
    } else {
         $('#nameDiv').addClass("has-error");
         $('#numberDiv').addClass("has-error");
         $('#validationErrors').text("A new job must have a Name and a Job Number");
    }
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