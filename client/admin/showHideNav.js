Template.showHideNav.events({
    'click .showHideNav': function (e) {
        e.preventDefault();
        $('#content-container').css({
            'left': '270px',
            'position': 'absolute'
        });
        $('.showHideNav').hide();
    }
});
