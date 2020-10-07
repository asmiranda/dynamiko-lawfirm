class QuickUpdater {
    quickUpdaterCallback(obj) {
        console.log("quickUpdaterCallback called");
        this.callbackObject = obj;
        this.callbackData;
        quickUpdater.quickUpdater(obj);
    }

    quickAutoCompleteUpdateInput(obj) {
        var moduleName = $(obj).attr("module");
        var recordId = $(obj).attr("recordId");
        if (recordId == null || recordId == "" || recordId == undefined || recordId == "undefined" || recordId == "0") {
            recordId = $(mainId).val();
        }
        var fieldName = $(obj).attr("fieldName");
        var quickUpdaterId = $(obj).attr("quickUpdaterId");
        var callback = $(obj).attr("callback");
        var value = $(obj).val();
        var textValue = obj.options[obj.selectedIndex].text;

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/QuickUpdater/${moduleName}/${recordId}/${fieldName}/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            if (callback == null || callback == undefined || callback == "") {
                $(`.quickUpdaterTarget[quickUpdaterId="${quickUpdaterId}"]`).html(textValue);
            }
            else {
                quickUpdater.callbackData = data;
                eval(callback);
            }
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    quickUpdateInput(obj) {
        var moduleName = $(obj).attr("module");
        var recordId = $(obj).attr("recordId");
        if (recordId == null || recordId == "" || recordId == undefined || recordId == "0") {
            recordId = $(mainId).val();
        }
        var fieldName = $(obj).attr("fieldName");
        var quickUpdaterId = $(obj).attr("quickUpdaterId");
        var value = $(obj).val();
        var callback = $(obj).attr("callback");

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/QuickUpdater/${moduleName}/${recordId}/${fieldName}/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            if (callback == null || callback == undefined || callback == "") {
                $(`.quickUpdaterTarget[quickUpdaterId="${quickUpdaterId}"]`).html(value);
            }
            else {
                quickUpdater.callbackData = data;
                eval(callback);
            }
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    displayTextUpdate(obj) {
        quickUpdater.displayInputUpdater(obj, "#textQuickUpdater", 'Please Type Below <a class="close" href="#">&times;</a>');
    }

    displayAutoCompleteUpdate(obj) {
        quickUpdater.displayInputUpdater(obj, "#autoCompleteQuickUpdater", 'Please Type Below <a class="close" href="#">&times;</a>');
    }

    displayCalendarUpdate(obj) {
        quickUpdater.displayInputUpdater(obj, "#calendarQuickUpdater", 'Choose Date <a class="close" href="#">&times;</a>');

        $('.calendar').datepicker({
            autoclose: true,
            format: config.getDateFormat()
        });
    }

    displayInputUpdater(obj, updaterId, updaterTitle) {
        var moduleName = $(obj).attr("module");
        var recordId = $(obj).attr("recordId");
        if (recordId == null || recordId == "" || recordId == undefined || recordId == "0") {
            recordId = $(mainId).val();
        }
        var fieldName = $(obj).attr("fieldName");
        var quickUpdaterId = $(obj).attr("quickUpdaterId");
        var callback = $(obj).attr("callback");
        if (callback == null || callback == undefined) {
            callback = "";
        }

        var str = $(updaterId).html();
        str = utils.replaceAll(str, "##MODULE##", moduleName);
        str = utils.replaceAll(str, "##RECORDID##", recordId);
        str = utils.replaceAll(str, "##FIELDNAME##", fieldName);
        str = utils.replaceAll(str, "##QUICKUPDATERID##", quickUpdaterId);
        str = utils.replaceAll(str, "##CALLBACK##", callback);

        var placement = $(obj).attr("placement");
        if (placement == null || placement == undefined) {
            placement = "right";
        }
        console.log(str);
        var pop = $(obj);

        pop.popover({
            placement: placement,
            trigger: 'manual',
            html: true,
            title: updaterTitle,
            content: str,
            sanitize: false,
        }).on('shown.bs.popover', function (e) {
            //console.log('shown triggered');
            // 'aria-describedby' is the id of the current popover
            var current_popover = '#' + $(e.target).attr('aria-describedby');
            var cur_pop = $(current_popover);

            cur_pop.find('.close').click(function () {
                //console.log('close triggered');
                pop.popover('hide');
            });

            cur_pop.find('.OK').click(function () {
                //console.log('OK triggered');
                pop.popover('hide');
            });
        });
        pop.popover('show');
    }

    quickUpdater(obj) {
        console.log("quickUpdater called");

        QUICK_UPDATER_COUNTER++;
        $(obj).attr("quickUpdaterId", QUICK_UPDATER_COUNTER);

        var updater = $(obj).attr("updater");
        if (updater == "calendar") {
            quickUpdater.displayCalendarUpdate(obj);
        }
        else if (updater == "text") {
            quickUpdater.displayTextUpdate(obj);
        }
        if (updater == "autoComplete") {
            quickUpdater.displayAutoCompleteUpdate(obj);
        }
    }

    quickDownloader(obj) {
        console.log("quickDownloader called");
        var moduleName = $(obj).attr("module");
        var recordId = $(obj).attr("recordId");
        if (recordId == null || recordId == "" || recordId == undefined || recordId == "0") {
            recordId = $(mainId).val();
        }
        var fileType = $(obj).attr("fileType");

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/QuickDownloader/${moduleName}/${recordId}/${fileType}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            window.open(MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/attachment/download/' + data, '_blank');
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    quickAttachment(obj) {
        console.log("quickAttachment called");
        var moduleName = $(obj).attr("module");
        var recordId = $(obj).attr("recordId");
        if (recordId == null || recordId == "" || recordId == undefined || recordId == "0") {
            recordId = $(mainId).val();
        }
        var fileType = $(obj).attr("fileType");

        var successCallback = function (data) {
            console.log(data);
            showModalAny.show("Success", "File uploaded successfully!");
        };
        showUploadAttachment.show("File Uploader", moduleName, recordId, fileType, successCallback);
    }
}
