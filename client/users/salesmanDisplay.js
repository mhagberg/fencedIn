Template.salesmanDisplay.helpers({
  salesman : function(salesmanId) {
    var salesGuy = Salesman.findOne({_id: salesmanId});
    return salesGuy.name;
  }
});