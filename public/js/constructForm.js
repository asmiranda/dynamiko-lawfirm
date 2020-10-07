class ConstructMainForm {
    construct(moduleName, recordId) {
        this.moduleName = moduleName;

        var url = "displaytabs/" + constructMainForm.moduleName + "-MainTemplate.html";
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            $("#content-main").html(data);
            constructMainForm.replaceDisplayTabs(recordId);
            var funcName = moduleName.charAt(0).toLowerCase() + moduleName.slice(1)
            eval(`${funcName}.loadedCallback('${recordId}')`);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        $(".quickMainSearcherResult").empty();
    };

    loadTab(obj, moduleName, cls, tabUrl, tabName, notFoundCallback) {
        var url = `displaytabs/tabs/${moduleName}/${tabUrl}.html`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            var strHtml = utils.replaceAll(data, "_TABNAME_", tabName);
            $(obj).replaceWith(strHtml);
            var displayTabs = document.getElementsByClassName(cls);
            if (displayTabs.length == 0) {
                fieldGenerator.generate();
                constructMainForm.cacheConstruct();
            }
        };
        var errorCallback = function (jqXHR, textStatus, errorThrown) {
            if (notFoundCallback) {
                notFoundCallback();
            }
            else {
                if (errorThrown == "Not Found") {
                    $(obj).replaceWith(url + " Not Found!");
                }
                var displayTabs = document.getElementsByClassName(cls);
                if (displayTabs.length == 0) {
                    fieldGenerator.generate();
                    constructMainForm.cacheConstruct();
                }
            }
        };
        ajaxCaller.ajaxGetErr(ajaxRequestDTO, successCallback, errorCallback);
    }

    replaceDisplayTabs(recordId) {
        var context = this;
        $(".DisplayTab").each(function (index, obj) {
            var tabUrl = $(obj).attr("tabUrl");
            var tabName = $(obj).attr("tabName");
            var module2 = $(obj).attr("module2");
            context.loadTab(obj, constructMainForm.moduleName, 'DisplayTab', tabUrl, tabName, function () {
                context.loadTab(obj, module2, 'DisplayTab', tabUrl, tabName);
            });
        });
        $(".DisplayTabCommon").each(function (index, obj) {
            var tabUrl = $(obj).attr("tabUrl");
            var tabName = $(obj).attr("tabName");
            context.loadTab(obj, 'common', 'DisplayTabCommon', tabUrl, tabName);
        });
    }

    cacheConstruct(recordId) {
        $('[data-mask]').inputmask();

        if (recordId > 0) {
            storage.set(constructMainForm.moduleName + "_RECORDID", recordId);
            constructMainForm.loadRecord(recordId);
        }
        else {
            recordId = storage.get(constructMainForm.moduleName + "_RECORDID");
            if (recordId > 0) {
                constructMainForm.loadRecord(recordId);
            }
        }
        document.dispatchEvent(new CustomEvent('changeModule', { bubbles: true, detail: { text: () => constructMainForm.moduleName } }))

        formRule.init(constructMainForm.moduleName);
        profilePicLoader.init(constructMainForm.moduleName);
        formControlButton.initButtons(constructMainForm.moduleName);
        // searchTable.initTable(constructMainForm.moduleName);
        fieldConstructor.initFields(constructMainForm.moduleName);
        childTabs.initTabs(constructMainForm.moduleName);
        profilePicLoader.init(constructMainForm.moduleName);
    };

    loadRecord(recordId) {
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/findRecord/' + constructMainForm.moduleName + '/' + recordId;

        var searchData = searchCache.getSearchCache(constructMainForm.moduleName, url);
        if (searchData == null || searchData == "") {
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");
            var successCallback = function (data) {
                searchCache.setNewSearchCache(constructMainForm.moduleName, url, data);

                utils.loadJsonToForm(mainForm, data);
                utils.loadJsonAddInfo(data);

                childTabs.reloadAllDisplayTabs();
                storage.setLatestModuleId(recordId);
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        }
        else {
            utils.loadJsonToForm(mainForm, searchData);
            utils.loadJsonAddInfo(searchData);

            childTabs.reloadAllDisplayTabs();
            storage.setLatestModuleId(recordId);
        }
    }
}

