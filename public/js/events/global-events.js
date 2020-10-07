class GlobalEvents {
    initializeGlobalEvents() {
        $(window).keydown(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });

        $(document).on('changeModule', function (evt) {
            globalEvents.triggerChangeModule(evt);
        });
        $(document).on('doMainSearchData', function (evt) {
            globalEvents.triggerMainSearch(evt);
        });
        $(document).on('click', '.loadRecordToForm', function () {
            var recordId = $(this).attr("recordId");
            $(mainId).val(recordId);
            globalEvents.triggerChangeRecord(this);
        });
        $(document).on('change', mainId, function () {
            globalEvents.triggerChangeRecord(this);
        });

        $(document).on('click', '.btnDownloadExcel[module="ReportUI"]', function () {
            reportUI.downloadExcel(this);
        });
        $(document).on('click', '.btnRunReport[module="ReportUI"]', function () {
            reportUI.displayReport(this);
        });
        $(document).on('change', 'select[module="ReportUI"][name="report"]', function () {
            reportUI.changeParameters(this);
        });
        $(document).on('click', '.btnShowMainMonitoring', function () {
            $(".btnShowMainMonitoring").hide();
            $(".btnHideMainMonitoring").show();
            $("#content-main").hide();
            $("#main-monitoring").show();
        });
        $(document).on('click', '.btnHideMainMonitoring', function () {
            $(".btnShowMainMonitoring").show();
            $(".btnHideMainMonitoring").hide();
            $("#content-main").show();
            $("#main-monitoring").hide();
        });




        $(document).on('click', '.btnChildTabSave', function () {
            dynaButtonAction.saveDisplayTab(this);
        });
        $(document).on('click', '.btnAddInfoSave', function () {
            dynaButtonAction.saveAddInfoSave(this);
        });

        $(document).on('click', 'button.btnChildTabEdit', function () {
            childTabs.editChildRecord(this);
        });
        $(document).on('click', 'button.btnChildTabNew', function () {
            childTabs.newDisplayTab(this);
        });
        $(document).on('click', 'button.btnChildTabDelete', function () {
            childTabs.deleteDisplayTab(this);
        });
        $(document).on('click', 'button.btnChildTabCancel', function () {
            childTabs.cancelDisplayTab(this);
        });
        $(document).on('click', '.setFileProfile', function () {
            childTabs.setFileProfile(this);
        });
        $(document).on('click', '.attachFileRemove', function () {
            childTabs.removeAttachedFile(this);
        });
        $(document).on('click', '.btnImage_', function () {
            childTabs.displayLargeImageFullScreen(this);
        });


        $(document).on('click', '.reportClose', function () {
            console.log("close report");
            dynamicReport.dialog("close");
        });

        // ########################Custom Report
        $(document).on('click', '.btnCustomReportToggleCriteria', function () {
            customReport.customReportToggleCriteria(this);
        });
        $(document).on('click', '.btnCustomReportFullScreen', function () {
            customReport.customReportFullScreen(this);
        });
        $(document).on('click', '.btnCustomReportRun', function () {
            customReport.customReportRun(this);
        });
        $(document).on('click', '.btnCustomDisplayModalReport', function () {
            customReport.customDisplayModalReport(this);
        });
        $(document).on('click', '.btnAutoCustomDisplayModalReport', function () {
            customReport.customAutoDisplayModalReport(this);
        });

        // #########################Field Constructors
        $(document).on('click', mainId, function () {
            fieldMultiSelect.changeMultiSelectData(this);
        });
        $(document).on('click', '.multiSelectDisplayAdd', function () {
            fieldMultiSelect.clickDisplayAdd(this);
        });
        $(document).on('click', '.multiSelectAdd', function () {
            fieldMultiSelect.addSelected(this);
        });
        $(document).on('click', '.multiSelectDelete', function () {
            fieldMultiSelect.deleteSelected(this);
        });
        $(document).on('keyup', '.multiSelectTextFilter', function () {
            fieldMultiSelect.filterChoices(this);
        });

        // #########################Form Linker
        $(document).on('click', '.formLinker', function () {
            formLinker.startLink(this);
        });
        $(document).on('click', '.childFormLinker', function () {
            formLinker.startChildToFormLink(this);
        });

        // ########################Quick Updater
        $(document).on('click', '.quickAttachmentTarget', function () {
            quickUpdater.quickAttachment(this);
        });
        $(document).on('click', '.quickDownloaderTarget', function () {
            quickUpdater.quickDownloader(this);
        });
        $(document).on('click', '.quickUpdaterCallback', function () {
            quickUpdater.quickUpdaterCallback(this);
        });
        $(document).on('click', '.quickUpdaterTarget', function () {
            quickUpdater.quickUpdater(this);
        });
        $(document).on('change', '.calendarQuickUpdaterInput', function () {
            quickUpdater.quickUpdateInput(this);
        });
        $(document).on('change', '.textQuickUpdaterInput', function () {
            quickUpdater.quickUpdateInput(this);
        });
        $(document).on('change', '.autoCompleteQuickUpdaterSelect', function () {
            quickUpdater.quickAutoCompleteUpdateInput(this);
        });

        // ########################Quick Searcher
        $(document).on('click', '.btnQuickSearch', function () {
            quickSearcher.displayMainQuickSearcher(this);
        });
        $(document).on('keyup', '.quickMainSearcherInput', function () {
            quickSearcher.doMainQuickSearcher(this);
        });

        // ###################### Other events
        $(document).on('click', '.pivotTable', function () {
            dataVisualizer.showPivot();
        });
        $(document).on('click', '.btnFullScreenAny', function () {
            dynamikoFullScreen.fullScreen(this);
        });
        $(document).on('click', '.btnChartFullScreen', function () {
            widgetChartRule.chartFullScreen(this);
        });
        $(document).on('click', '#printForm', function () {
            printJS('mainForm', 'html');
        });
        $(document).on('click', '.myReportViewer', function () {
            myReportViewer.displayReportViewer(this);
        });
        $(document).on('click', '.btnSubmitReportCriteria', function () {
            myReportViewer.displayReportPdf(this);
        });

        // #############################################Review Center
        $(document).on('click', '.btnReviewCenterShowQuestions', function () {
            reviewCenter.showQuestions(this);
        });
        $(document).on('click', '.btnReviewCenterAddQuestion', function () {
            reviewCenter.addQuestion(this);
        });
        $(document).on('click', '.btnReviewCenterDeleteQuestion', function () {
            reviewCenter.deleteQuestion(this);
        });
        $(document).on('keyup', '.txtReviewCenterSearchQuestion', function () {
            reviewCenter.searchQuestion(this);
        });
        $(document).on('click', '.btnReviewCenterSubmitEnrollment', function () {
            reviewCenter.submitEnrollment();
        });
        $(document).on('click', '.btnReviewCenterEnrollTo', function () {
            reviewCenter.populateEnrollmentChoices();
        });

        // ################################################For Upload Data File
        $(document).on('click', '#uploadDataFile', function () {
            uploadDataFile.displayUploadDataViewer();
        });
        $(document).on('click', '.downloadTemplate', function () {
            uploadDataFile.downloadTemplate();
        });
        $(document).on('change', '#fileDataUpload', function (evt) {
            uploadDataFile.displayCsvFile(evt);
            var fileName = evt.target.files[0].name;
            $("#chosenFileForUpload").html(fileName);
        });
        $(document).on('change', '.btnUploadDataFile', function (evt) {
            uploadDataFile.uploadDataFile();
        });
        $(document).on('click', '.useTemplate', function () {
            uploadDataFile.useChosenTemplate(this);
        });
        $(document).on('change', '#fileUpload', function (evt) {
            if ($(this).prop('files').length > 0) {
                var file = $(this).prop('files')[0];
                formControlButton.formUploadData.append("file", file);
            }
        });

        // ###################For Reports 
        $(document).on('click', '.btnShowInvoiceReport', function () {
            ajaxCaller.displayReport("Invoice", "sample=sample");
        });

        $(document).on('click', '.toggle-box', function () {
            utils.toggleBox(this);
        });

        $(document).on('click', '.toggle-any', function () {
            utils.toggleAny(this);
        });
    }

    triggerMainSearch(evt) {
        console.log("triggerMainSearch");
        console.log(evt);
        $(registeredModules).each(function (index, data) {
            var areEqual = data.toUpperCase() == evt.detail.text().toUpperCase();
            if (areEqual) {
                var objEval = data + ".doMainSearchData(evt)";
                eval(objEval);
            }
        });
    }

    triggerChangeModule(obj) {
        console.log("triggerChangeModule");
        console.log(obj);

        let useModule = constructMainForm.moduleName;
        $(registeredModules).each(function (index, data) {
            var isEqual = data.toUpperCase() == useModule.toUpperCase();
            if (isEqual) {
                var objEval = data + ".changeModule(obj)";
                eval(objEval);
                childTabs.initTabs(useModule);
            }
        });
    }

    triggerChangeRecord(obj) {
        console.log("triggerChangeRecord");
        console.log(obj);
        $(registeredModules).each(function (index, data) {
            var areEqual = data.toUpperCase() == $(obj).attr("module").toUpperCase();
            if (areEqual) {
                var objEval = data + ".changeMainId(obj)";
                eval(objEval);
            }
        });
    }
}

$(function () {
    globalEvents = new GlobalEvents();
    globalEvents.initializeGlobalEvents();

    // globalEventsHr = new GlobalEventsHr();    
    // globalEventsHr.initializeGlobalEvents();

    // globalEventsAccounting = new GlobalEventsAccounting();    
    // globalEventsAccounting.initializeGlobalEvents();

    // globalEventsGovernment = new GlobalEventsGovernment();    
    // globalEventsGovernment.initializeGlobalEvents();

    // globalEventsOthers = new GlobalEventsOthers();    
    // globalEventsOthers.initializeGlobalEvents();
})
