
UI.registerHelper("stringify", function(object) {
    if (object) {
      return EJSON.stringify(object);
    }
  return "";
});
