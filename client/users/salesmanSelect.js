Template.salesmanSelect.helpers({
  salesman : function() {
    return Salesman.find();
  }
});

Template.salesmanSelect.helpers({
  isSelected : function(salesmanId) {
    if (Salesman.findOne({_id: salesmanId}).length)
      return "selected";
    else return "";
  }
});