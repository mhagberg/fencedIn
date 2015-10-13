Template.salesmanSelect.helpers({
  salesman : function() {
    return Salesman.find({disableDate : null});
  }
});
