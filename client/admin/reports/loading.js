Template.loading.onRendered(function () {
    setTimeout(render, 3000);
    function render() {
        Router.go('/admin/checkInPerJobByForeman/');
        console.log('going to try the page again.')
    }
});
