// Use UI.registerHelper..
UI.registerHelper("modlo4", function(index) {
    if (index === 0)
        return false;
    return (index % 4) === 0;
});