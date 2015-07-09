var DateFormats = {
  inputDateTime: "YYYY-MM-DDTHH:mm:ss",
  inputDate: "YYYY-MM-DD",
  long: "ddd - MM/DD/YY"
};

// Use UI.registerHelper..
UI.registerHelper("formatDate", function(datetime, format) {
  if (!datetime) return "";
  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
});
