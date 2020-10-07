class AbstractSubUI {
    constructor(moduleName) {
        this.moduleName = moduleName;
        this.selectSearchRecord = "selectSearchRecord";
        this.AcctTransactionGLEditorUI = "AcctTransactionGLEditorUI";
        this.GeneralLedgerEditorUI = "GeneralLedgerEditorUI";

        var context = this;
        this.initSearchFilterListener(context);
        this.initSearchSubRecordFilterListener(context);
        this.initSubRecordListener(context);
        this.initReportListener(context);
        this.initGlEntryListener(context);

        $(document).on('click', `.selectSearchRecord[module="${context.moduleName}"]`, function () {
            context.loadRecordProfile(this);
        });
        $(document).on('click', `.btnNewRecord[module="${context.moduleName}"]`, function () {
            context.newRecord(this);
        });
        $(document).on('click', `.btnSaveRecord[module="${context.moduleName}"]`, function () {
            context.saveRecord(this);
        });
        $(document).on('click', `.btnRecordDownloadCSV[module="${context.moduleName}"]`, function () {
            context.downloadRecordCSV(this);
        });
    }

    loadUI() {
        leftMenu.loadLatestUI();
    }

    initGlEntryListener(context) {
        $(document).on('click', `.editAcctTransaction[parentModule="${context.moduleName}"]`, function () {
            context.editAcctTransaction(this);
        });
        $(document).on('click', `.updateAcctTransaction[parentModule="${context.moduleName}"]`, function () {
            context.updateAcctTransaction(this);
        });
    }

    initReportListener(context) {
        $(document).on('click', `.btnReport[module="${context.moduleName}"]`, function () {
            context.showReport(this);
        });
    }

    initSubRecordListener(context) {
        $(document).on('click', `.btnSaveSubRecord[parentModule="${context.moduleName}"]`, function () {
            context.saveSubRecord(this);
        });
        $(document).on('click', `.btnDeleteSubRecord[parentModule="${context.moduleName}"]`, function () {
            context.deleteSubRecord(this);
        });
        $(document).on('change', `.autoSaveSubRecord[parentModule="${context.moduleName}"]`, function () {
            context.saveSubRecord(this);
        });
        $(document).on(`autoCompleteSaveSubRecord[parentModule="${context.moduleName}"]`, function (evt) {
            context.saveSubRecord(evt.detail[0]);
        });
        $(document).on('click', `.btnMoreSubRecord[parentModule="${context.moduleName}"]`, function () {
            context.moreSubRecord(this);
        });
        $(document).on('click', `.btnSubRecordDownloadCSV[parentModule="${context.moduleName}"]`, function () {
            context.downloadSubRecordCSV(this);
        });
    }

    updateAcctTransaction(obj) {
        var tmp = utils.collectDataForSaving(`editRecord`, this.AcctTransactionGLEditorUI, "0");
        tmp[this.GeneralLedgerEditorUI] = utils.collectSubRecordDataForSaving("editRecord", this.GeneralLedgerEditorUI);

        console.log(tmp);
        var vdata = JSON.stringify(tmp);
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/${this.moduleName}/saveAcctTransactionGL`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log("saveRecord", url, data);
            showModalAny.show("GL Save", "GL Entries saved successfully.");
            utils.hideSpin();
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    editAcctTransaction(obj) {
        var context = this;
        var rowIndex = $(obj).attr("rowIndex");
        var moduleName = $(obj).html();
        var moduleCode = $(`.editRecord[rowIndex="${rowIndex}"][name="moduleCode"]`).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/${context.moduleName}/getAcctTransactionGL/${moduleName}/${moduleCode}`;

        var successLoadGLData = function (data) {
            console.log("editAcctTransaction", url, data);
            dynaAutoComplete.loadDataAndAutoComplete("editRecord", data, 0, context.AcctTransactionGLEditorUI);
            context.formatSubRecordsFromMain(context.GeneralLedgerEditorUI, data, "editRecord");

            context.initFieldListener();
        };
        var successTransGLEditorList = function (data) {
            ajaxCaller.ajaxGet(new AjaxRequestDTO(url, ""), successLoadGLData);
        }
        var successCallback = function (data) {
            data = utils.replaceAll(data, "PARENT_MODULE", context.moduleName);
            showModalAny1200.show("Transaction GL Editing", data, successTransGLEditorList);
        };
        utils.getTabHtml("AccountingUI", "AcctTransactionGLEditor", successCallback);
    }

    showReport(obj) {
        var mainMenu = $(obj).attr("MainMenu");

        var successChangeReportList = function (data) {
            reportUI.loadReportList(mainMenu);
        }
        var successCallback = function (data) {
            showModalAny1200.show("Report", data, successChangeReportList);
        };
        utils.getTabHtml(mainMenu, "Report", successCallback);
    }

    downloadRecordCSV(obj) {
        var tmp = utils.collectDataForSaving(`searchFilter`, `${this.moduleName}`, "0");
        var param = utils.convertToQueryString(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/pwidget/${this.moduleName}/downloadRecordCSV${param}`;
        window.open(url, "_blank");
    }

    downloadSubRecordCSV(obj) {
        var mainRecordId = $(`.mainRecordId[module="${this.moduleName}"]`).val();
        var mainRecordName = $(`.mainRecordId[module="${this.moduleName}"]`).attr("name");
        var subModule = $(obj).attr("module");
        var tmp = utils.collectDataForSaving(`subRecordSearchFilter`, subModule, "0");
        tmp[mainRecordName] = mainRecordId;
        var param = utils.convertToQueryString(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/pwidget/${this.moduleName}/downloadSubRecordCSV/${subModule}${param}`;
        window.open(url, "_blank");
    }

    initSearchFilterListener(context) {
        $(document).on('keyup', `input.searchFilter[type="text"][module="${context.moduleName}"]`, function (evt) {
            context.searchRecordFilter(this);
        });
        $(document).on('change', `input.searchFilter[type="checkbox"][module="${context.moduleName}"]`, function (evt) {
            context.searchRecordFilter(this);
        });
        $(document).on('change', `input.calendar.searchFilter[module="${context.moduleName}"]`, function (evt) {
            context.searchRecordFilter(this);
        });
    }

    initSearchSubRecordFilterListener(context) {
        $(document).on('keyup', `input.subRecordSearchFilter[type="text"][parentModule="${context.moduleName}"]`, function (evt) {
            context.searchSubRecordFilter(this);
        });
        $(document).on('change', `input.subRecordSearchFilter[type="checkbox"][parentModule="${context.moduleName}"]`, function (evt) {
            context.searchSubRecordFilter(this);
        });
        $(document).on('change', `input.calendar.subRecordSearchFilter[parentModule="${context.moduleName}"]`, function (evt) {
            context.searchSubRecordFilter(this);
        });
    }

    beforeSave(data) {
        return data;
    }

    arrangeRecordProfileAllSubRecords(data, clsName) {
    }
    arrangeRecordProfileSubRecords(data, clsName, subModule) {
        this.formatSubRecords(subModule, data, clsName);
    }

    newRecord() {
    }

    saveRecord(obj) {
        utils.showSpin();
        console.log("saveRecord called");
        var tmp = utils.collectDataForSaving(`editRecord`, `${this.moduleName}`, "0");
        tmp = this.beforeSave(tmp);

        console.log(tmp);
        var vdata = JSON.stringify(tmp);
        var url = `${MAIN_URL}/api/generic/widget/${this.moduleName}/saveRecord/${tmp["code"]}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log("saveRecord", url, data);
            showModalAny.show("Message", "Record Saved Successfully.");
            utils.hideSpin();
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    deleteSubRecord(obj) {
        utils.showSpin();
        console.log("deleteSubRecord called");
        var rowIndex = $(obj).attr("rowIndex");
        var subModule = $(obj).attr("module");

        var tmpParent = utils.collectDataForSaving(`editRecord`, `${this.moduleName}`, "0");
        var tmpChild = utils.collectDataForSaving(`editRecord`, `${subModule}`, rowIndex);
        tmpParent["Child"] = tmpChild;
        tmpParent["SubModule"] = subModule;

        var vdata = JSON.stringify(tmpParent);
        var url = `${MAIN_URL}/api/generic/widget/${this.moduleName}/deleteSubRecord`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log("deleteSubRecord", tmpParent, url, data);
            $(`.subRecord[module="${subModule}"][rowIndex="${rowIndex}"]`).empty();
            utils.hideSpin();
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    moreSubRecord(obj) {
        var subModule = $(obj).attr("module");
        this.appendSubRecordsHolder(subModule);
    }

    saveSubRecord(obj) {
        utils.showSpin();
        console.log("saveSubRecord called");
        var rowIndex = $(obj).attr("rowIndex");
        var subModule = $(obj).attr("module");

        var tmpParent = utils.collectDataForSaving(`editRecord`, `${this.moduleName}`, "0");
        var tmpChild = utils.collectDataForSaving(`editRecord`, `${subModule}`, rowIndex);
        tmpParent["Child"] = tmpChild;
        tmpParent["SubModule"] = subModule;

        var vdata = JSON.stringify(tmpParent);
        var url = `${MAIN_URL}/api/generic/widget/${this.moduleName}/saveSubRecord`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log("saveSubRecord", tmpParent, url, data);
            $(`input.editRecord[name="code"][rowIndex="${rowIndex}"][module="${subModule}"]`).val(data.code);
            utils.hideSpin();
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    loadRecordProfile(obj) {
        autoSaveSubRecord = false;
        utils.showSpin();
        var context = this;
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/widget/${this.moduleName}/getRecordProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log("loadRecordProfile", url, data);
            context.arrangeRecordProfile(data, `editRecord`);
            context.arrangeRecordProfileAllSubRecords(data, `editRecord`);
            utils.hideSpin();
            autoSaveSubRecord = true;
            context.initFieldListener();
            context.onProfileLoaded(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    onProfileLoaded(data) {
        console.log("On Profile Loaded called.");
    }

    arrangeRecordProfile(data, clsName) {
        dynaAutoComplete.loadDataAndAutoComplete(clsName, data, 0, this.moduleName);
    }

    searchRecordFilter(obj) {
        utils.showSpin();
        var tabName = $(obj).attr("tabName");

        var tmp = utils.collectDataForSaving(`searchFilter`, `${this.moduleName}`, "0");
        var param = utils.convertToQueryString(tmp);

        var url = `${MAIN_URL}/api/generic/widget/${this.moduleName}/filterRecord${param}`;
        console.log("searchRecordFilter", url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var context = this;
        var successCallback = function (data) {
            console.log("searchRecordFilter", url, data);
            context.arrangeSearchedRecords(data, tabName);
            utils.hideSpin();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    searchSubRecordFilter(obj) {
        autoSaveSubRecord = false;
        utils.showSpin();
        var mainRecordId = $(`.mainRecordId[module="${this.moduleName}"]`).val();
        var mainRecordName = $(`.mainRecordId[module="${this.moduleName}"]`).attr("name");
        var subModule = $(obj).attr("module");
        var tmp = utils.collectDataForSaving(`subRecordSearchFilter`, subModule, "0");
        tmp[mainRecordName] = mainRecordId;
        var param = utils.convertToQueryString(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/${this.moduleName}/filterSubRecord/${subModule}${param}`;
        console.log("searchSubRecordFilter", url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var context = this;
        var successCallback = function (data) {
            console.log("searchSubRecordFilter", url, data);
            context.arrangeRecordProfileSubRecords(data, `editRecord`, subModule);
            utils.hideSpin();
            autoSaveSubRecord = true;
            context.initFieldListener();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadTopRecords(tabName) {
        utils.showSpin();
        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/widget/${this.moduleName}/getTopRecords`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var context = this;
        var successCallback = function (data) {
            console.log("loadTopRecords", url, data);
            context.arrangeSearchedRecords(data, tabName);
            utils.hideSpin();
            context.initFieldListener();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedRecords(data, tabName) {
        var context = this;
        var divSelector = `.searchRecords[module="${this.moduleName}"][tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var str = context.formatSearchList(index, obj, tabName);
            $(divSelector).append(str);
        });
    }

    formatSearchList(index, obj, tabName) {
        return "Please override format";
    }

    formatSubRecords(subModule, subRecordData, clsName) {
        this.createSubRecordsHolder(subModule, subRecordData);
        this.clearModuleInputs(subModule);
        $(subRecordData).each(function (index, obj) {
            dynaAutoComplete.loadDataAndAutoComplete(clsName, obj, index + 1, subModule);
        })
    }

    formatSubRecordsFromMain(subModule, data, clsName) {
        var subRecordData = data.getProp(subModule);
        this.formatSubRecords(subModule, subRecordData, clsName);
    }

    clearModuleInputs(tmpModule) {
        $(`.autocomplete[module="${tmpModule}"]`).val("");
        $(`.editRecord[module="${tmpModule}"]`).val("");
    }

    appendSubRecordsHolder(subModule) {
        var template = $(`.hiddenRecordTemplate[module="${subModule}"]`).html();
        var lastRowIndex = $(`.displayRecordTemplate[module="${subModule}"]`).children().length;
        var startOffset = lastRowIndex + 1;
        var endOffset = lastRowIndex + 10;
        for (var offset = startOffset; offset <= endOffset; offset++) {
            var recHtml = utils.replaceAll(template, "----", offset)
            $(`.displayRecordTemplate[module="${subModule}"]`).append(recHtml);
        }
        this.initFieldListener();
    }

    createSubRecordsHolder(subModule, subData) {
        var template = $(`.hiddenRecordTemplate[module="${subModule}"]`).html();
        this.clearSubRecordsHolder(subModule);
        var subLength = 0;
        if (subData == null) {
        }
        else {
            subLength = subData.length;
        }
        for (var offset = 1; offset <= subLength + 5; offset++) {
            var recHtml = utils.replaceAll(template, "----", offset)
            $(`.displayRecordTemplate[module="${subModule}"]`).append(recHtml);
        }
    }

    clearSubRecordsHolder(subModule) {
        $(`.displayRecordTemplate[module="${subModule}"]`).empty();
    }

    initFieldListener() {
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
    }

    loadedCallback(data) {
        console.log("loadedCallback not implemented.")
    }

    changeMainId(obj) {
    }

    doMainSearchData(evt) {
    }

    changeModule(evt) {
        console.log("testing");
    }

    init() {
        $("#dynamikoMainSearch").hide();
    }
}

$(function () {
    autoSaveSubRecord = false;
});
