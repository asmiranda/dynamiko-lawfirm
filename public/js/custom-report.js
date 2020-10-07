class CustomReport {
    customAutoDisplayModalReport(obj) {
        console.log("customAutoDisplayModalReport");
        var moduleName = $(obj).attr("module");
        var reportName = $(obj).attr("report");
        var reportRecordId = $(obj).attr("recordId");
        var reportCriteria = {};
        reportCriteria["recordId"] = storage.getModuleId();
        reportCriteria["reportRecordId"] = reportRecordId;
        console.log(reportCriteria);

        var vdata = JSON.stringify(reportCriteria);
        console.log(vdata);
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/customReport/${moduleName}/${reportName}/post`;
        var successCallback = function (data_url) {
            var iframeViewer = `iframe.customReportViewerFrame[report='AutoReport']`;
            console.log(iframeViewer);
            document.querySelector(iframeViewer).src = data_url;
        };
        ajaxCaller.loadPostBytes(successCallback, url, vdata);
    }

    customDisplayModalReport(obj) {
        var moduleName = $(obj).attr("module");
        var reportName = $(obj).attr("report");
        var allSelect = `select.customReportReloadableSelect[module="${moduleName}"][report="${reportName}"]`;
        console.log(allSelect);
        console.log("reload ");
        console.log(this);
        console.log("Main ID == " + storage.getModuleId());

        var iframeViewer = `iframe.customReportViewerFrame[report='${reportName}']`;
        console.log(iframeViewer);
        document.querySelector(iframeViewer).src = "";

        $(allSelect).each(function (index) {
            var currentSelect = this;
            var inputName = $(this).attr("name");

            var myData = {};
            myData["action"] = "loadSelect";
            myData["report"] = reportName;
            myData["inputName"] = inputName;
            myData["recordId"] = storage.getModuleId();

            var vdata = JSON.stringify(myData);
            console.log(vdata);
            var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/${moduleName}/post`;
            var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
            var successCallback = function (data) {
                $(currentSelect).empty();
                console.log(data);
                $(data).each(function (ind) {
                    var optionId = this.getProp("id");
                    var optionDisplay = this.getProp("recordTitle");
                    var opt = `<option value='${optionId}'>${optionDisplay}</option>`;
                    $(currentSelect).append(opt);
                });
            };
            ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
        });
    }

    customReportToggleCriteria(obj) {
        console.log("btnCustomReportToggleCriteria");
        var reportName = $(obj).attr("reportName");
        var myCustomReportCriteria = $(`.myCustomReportCriteria[reportName='${reportName}']`);
        if ($(myCustomReportCriteria).is(":visible")) {
            $(myCustomReportCriteria).hide();
        } else {
            $(myCustomReportCriteria).show();
        }
    }

    customReportFullScreen(obj) {
        console.log("customReportFullScreen");
        var reportName = $(obj).attr("report");
        var iframeViewer = `iframe.customReportViewerFrame[report='${reportName}']`;
        $(iframeViewer).fullScreen(true);
    }

    customReportRun(obj) {
        console.log("customReportRun");
        var moduleName = $(obj).attr("module");
        var reportName = $(obj).attr("report");
        var reportCriteria = {};
        var reportCriteriaSelectors = `.reportCriteriaInput[module='${moduleName}'][report='${reportName}']`;
        console.log(reportCriteriaSelectors);
        $(reportCriteriaSelectors).each(function (index) {
            var name = $(this).attr("name");
            var value = $(this).val();
            reportCriteria[name] = value;
        });
        reportCriteria["recordId"] = storage.getModuleId();
        console.log(reportCriteria);

        var vdata = JSON.stringify(reportCriteria);
        console.log(vdata);
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/customReport/${moduleName}/${reportName}/post`;
        ajaxCaller.ajaxPost(url, function (data_url) {
            var iframeViewer = `iframe.customReportViewerFrame[report='${reportName}']`;
            console.log(iframeViewer);
            document.querySelector(iframeViewer).src = data_url;
        }, vdata);
    }
}
