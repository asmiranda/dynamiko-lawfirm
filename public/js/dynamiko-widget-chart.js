class WidgetChartRule {
    constructor() {
        this.clickCallback;
    }

    chartFullScreen(btn) {
        var myChart = $(btn).attr("chart");
        $(myChart).fullScreen(true);
    }

    doChart(ecanvas, data, chartType, clickCallback) {
        widgetChartRule.clickCallback = clickCallback;
        if (chartType=='BAR') {
            widgetChartRule.doVerticalBarChart(ecanvas, data);
        }
        if (chartType=='STACKED_BAR') {
            widgetChartRule.doVerticalStackedBarChart(ecanvas, data);
        }
        else if (chartType=='HORIZONTALBAR') {
            widgetChartRule.doHorizontalBarChart(ecanvas, data);
        }
        else if (chartType=='STACKED_HORIZONTALBAR') {
            widgetChartRule.doHorizontalStackedBarChart(ecanvas, data);
        }
        else if (chartType=='LINE') {
            widgetChartRule.doLineChart(ecanvas, data);
        }
        else if (chartType=='AREA') {
            widgetChartRule.doAreaChart(ecanvas, data);
        }
        else {
            widgetChartRule.doPieChart(ecanvas, data);
        }
    }

    doAreaChart(ecanvas, data) {
        var lineChartCanvas = $(ecanvas).get(0).getContext('2d')

        var chartData = data.chartData;
        var lineChartData = widgetChartRule.getLineData(chartData);
        var chartOptions = widgetChartRule.getChartOption(chartData);
        var areaChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: lineChartData,
            options: chartOptions
        });
    }

    doLineChart(ecanvas, data) {
        var lineChartCanvas = $(ecanvas).get(0).getContext('2d')

        var chartData = data.chartData;
        var lineChartData = widgetChartRule.getLineData(chartData);
        var chartOptions = widgetChartRule.getChartOption(chartData);
        var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: lineChartData,
            options: chartOptions
        });
    }

    doVerticalBarChart(ecanvas, data) {
        widgetChartRule.doBarChart(ecanvas, data, "bar");
    }

    doVerticalStackedBarChart(ecanvas, data) {
        widgetChartRule.doStackedBarChart(ecanvas, data, "bar");
    }

    doHorizontalBarChart(ecanvas, data) {
        widgetChartRule.doBarChart(ecanvas, data, "horizontalBar");
    }

    doHorizontalStackedBarChart(ecanvas, data) {
        widgetChartRule.doStackedBarChart(ecanvas, data, "horizontalBar");
    }

    doBarChart(ecanvas, data, orientation) {
        var lineChartCanvas = $(ecanvas).get(0).getContext('2d')

        var chartData = data.chartData;
        var lineChartData = widgetChartRule.getLineData(chartData);
        var chartOptions = widgetChartRule.getChartOption(chartData);
        var barChart = new Chart(lineChartCanvas, {
            type: orientation,
            data: lineChartData,
            options: chartOptions
        });
    }

    doStackedBarChart(ecanvas, data, orientation) {
        var lineChartCanvas = $(ecanvas).get(0).getContext('2d')

        var chartData = data.chartData;
        var lineChartData = widgetChartRule.getLineData(chartData);
        var chartOptions = widgetChartRule.getStackedChartOption(chartData);
        var barChart = new Chart(lineChartCanvas, {
            type: orientation,
            data: lineChartData,
            options: chartOptions
        });
    }

    doPieChart(ecanvas, data) {
        var pieChartCanvas = $(ecanvas).get(0).getContext('2d')

        var chartData = data.chartData;
        var color = Chart.helpers.color;
        var pieChartData = {
            labels: chartData.horizontalLabels,
            datasets: [
                {
                    label: chartData.label1,
                    backgroundColor: [
                        color(window.chartColors.red).alpha(0.5).rgbString(),
                        color(window.chartColors.orange).alpha(0.5).rgbString(),
                        color(window.chartColors.yellow).alpha(0.5).rgbString(),
                        color(window.chartColors.green).alpha(0.5).rgbString(),
                        color(window.chartColors.blue).alpha(0.5).rgbString(),
                    ],
                    data: chartData.data1
                }
            ]
        }
        if (chartData.label2) {
            pieChartData.datasets.push({
                label: chartData.label2,
                backgroundColor: [
                    color(window.chartColors.red).alpha(0.5).rgbString(),
                    color(window.chartColors.orange).alpha(0.5).rgbString(),
                    color(window.chartColors.yellow).alpha(0.5).rgbString(),
                    color(window.chartColors.green).alpha(0.5).rgbString(),
                    color(window.chartColors.blue).alpha(0.5).rgbString(),
                ],
                data: chartData.data2
            });
        }
        if (chartData.label3) {
            pieChartData.datasets.push({
                label: chartData.label3,
                backgroundColor: [
                    color(window.chartColors.red).alpha(0.5).rgbString(),
                    color(window.chartColors.orange).alpha(0.5).rgbString(),
                    color(window.chartColors.yellow).alpha(0.5).rgbString(),
                    color(window.chartColors.green).alpha(0.5).rgbString(),
                    color(window.chartColors.blue).alpha(0.5).rgbString(),
                ],
                data: chartData.data3
            });
        }
        var chartOptions = widgetChartRule.getChartOption();
        var pieChart = new Chart(pieChartCanvas, {
            type: 'doughnut',
            data: pieChartData,
            options: chartOptions
        });
    }

    getLineData(chartData) {
        var color = Chart.helpers.color;
        var lineChartData = {
            labels: chartData.horizontalLabels,
            datasets: [
                {
                    label: chartData.label1,
                    backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                    borderColor: window.chartColors.red,
                    data: chartData.data1
                },
            ]
        }
        if (chartData.label2) {
            lineChartData.datasets.push({
                label: chartData.label2,
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                data: chartData.data2
            });
        }
        if (chartData.label3) {
            lineChartData.datasets.push({
                label: chartData.label3,
                backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
                borderColor: window.chartColors.green,
                data: chartData.data3
            });
        }
        return lineChartData;
    }

    getChartOption(chartData) {
        var chartOptions = {
            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero: true,
            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,
            //String - Colour of the grid lines
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            //Number - Width of the grid lines
            scaleGridLineWidth: 1,
            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,
            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,
            //Boolean - If there is a stroke on each bar
            barShowStroke: true,
            //Number - Pixel width of the bar stroke
            barStrokeWidth: 2,
            //Number - Spacing between each of the X value sets
            barValueSpacing: 5,
            //Number - Spacing between data sets within X values
            barDatasetSpacing: 1,
            //String - A legend template
            // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
            //Boolean - whether to make the chart responsive
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 20,
                    fontSize: 8,
                }
            },
            onClick: widgetChartRule.clickCallback,
            responsive: true,
            maintainAspectRatio: true
        }
        if (chartData && !chartData.label2) {
            chartOptions.legend.display = false;
        }
        return chartOptions;
    }

    getStackedChartOption(chartData) {
        var chartOptions = {
            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero: true,
            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,
            //String - Colour of the grid lines
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            //Number - Width of the grid lines
            scaleGridLineWidth: 1,
            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,
            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,
            //Boolean - If there is a stroke on each bar
            barShowStroke: true,
            //Number - Pixel width of the bar stroke
            barStrokeWidth: 2,
            //Number - Spacing between each of the X value sets
            barValueSpacing: 5,
            //Number - Spacing between data sets within X values
            barDatasetSpacing: 1,
            //String - A legend template
            // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
            //Boolean - whether to make the chart responsive
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 20,
                    fontSize: 8,
                }
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            },
            onClick: widgetChartRule.clickCallback,
            maintainAspectRatio: true
        }
        if (chartData && !chartData.label2) {
            chartOptions.legend.display = false;
        }
        return chartOptions;
    }
}
