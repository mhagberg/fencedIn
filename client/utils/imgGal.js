UI.registerHelper("tagIsChecked", function(tagArray, expectedTag) {
    if (tagArray){
        if (tagArray.indexOf(expectedTag) !== -1){
            return "checked";
        }
    }
   return "";
});