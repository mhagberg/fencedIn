Template.foremanSelect.helpers({
  user : function() {
    return Users.find({}, {sort : {name : -1}});
  }
});