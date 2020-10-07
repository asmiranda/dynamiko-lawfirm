class DataVisualizer {
    constructor() {
        this.pivot;
        this.chart;
        this.serverData;
        this.slice;
    }

    showPivot() {
        var context = this;
        $("#content-main").empty();
        var str = `
            <div style="padding: 10px;">
                <div class="col-md-8">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <div class="form-group">
                                <label for="dataVisualizer" class="col-sm-2 control-label wdr-ui-element">
                                    <h3 class="box-title" style="margin: 7px;">Select Data</h3>
                                </label>
                                <div class="input-group col-sm-10" style="margin-left:2px;">
                                    <select id="dataVisualizer" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                        <div class="box-body">
                            <div id="wdr-component"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Data Visualization</h3>
                        </div>
                        <div class="box-body">
                            <div class="chartContainer">
                                <canvas id="wdr-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $("#content-main").append(str);
        $("#dataVisualizer").change(function () {
            context.updateData();
        });
        this.loadAllDataVisualizers();
        this.pivot = new WebDataRocks({
            container: "#wdr-component",
            beforetoolbarcreated: context.customizeToolbar,
            toolbar: true,
            reportcomplete: function () {
                $(".wdr-toolbar-group-right").css("padding-right", "10px");
                context.createChart();
            }
        });
    }

    customizeToolbar(toolbar) {
        var tabs = toolbar.getTabs(); // get all tabs from the toolbar
        toolbar.getTabs = function () {
            delete tabs[0];
            delete tabs[1];
            delete tabs[2];
            return tabs;
        }
    }

    updateData() {
        var val = $("#dataVisualizer").val();

        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/visualizer/' + val;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (vdata) {
            console.log(vdata);
            dataVisualizer.serverData = vdata;
            dataVisualizer.slice = vdata.chartSlice;
            dataVisualizer.pivot.updateData({
                data: vdata.data
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadAllDataVisualizers() {
        console.log("LOAD ALL VISUALIZERS...");

        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/visualizer/all';
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $("#dataVisualizer").empty();
            $("#dataVisualizer").append('<option value="">-- Select Data --</option>');
            $(data).each(function (index, obj) {
                $("#dataVisualizer").append('<option value="' + obj.name + '">' + obj.title + '</option>');
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    prepareDataFunction(rawData) {
        var result = {};
        var labels = [];
        var data = [];
        for (var i = 0; i < rawData.data.length; i++) {
            var record = rawData.data[i];
            if (record.r0 && record.c0 == undefined) {
                labels.push(record.r0);
                if (!isNaN(record.v0) && record.v0 > 0) {
                    data.push(record.v0.toFixed(2));
                }
                if (!isNaN(record.v1) && record.v1 > 0) {
                    data.push(record.v1.toFixed(2));
                }
            }
        }
        result.labels = labels;
        result.data = data;
        return result;
    }

    createChart() {
        var drawPolar = function (rawData) {
            dataVisualizer.drawPolar(rawData);
        };
        var rewritePolar = function (rawData) {
            dataVisualizer.chart.destroy();
            dataVisualizer.drawPolar(rawData);
        };

        var drawBar = function (rawData) {
            dataVisualizer.drawBar(rawData);
        };
        var rewriteBar = function (rawData) {
            dataVisualizer.chart.destroy();
            dataVisualizer.drawBar(rawData);
        };

        var drawPie = function (rawData) {
            dataVisualizer.drawPie(rawData);
        };
        var rewritePie = function (rawData) {
            dataVisualizer.chart.destroy();
            dataVisualizer.drawPie(rawData);
        };

        $("div.chartContainer").children().hide();
        $("div.chartContainer").empty();
        $("div.chartContainer").append('<canvas id="wdr-chart"></canvas>');

        if ($("#dataVisualizer").val() != "") {
            if (dataVisualizer.serverData.chartType == 'polarArea') {
                dataVisualizer.pivot.getData({
                    slice: dataVisualizer.slice,
                }, drawPolar, rewritePolar);
            }
            else if (dataVisualizer.serverData.chartType == 'pie' ||
                dataVisualizer.serverData.chartType == 'doughnut') {
                dataVisualizer.pivot.getData({
                    slice: dataVisualizer.slice,
                }, drawPie, rewritePie);
            }
            else if (dataVisualizer.serverData.chartType == 'bar' ||
                dataVisualizer.serverData.chartType == 'area' ||
                dataVisualizer.serverData.chartType == 'line') {
                dataVisualizer.pivot.getData({
                    slice: dataVisualizer.slice,
                }, drawBar, rewriteBar);
            }
        }
    }

    drawPie(rawData) {
        var ctx = document.getElementById("wdr-chart").getContext("2d");
        dataVisualizer.chart = new Chart(ctx, {
            data: dataVisualizer.getPieData(rawData),
            type: dataVisualizer.serverData.chartType,
            options: dataVisualizer.getLineChartOption()
        });
    }

    drawBar(rawData) {
        console.log(this.serverData);
        var ctx = document.getElementById("wdr-chart").getContext("2d");
        dataVisualizer.chart = new Chart(ctx, {
            data: dataVisualizer.getLineData(rawData),
            type: dataVisualizer.serverData.chartType,
            options: dataVisualizer.getLineChartOption()
        });
    }

    drawPolar(rawData) {
        console.log(dataVisualizer.serverData);
        var data = dataVisualizer.prepareDataFunction(rawData);
        var data_for_charts = {
            datasets: [{
                data: data.data,
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB",
                    "#9ccc65",
                    "#b3e5fc"
                ]
            }],
            labels: data.labels
        };
        var options = {
            responsive: true,
            legend: {
                position: dataVisualizer.serverData.legendPosition
            },
            scale: {
                ticks: {
                    beginAtZero: true
                },
                reverse: false
            },
            animation: {
                animateRotate: false,
                animateScale: true
            }
        };
        var ctx = document.getElementById("wdr-chart").getContext("2d");
        dataVisualizer.chart = new Chart(ctx, {
            data: data_for_charts,
            type: dataVisualizer.serverData.chartType,
            options: options
        });
    }

    getLineData(rawData) {
        var color = Chart.helpers.color;
        var data = this.prepareDataFunction(rawData);
        var lineChartData = {
            labels: data.labels,
            datasets: [
                {
                    backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                    borderColor: window.chartColors.red,
                    data: data.data
                },
            ]
        }
        return lineChartData;
    }

    getPieData(rawData) {
        var color = Chart.helpers.color;
        var data = this.prepareDataFunction(rawData);
        var lineChartData = {
            labels: data.labels,
            datasets: [
                {
                    backgroundColor: [
                        color(window.chartColors.red).alpha(0.5).rgbString(),
                        color(window.chartColors.orange).alpha(0.5).rgbString(),
                        color(window.chartColors.yellow).alpha(0.5).rgbString(),
                        color(window.chartColors.green).alpha(0.5).rgbString(),
                        color(window.chartColors.blue).alpha(0.5).rgbString(),
                    ],
                    data: data.data
                },
            ]
        }
        return lineChartData;
    }

    getLineChartOption() {
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
                position: dataVisualizer.serverData.legendPosition,
                labels: {
                    boxWidth: 20,
                    fontSize: 8,
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
        chartOptions.legend = false;
        return chartOptions;
    }

    getPieChartOption() {
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
            barStrokeWidth: 10,
            //Number - Spacing between each of the X value sets
            barValueSpacing: 5,
            //Number - Spacing between data sets within X values
            barDatasetSpacing: 1,
            //String - A legend template
            // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
            //Boolean - whether to make the chart responsive
            legend: {
                position: dataVisualizer.serverData.legendPosition,
                labels: {
                    boxWidth: 20,
                    fontSize: 8,
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
        return chartOptions;
    }
}
