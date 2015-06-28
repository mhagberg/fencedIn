Template.checkInForm.helpers({
  isSelected : function (optionValue, value){
    if (optionValue === value)
      return 'selected';
    else
      return "";
  }
});