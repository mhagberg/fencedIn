UI.registerHelper("isValidUser", function() {
    var validUser =false;
    if (!Meteor.user()){
        return validUser;
    }
    let useremail = Meteor.user().emails[0].address;

    var forman = Foreman.findOne({email: useremail});
    if (forman && forman.email === null){
        return validUser;
    }
    else {
        validUser = true
    }
    return validUser;
});