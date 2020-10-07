class MyReportViewer {
    displayReportViewer() {
        $("#content-main").empty();
        var str = `
        <div style="padding: 10px; height: 100%; min-height: 100%;">
            <div class="box box-primary" style="height: 100%; min-height: 100%;">
                <div class="box-header with-border">
                    <div class="col-md-2 reportViewerTitle">
                        Report Viewer
                    </div>
                    <div class="pull-right box-tools">
                    <div class="btn-group">
                        <button type="button" class="btn btn-info btnWf">Choose Report</button>
                        <button type="button" class="btn btn-info dropdown-toggle btnWf" data-toggle="dropdown" aria-expanded="true">
                            <span class="caret"></span>
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu reportViewerList" role="menu" aria-labelledby="dropdownMenu">
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="box-body" style="height: 100%; min-height: 100%;">
                    <div class="row" style="height: 100%; min-height: 100%;">
                        <div class="col-md-9" style="height: 100%; min-height: 100%;">
                            <iframe id="reportViewerFrame" src="" style="width: 100%; height:650px;"></iframe>
                        </div>
                        <div class="col-md-3">
                            <form id="reportViewerFormCriteria">
                                <input type="hidden"></input>
                                <div class="box-body formCriteriaBody">
                                </div>
                                <div class="box-footer">
                                    <button type="button" class="btn btn-info center-block btnSubmitReportCriteria" reportName="">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        $("#content-main").append(str);
        myReportViewer.loadAllReports();
    }

    displayReportPdf(obj) {
        var reportName = $(obj).attr("reportName");

        var vdata = $("#reportViewerFormCriteria").serialize();
        console.log(vdata);

        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/pcustomreports/' + reportName + "/run?" + vdata;
        $("#reportViewerFrame").attr("src", url);
    }

    displayReportPage(obj) {
        var val = $(obj).attr("value");
        var label = $(obj).attr("label");
        $(".reportViewerTitle").html(label);
        $(".btnSubmitReportCriteria").attr("reportName", val);

        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/customreports/' + val;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".formCriteriaBody").empty();
            $(".formCriteriaBody").append(data);

            reportLoader.init();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadAllReports() {
        console.log("LOAD ALL REPORTS...");

        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/customreports/all';
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $("#reportViewerList").empty();
            $(data).each(function (index, obj) {
                var code = obj.getProp("name");
                var name = obj.getProp("title");

                var str = `<li class="myReportViewer ${code}" value="${code}" label="${name}"><a href="#" style="padding: 3px 20px;"><i class="fa fa-gears"> ${name}</i></a></li>`;
                $(".reportViewerList").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }
}
