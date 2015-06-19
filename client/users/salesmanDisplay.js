Template.salesmanDisplay.helpers({
  salesman : function(salesmanId) {
    foremanIconsole.debug('salesmanId'+ salesmanId);
    return Salesman.find({_id: salesmanId});
  }
});