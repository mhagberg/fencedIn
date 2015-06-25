Template.salesmanDisplay.helpers({
  salesman : function(salesmanId) {
    if (!salesmanId) return "";
    var salesGuy = Salesman.findOne({_id: salesmanId});
    return salesGuy.name;
  }
});