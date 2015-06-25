var DateFormats = {
  inputDate: "YYYY-MM-DD",
  long: "ddd - MM/DD/YYYY : h:mm a"
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
