var DateFormats = {
  inputDate: "YYYY-MM-DD",
  dateTimePicker: "MM-DD-YYYY-HH:mm:ss",
  long: "ddd - MM/DD/YY",
  numbers:  "MM/DD/YY"
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

1480143600
1480192734