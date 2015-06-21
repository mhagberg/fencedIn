var DateFormats = {
  short: "DD MMMM - YYYY",
  long: "ddd - DD/MM/YY : h:mm a"
};

// Use UI.registerHelper..
UI.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
});