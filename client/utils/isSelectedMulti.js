UI.registerHelper("isSelectedMulti", function(optionValue, objectValues) {
  var result = '';
  $(objectValues).each(function(){
    if (optionValue == this._id) {
      result = 'selected';
    }
  });
  return result;
});
