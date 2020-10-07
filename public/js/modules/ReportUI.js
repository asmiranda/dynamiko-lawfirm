class ReportUI {
    changeMainId(obj) {
    }

    doMainSearchData(evt) {
    }

    changeModule(evt) {
        reportUI.loadReportList("ReportUI");
    }

    init() {
        $("#dynamikoMainSearch").hide();
    }

    loadReportList(tabName) {
        console.log("loadReportList", tabName);
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ReportUI/getReports/${tabName}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            console.log(data);

            var divSelector = `select[module="ReportUI"][name="report"]`;
            $(divSelector).empty();
            $(divSelector).append(`<option value="">--</option>`);
            const groups = new Set();
            $(data).each(function (index, obj) {
                var group = obj.getProp("group");
                groups.add(group);
            });
            console.log(groups);

            for (let groupName of groups) {
                console.log(groupName);
                var str = `<optgroup label="${groupName}">`;
                $(data).each(function (index, obj) {
                    var group = obj.getProp("group");
                    if (group == groupName) {
                        var name = obj.getProp("name");
                        var title = obj.getProp("title");
                        str += `<option value="${name}">${title}</option>`;
                    }
                });
                str += `</optgroup>`;
                $(divSelector).append(str);
            }
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    downloadExcel(obj) {
        reportUI.runReport(obj, "xlsx");
    }

    displayReport(obj) {
        reportUI.runReport(obj, "pdf");
    }

    runReport(obj, reportType) {
        utils.showSpin();
        var divSelector = `select[module="ReportUI"][name="report"]`;
        var reportName = $(divSelector).val();
        var queryStr = "";
        $(".reportColumn").each(function (index, obj) {
            var checked = $(obj).is(":checked");
            if (checked) {
                var name = $(obj).attr("name");
                queryStr += `c_${name}=true&`;
            }
        });
        var displayReport = true;
        $(".reportParam").each(function (index, obj) {
            var paramName = $(obj).attr("paramName");
            var value = $(obj).val();
            var isRequired = $(obj).attr("isRequired");
            if (isRequired == "true" && value == "") {
                showModalAny.show("Required Report Parameter", `${paramName} is required.`);
                displayReport = false;
            }
            if (value != "") {
                var name = $(obj).attr("name");
                queryStr += `p_${name}=${value}&`;
            }
        });
        if (displayReport) {
            var dt = new Date();
            var milliSec = dt.getMilliseconds();
            console.log(queryStr);
            var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/pwidget/ReportUI/displayReport/${reportName}/${reportType}/${milliSec}?${queryStr}`;
            console.log(url);
            if (reportType == 'pdf') {
                $("#reportFrame").attr("src", url);
            }
            else {
                window.open(url, '_blank');
            }
        }
        utils.hideSpin();
    }

    changeParameters(obj) {
        console.log("changeParameters");
        var reportName = $(obj).val();
        console.log(`reportName == ${reportName}`);
        if (reportName != "") {
            var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ReportUI/getParameters/${reportName}`;
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");

            var successCallback = function (data) {
                console.log(data);
                var params = data.getProp("params");
                var columns = data.getProp("columns");
                var papers = data.getProp("papers");
                reportUI.arrangeReportParams(params);
                reportUI.arrangeReportColumnInclusion(columns);
                reportUI.arrangeReportPaperSizes(papers);

                $('.calendar').datepicker({
                    autoclose: true,
                    format: config.getDateFormat()
                });
                $('.calendarYear').datepicker({
                    autoclose: true,
                    format: "yyyy",
                    startView: 2,
                    minViewMode: 2,
                    maxViewMode: 2
                });
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        }
    }

    arrangeReportParams(params) {
        console.log(params);
        $(".reportParameters").empty();
        $(params).each(function (index, obj) {
            var title = obj.getProp("title");
            var name = obj.getProp("name");
            var type = obj.getProp("type");
            var required = obj.getProp("required");
            var dropDownLst = obj.getProp("dropDownLst");
            console.log(title, name, type, dropDownLst);
            var str = "";
            if (type == "STRING") {
                str = reportUI.createStringParam(name, title, required);
            }
            else if (type == "INT") {
                str = reportUI.createIntParam(name, title, required);
            }
            else if (type == "DOUBLE") {
                str = reportUI.createDoubleParam(name, title, required);
            }
            else if (type == "DATE") {
                str = reportUI.createDateParam(name, title, required);
            }
            else if (type == "DATEYEAR") {
                str = reportUI.createDateYearParam(name, title, required);
            }
            else if (type == "DROPDOWN") {
                str = reportUI.createDropDownParam(name, title, dropDownLst, required);
            }
            else if (type == "AUTOCOMPLETE") {
                str = reportUI.createAutoCompleteParam(name, title, required);
            }
            $(".reportParameters").append(str);
        });
    }

    arrangeReportColumnInclusion(columns) {
        console.log(columns);
        $(".reportColumns").empty();
        $(columns).each(function (index, obj) {
            var key = obj.getProp("key");
            var value = obj.getProp("value");
            console.log(key, value);
            var str = `
                <div class="form-group">
                    <label>
                        <input rowindex="0" module="ReportUI" name="${key}" class="reportColumn" type="checkbox">
                        ${value}
                    </label>
                </div>
            `;
            $(".reportColumns").append(str);
        });
    }

    arrangeReportPaperSizes(papers) {
        console.log(papers);
        $(".reportParam[name='paperSize']").empty();

        var selections = "";
        $(papers).each(function (index, obj) {
            var name = obj.getProp("name");
            var width = obj.getProp("width");
            var height = obj.getProp("height");
            var value = `${name} [${width} by ${height}]`;
            selections += `<option value="${name}" width="${width}" height="${height}">${value}</option>`;
        });
        $(".reportParam[name='paperSize']").append(selections);
    }

    createAutoCompleteParam(name, title, isRequired) {
        var str = `
            <div class="form-group" style="flex: 3; margin-left: 15px;">
                <label class="control-label">${isRequired ? "*" : ""}${title}</label>
                <div class="input-group" style="width: 100%;">

                    <div class="input-group">
                        <input rowindex="0" type="text" class="form-control autocomplete" name="${name}" placeholder="${title}" module="ReportUI" mainmodule="ReportUI" autoname="${name}" helptitle="${name}">
                        <span rowindex="0" autoname="${name}" module="ReportUI" class="btnAutoClearSelected input-group-addon" title="Clear Selected"><i class="fa fa-remove"></i></span>
                    </div>

                    <input isRequired="${isRequired}" paramName="${title}" rowindex="0" class="form-control reportParam HiddenAutoComplete" name="${name}" type="hidden" module="ReportUI" mainmodule="ReportUI" autonamefield="${name}" value="">
                    <div class="autocomplete-items" rowindex="0" module="ReportUI" mainmodule="ReportUI" autoname="${name}">
                    </div>
                </div>
            </div>
        `;
        return str;
    }

    createDropDownParam(name, title, dropDownLst, isRequired) {
        var selections = "";
        $(dropDownLst).each(function (index, obj) {
            var key = obj.getProp("key");
            var value = obj.getProp("value");
            selections += `<option value="${key}">${value}</option>`;
        });
        var str = `
            <div class="form-group" style="margin-left: 15px;">
                <label>${isRequired ? "*" : ""}${title}</label>
                <select isRequired="${isRequired}" paramName="${title}" class="form-control reportParam" rowindex="0" module="ReportUI" name="${name}">
                    <option></option>
                    ${selections}
                </select>
            </div>
        `;
        return str;
    }

    createDoubleParam(name, title, isRequired) {
        var str = `
            <div class="form-group" style="margin-left: 15px;">
                <label>${isRequired ? "*" : ""}${title}</label>
                <input isRequired="${isRequired}" paramName="${title}" type="text" rowindex="0" class="form-control reportParam" module="ReportUI" name="${name}" tabname="Report">
            </div>
        `;
        return str;
    }

    createStringParam(name, title, isRequired) {
        var str = `
            <div class="form-group" style="margin-left: 15px;">
                <label>${isRequired ? "*" : ""}${title}</label>
                <input isRequired="${isRequired}" paramName="${title}" type="text" rowindex="0" class="form-control reportParam" module="ReportUI" name="${name}" tabname="Report">
            </div>
        `;
        return str;
    }

    createIntParam(name, title, isRequired) {
        var str = `
            <div class="form-group" style="margin-left: 15px;">
                <label>${isRequired ? "*" : ""}${title}</label>
                <input isRequired="${isRequired}" paramName="${title}" type="text" rowindex="0" class="form-control reportParam" module="ReportUI" name="${name}" tabname="Report">
            </div>
        `;
        return str;
    }

    createDateParam(name, title, isRequired) {
        var str = `
            <div class="form-group" style="margin-left: 15px;">
                <label>${isRequired ? "*" : ""}${title}</label>
                <input isRequired="${isRequired}" paramName="${title}" type="text" rowindex="0" class="form-control calendar reportParam" module="ReportUI" name="${name}" tabname="Report">
            </div>
        `;
        return str;
    }

    createDateYearParam(name, title, isRequired) {
        var str = `
            <div class="form-group" style="margin-left: 15px;">
                <label>${isRequired ? "*" : ""}${title}</label>
                <input isRequired="${isRequired}" paramName="${title}" type="text" rowindex="0" class="form-control calendarYear reportParam" module="ReportUI" name="${name}" tabname="Report">
            </div>
        `;
        return str;
    }
}

$(function () {
    reportUI = new ReportUI();
})