class FormRule {
    init(moduleName) {
        console.log("FormRule");
        this.moduleName = moduleName;
    }

    doRule() {
        console.log("doRule called");
        var vdata = JSON.stringify(utils.convertFormToJSON($(mainForm)));
        console.log(vdata);
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/formrule/' + formRule.moduleName;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            formRule.setupButtons(data);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    setupButtons(returnData) {
        this.disableHideSelector(".btnNew", "btnNew", returnData);
        this.disableHideSelector(".btnSave", "btnSave", returnData);
        this.disableHideSelector(".btnUpload", "btnUpload", returnData);
        this.disableHideSelector(".btnDelete", "btnDelete", returnData);
        this.disableHideSelector(".btnWf", "btnWf", returnData);
    }

    disableHideSelector(selector, field, returnData) {
        var dispComp = returnData.getProp("componentDisplays").filter(display => field == display.name)[0];
        if (dispComp.getProp("display")) {
            $(selector).show();
        }
        else {
            $(selector).hide();
        }

        if (dispComp.getProp("enabled")) {
            $(selector).prop("disabled", false);
        }
        else {
            $(selector).prop("disabled", true);
        }
    }
}

class ProfilePicLoader {
    init(moduleName) {
        this.moduleName = moduleName;

        console.log("ProfilePicLoader init called");
        $(mainId).on('change', function () {
            console.log("ProfilePicLoader change called");
            var recordId = $(this).val();
            if (recordId && recordId > 0) {
                var imageLink = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/${profilePicLoader.moduleName}/${recordId}/`;
                console.log(`ProfilePicLoader src="${imageLink}"`);
                $("#profilePic").attr("src", imageLink);
                $("#profilePic").show();
            }
            else {
                $("#profilePic").hide();
            }
        });
        $("#profilePic").hide();
    }
}

class FormControlButton {
    initButtons(moduleName) {
        this.moduleName = moduleName;
        this.formUploadData = new FormData();
        $(document).on('click', '.btnToggleSearch', function () {
            formControlButton.toggleSearch();
        });
        $(document).on('click', '.btnNew', function () {
            formControlButton.newRecord(this);
        });
        $(document).on('click', '.btnUpdate', function () {
            formControlButton.showModalUpdateRecord(this);
        });
        $(document).on('click', '.btnSave', function () {
            formControlButton.saveRecord(this);
        });
        $(document).on('click', '.btnDelete', function () {
            formControlButton.deleteRecord(this);
        });
        $(document).on('click', 'li.btnUpload', function () {
            formControlButton.listFileAttachments(this);
        });
        $(document).on('click', 'button.btnSaveUpload', function () {
            formControlButton.saveUpload(this);
        });
        $(document).on('click', '.myReport', function () {
            formControlButton.displayReport(this);
        });
    };

    initReport() {
        var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/report/dynamic/" + formControlButton.moduleName;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(data).each(function (index, obj) {
                console.log(obj);
                var code = obj.getProp("key");
                var name = obj.getProp("value");
                var module = formControlButton.moduleName;

                var str = `<li class="myReport ${code}" module="${module}" value="${code}"><a href="#" style="padding: 3px 20px;"><i class="fa fa-line-chart"> ${name}</i></a></li>`;
                $(".dynamicReport").after(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    displayReport(mySelectReport) {
        var value = $(mySelectReport).attr("value");
        // var value = $(mySelectReport).val();
        if (value == null || value == '' || value == '--Reports--') {
            console.log("EMPTY REPRT");
            return;
        }
        console.log("moduleName = " + formControlButton.moduleName);
        var recordId = $(mainId).val();

        console.log("displayReport");
        console.log(value);
        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            if (this.status == 200) {
                var file = new Blob([xhr.response], { type: 'application/pdf' });
                var fileURL = URL.createObjectURL(file);
                $("#reportDynamicContent").attr("data", fileURL);
                $(mySelectReport).val("--Reports--")
                var dynamicReport = $("#reportDynamicDialog").dialog({
                    width: '90%',
                    modal: true,
                });
            }
            else {
                $(mySelectReport).val("--Reports--")
                var enc = new TextDecoder("utf-8");
                var str = enc.decode(xhr.response)
                console.log(str);
                showModuleHelp.show("Information", str);
            }
        };
        var myurl = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/report/dynamic/' + formControlButton.moduleName + "/" + value + "/" + recordId;
        xhr.responseType = 'arraybuffer';
        xhr.open('GET', myurl, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + storage.getToken());
        xhr.send("");
    }

    listFileToTable(data) {
        try {
            $(".fileAttachments li").remove();
        }
        catch (e) {
            console.log(e);
        }
        $(data).each(function (index, obj) {
            console.log(obj);
            var fileName = obj.filename;
            var fileSize = obj.filesize;
            var fileId = obj.fileuploadid;
            $(".fileAttachments").append('<li class="list-group-item align-middle"><span class="pull-right align-top" style="margin-left: 10px;"><button class="btn btn-link" onclick="FormControlButton.deleteFile(' + fileId + ')">Delete</button></span><span class="badge"><a onclick="FormControlButton.downloadFile(' + fileId + ')" style="color:white;cursor: pointer;" target="_blank">Size : ' + fileSize + '</a></span>' + fileName + '</li>');
        });
    }

    mandatorySelectRecord() {
        var recordId = $(mainId).val();

        if (recordId > 0) {
            return true;
        }
        else {
            showModalAny.show("No Record Selected", "Please select a record.");
            return false;
        }
    }

    listFileAttachments(myButton) {
        console.log("listFileAttachments");
        var moduleName = $(myButton).attr("module");
        var recordId = $(mainId).val();
        console.log("recordId = " + recordId);

        if (this.mandatorySelectRecord()) {
            $('#fileUploadDialog').modal('show');
            var context = this;
            var successCallback = function (data) {
                console.log(data);
                context.listFileToTable(data);
            };
            ajaxCaller.getAllFiles(successCallback, moduleName, recordId);
        }
    }

    static downloadFile(fileId) {
        console.log("downloadFile = " + fileId);
        window.open(MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/attachment/download/' + fileId, '_blank');
    }

    static deleteFile(fileId) {
        console.log("deletedFile = " + fileId);
        var successCallback = function (data) {
            console.log(data);
            formControlButton.listFileToTable(data);
        };
        ajaxCaller.deleteFile(successCallback, fileId);
    }

    saveUpload(myButton) {
        var successCallback = function (data) {
            console.log(data);
            formControlButton.listFileToTable(data);
        };
        var moduleName = $(myButton).attr("module");
        var recordId = $(mainId).val();
        console.log("recordId = " + recordId);
        var uploadType = $("#XXuploadType").val();
        ajaxCaller.uploadFile(successCallback, moduleName, recordId, uploadType, this.formUploadData);
    }

    toggleSearch() {
        if ($("#dynamikoMainSearch").is(":visible")) {
            $("#dynamikoMainSearch").hide();
        }
        else {
            $("#dynamikoMainSearch").show();
        }
    }

    newRecord(myButton) {
        console.log("newRecord called");
        var moduleName = $(myButton).attr("module");
        var vdata = JSON.stringify(utils.convertFormToJSON($(mainForm)));
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/new/' + moduleName;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            utils.loadJsonToForm(mainForm, data);
            utils.loadJsonAddInfo(data);

            childTabs.reloadAllDisplayTabs();

            searchTable.reloadSearch();
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    };

    showModalUpdateRecord() {
        searchTable.displayAllFiles();
    }

    deleteRecord(myButton) {
        var moduleName = $(myButton).attr("module");
        console.log("deleteRecord called");
        var vdata = JSON.stringify(utils.convertFormToJSON($(mainForm)));
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/delete/' + moduleName;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            storage.setLatestModule(moduleName);
            registerDatatable.clearRegister();

            constructMainForm.construct(moduleName);
            fileUpload.initUpload();
        };
        var confirmDelete = function () {
            ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
        }
        deleteRecordConfirm.confirm(confirmDelete);
    };

    saveRecord(myButton) {
        var moduleName = $(myButton).attr("module");
        console.log("saveRecord called");
        $('.multiSelect option').prop('selected', true);
        var vdata = JSON.stringify(utils.convertFormToJSON($(mainForm)));
        console.log(vdata);
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/save/' + moduleName;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            utils.loadJsonToForm(mainForm, data);
            utils.loadJsonAddInfo(data);
            childTabs.reloadAllDisplayTabs();
            searchTable.reloadSearch();
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    };
}

class SearchTable {
    initTable(moduleName) {
        this.moduleName = moduleName;
        this.successCallback;

        var mainDataTable = dynaRegister.createMainTable(searchTable.moduleName, mainSearchForm, this);
        $(document).on('click', '.setFileProfile', function () {
            searchTable.setFileProfile(this);
        });
        $(document).on('click', '.attachFileRemove', function () {
            searchTable.removeAttachedFile(this);
        });
        $(document).on('keyup', 'input[class~="filter"]', function () {
            searchTable.reloadSearch();
        });
        $(document).on('click', 'select.specialSearch', function () {
            searchTable.reloadSpecialSearch();
        });
        $(document).on('click', 'btnImage', function () {
            searchTable.displayLargeImageFullScreen(this);
        });

        this.reloadSearch();
    };

    loadToForm() {
        var mainDataTable = dynaRegister.getDataTable(searchTable.moduleName);
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/findRecord/' + searchTable.moduleName + '/' + mainDataTable.selectedId;

        var searchData = searchCache.getSearchCache(searchTable.moduleName, url);
        if (searchData == null || searchData == "") {
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");
            var successCallback = function (data) {
                searchCache.setNewSearchCache(searchTable.moduleName, url, data);

                utils.loadJsonToForm(mainForm, data);
                utils.loadJsonAddInfo(data);

                childTabs.reloadAllDisplayTabs();
                for (const [key, value] of dynaRegister.saasMap) {
                    value.loadToForm(searchTable);
                }
                storage.setLatestModuleId(mainDataTable.selectedId);
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        }
        else {
            utils.loadJsonToForm(mainForm, searchData);
            utils.loadJsonAddInfo(searchData);

            childTabs.reloadAllDisplayTabs();
            for (const [key, value] of dynaRegister.saasMap) {
                value.loadToForm(searchTable);
            }
            storage.setLatestModuleId(mainDataTable.selectedId);
        }
    };

    displayAllFiles() {
        var mainDataTable = dynaRegister.getDataTable(searchTable.moduleName);
        var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/attachment/" + searchTable.moduleName + "/" + mainDataTable.selectedId;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".recordFiles").empty();
            $(data).each(function (index, obj) {
                console.log(obj);
                var fileUploadId = obj.getProp("fileUploadId");
                var fileName = obj.getProp("fileName");
                var uploadType = obj.getProp("uploadType");
                var str = "";
                if (uploadType == 'Profile') {
                    str = `
                    <div class='thumbnail' style='display:inline-block; border-width: 5px;'>
                        <img title='${fileName}' src='${MAIN_URL}/api/generic/${storage.getCompanyCode()}/attachment/download/${fileUploadId}' data-toggle='modal' data-target='#imgModal_${fileUploadId}'></img>
                        <div class='text-center' style='margin-top: 20px;'>
                            <i data='${fileUploadId}' class='fa fa-picture-o setFileProfile' title='Set As Profile' style='margin-right: 10px;'></i>
                            <i data='${fileUploadId}' class='fa fa-remove attachFileRemove' title='Remove File'></i>
                        </div>
                    </div>`;
                }
                else {
                    str = `
                    <div class='thumbnail' style='display:inline-block'>
                        <img title='${fileName}' src='${MAIN_URL}/api/generic/${storage.getCompanyCode()}/attachment/download/${fileUploadId}' data-toggle='modal' data-target='#imgModal_${fileUploadId}'></img>
                        <div class='text-center' style='margin-top: 20px;'>
                            <i data='${fileUploadId}' class='fa fa-picture-o setFileProfile' title='Set As Profile' style='margin-right: 10px;'></i>
                            <i data='${fileUploadId}' class='fa fa-remove attachFileRemove' title='Remove File'></i>
                        </div>
                    </div>`;
                }
                $(".recordFiles").append(str);

                var html = `
                    <div id="myModal" class="modal fade" role="dialog">
                        <div class="modal-dialog">                    
                        <!-- Modal content-->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close btn btnImage btnImage_${fileUploadId}" title="Full Screen" value="image_${fileUploadId}">
                                        <i class="glyphicon glyphicon-fullscreen"></i>
                                    </button>       
                                    <h4 class="modal-title">Larger Image</h4>
                                </div>
                                <div class="modal-body">
                                    <div style="overflow-x: auto; white-space: nowrap; height: 500px; width: 100%;" id="image_${fileUploadId}">
                                        <img src='myImage'></img>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>                    
                        </div>
                    </div>
                `;
                html = html.replace("myModal", "imgModal_" + fileUploadId);
                html = html.replace("myImage", MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/attachment/download/" + fileUploadId);
                $(".recordFiles").append(html);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    setFileProfile(obj) {
        var fileId = $(obj).attr("data");
        var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/attachment/setprofile/" + fileId;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            searchTable.displayAllFiles();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    removeAttachedFile(obj) {
        var fileId = $(obj).attr("data");
        var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/attachment/delete/" + fileId;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            searchTable.displayAllFiles();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    displayLargeImageFullScreen(btn) {
        var val = $(btn).attr("value");
        console.log(val);
        $("#" + val).fullScreen(true);
    }

    reloadSpecialSearch() {
        console.log("reloadSpecialSearch");
        var input = $('select.specialSearch');
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/search/special/' + this.moduleName + '/' + input.val();
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        ajaxCaller.ajaxGet(ajaxRequestDTO, this.successCallback);
    };

    loadSearchData(data) {
        console.log("Reload Search");
        var mainDataTable = dynaRegister.getDataTable(searchTable.moduleName);
        mainDataTable.clear();
        var columns = $(mainSearchForm).attr("columns");
        // console.log(columns);
        var firstRec = Object.keys(data[0]);
        var keys = columns.split(',');
        $.each(data, function (index, obj) {
            var keyId = obj.getProp(firstRec[0]);
            var record = [];
            for (var key of keys) {
                var value = obj.getProp(key);
                if (value) {
                    record.push(value);
                }
                else {
                    record.push("");
                }
            }
            var node = mainDataTable.row.add(record).node();
            node.id = keyId;
            $(node).addClass("rec" + keyId);
            // console.log(node);
            mainDataTable.draw(false);
        }); ""
        // console.log(data);
    }

    reloadSearch() {
        console.log("reloadSearch");
        var input = $('input[class~="filter"][module="' + searchTable.moduleName + '"]');
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/search/' + searchTable.moduleName + '/' + input.val();
        var searchData = searchCache.getSearchCache(searchTable.moduleName, url);
        if (searchData == null || searchData == "") {
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");
            var successCallback = function (data) {
                searchCache.setNewSearchCache(searchTable.moduleName, url, data);
                searchTable.loadSearchData(data);
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        }
        else {
            searchTable.loadSearchData(searchData);
        }
    };

    clearSearch() {
        console.log("reloadSearch");
        var mainDataTable = dynaRegister.getDataTable(searchTable.moduleName);
        $('input[class~="filter"][module="' + searchTable.moduleName + '"]').val("");
        var input = $('input[class~="filter"][module="' + searchTable.moduleName + '"]');
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/search/' + searchTable.moduleName + '/' + input.val();
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log("Reload Search");
            mainDataTable.clear();
            var columns = $(mainSearchForm).attr("columns");
            console.log(columns);
            var firstRec = Object.keys(data[0]);
            var keys = columns.split(',');
            $.each(data, function (index, obj) {
                var keyId = obj.getProp(firstRec[0]);
                var record = [];
                for (var key of keys) {
                    var value = obj.getProp(key);
                    if (value) {
                        record.push(value);
                    }
                    else {
                        record.push("");
                    }
                }
                var node = mainDataTable.row.add(record).node();
                node.id = keyId;
                $(node).addClass("rec" + keyId);
                // console.log(node);
                mainDataTable.draw(false);

                for (const [key, value] of dynaRegister.saasMap) {
                    console.log(key, value);
                    value.clearSearch(searchTable);
                }
            });
            // console.log(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    };
};

$(function () {
    constructMainForm = new ConstructMainForm();
    searchTable = new SearchTable();
    formControlButton = new FormControlButton();
    formRule = new FormRule();
    profilePicLoader = new ProfilePicLoader();
})