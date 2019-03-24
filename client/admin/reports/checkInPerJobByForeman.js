import '../../../imports/api/jobCheckIns.js';

Template.checkInPerJobByForeman.onRendered(function () {

    // Set the options
    let options = {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve: true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };


    let dateTo = moment();
    let dateFrom = moment().subtract(7, 'd');
    let numNewLast7Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(30, 'd');
    let numNewLast30Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(60, 'd');
    dateTo = moment().subtract(30, 'd');
    let numNewLast60To30Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(90, 'd');
    dateTo = moment().subtract(60, 'd');
    let numNewLast90To60Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(120, 'd');
    dateTo = moment().subtract(90, 'd');
    let numNewLast120To90Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(150, 'd');
    dateTo = moment().subtract(120, 'd');
    let numNewLast150To120Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(180, 'd');
    dateTo = moment().subtract(150, 'd');
    let numNewLast180To150Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(210, 'd');
    dateTo = moment().subtract(180, 'd');
    let numNewLast210To180Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(240, 'd');
    dateTo = moment().subtract(210, 'd');
    let numNewLast240To210Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(270, 'd');
    dateTo = moment().subtract(240, 'd');
    let numNewLast270To240Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(300, 'd');
    dateTo = moment().subtract(270, 'd');
    let numNewLast300To270Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(330, 'd');
    dateTo = moment().subtract(300, 'd');
    let numNewLast330To300Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateFrom = moment().subtract(360, 'd');
    dateTo = moment().subtract(330, 'd');
    let numNewLast360To330Days = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    dateTo = moment().subtract(1, 'y');
    dateFrom = moment().subtract(7, 'd');
    dateFrom.subtract(1, 'y');
    let lastYearThisWeek = Jobs.find({$and: [{'createDate': {$gte: dateFrom.unix() * 1000}}, {'createDate': {$lt: dateTo.unix() * 1000}}]}).count();
    let newJobsData = {
        labels: ['Last 360-330', 'Last 330-300', 'Last 300-270', 'Last 270-240', 'Last 240-210', 'Last 210-180', 'Last 180-150', 'Last 150-120', 'Last 120-90', 'Last 90-60', 'Last 60-30', 'Last 30', 'Last 7', 'Last Year This Week'],
        datasets: [{
            label: "Checkins Per Job By Foremen",
            fillColor: "rgba(10,90,10,0.2)",
            strokeColor: "rgba(5,80,50,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#ff5d24",
            pointHighlightFill: "#1e20ff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [numNewLast360To330Days, numNewLast330To300Days, numNewLast300To270Days, numNewLast270To240Days, numNewLast240To210Days, numNewLast210To180Days, numNewLast180To150Days, numNewLast150To120Days, numNewLast120To90Days, numNewLast90To60Days, numNewLast60To30Days, numNewLast30Days, numNewLast7Days, lastYearThisWeek]
        }]
    };

    const BarChart = new Mongo.Collection('barChart');

    // Build bar chart for all time.
    dateTo = moment().endOf('day').unix();
    dateFrom = moment().startOf('day').subtract(100, 'years').unix();
    let foremanCheckInAllTimeData = BarChart.findOne(dateFrom + '|' + dateTo);

    // Build bar chart for last 30 days.
    dateFrom = moment().startOf('day').subtract(30, 'days').unix();
    let foremanCheckInLast30DaysData = BarChart.findOne(dateFrom + '|' + dateTo);

    // Build bar chart for yesterday.
    dateFrom = moment().startOf('day').subtract(1, 'days').unix();
    let foremanCheckInYesterdayData = BarChart.findOne(dateFrom + '|' + dateTo);

    let foremenCheckInYesterdayChart = document.getElementById("foremanCheckInsYesterday").getContext('2d');
    let foremenCheckInChart = document.getElementById("foremanCheckIns").getContext('2d');
    let newJobsChart = document.getElementById("newJobs").getContext('2d');
    let ctx = document.getElementById("avgCheckIn").getContext('2d');

    new Chart(foremenCheckInYesterdayChart).Bar(foremanCheckInYesterdayData, options);
    new Chart(foremenCheckInChart).Bar(foremanCheckInLast30DaysData, options);
    new Chart(newJobsChart).Line(newJobsData, options);
    new Chart(ctx).Bar(foremanCheckInAllTimeData, options);
})
;

