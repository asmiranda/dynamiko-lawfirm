class DynaAutoComplete {
    constructor() {
        $(document).on('keyup', '.autocomplete', function () {
            dynaAutoComplete.doAutoComplete(this);
        });
        $(document).on('click', '.autocomplete', function () {
            dynaAutoComplete.doAutoComplete(this);
        });
        $(document).on('click', '.autocomplete-choice', function () {
            dynaAutoComplete.putAutoComplete(this);
        });
        $(document).on('click', '.btnCloseAutoComplete', function () {
            dynaAutoComplete.closeAutoComplete(this);
        });
        $(document).on('click', '.btnAutoClearSelected', function () {
            dynaAutoComplete.clearSelected(this);
        });
    }

    putAutoComplete(obj) {
        console.log("putAutoComplete Called");
        var value = $(obj).attr("value");
        var rowIndex = $(obj).attr("rowIndex");
        var html = $(obj).html();
        var moduleName = $(obj).attr("module");
        // var submodule = $(obj).attr("submodule");
        var fieldName = $(obj).attr("autoName");
        $(`.autocomplete[module="${moduleName}"][autoName="${fieldName}"][rowIndex='${rowIndex}']`).val(html);
        $(`.DivAutoComplete[module="${moduleName}"][autoName="${fieldName}"][name="${fieldName}"][rowIndex='${rowIndex}']`).html(html);
        $(`.autocomplete-items[autoName='${fieldName}'][module='${moduleName}'][rowIndex='${rowIndex}']`).empty();

        $(`.HiddenAutoComplete[module="${moduleName}"][autoName="${fieldName}"][name="${fieldName}"][rowIndex='${rowIndex}']`).val(value);
        $(`.HiddenAutoComplete[module="${moduleName}"][autoNameField="${fieldName}"][name="${fieldName}"][rowIndex='${rowIndex}']`).val(value);
        $(`.HiddenAutoComplete[module="${moduleName}"][autoName="${fieldName}"][rowIndex='${rowIndex}']`).val(value);
        $(`.HiddenAutoComplete[module="${moduleName}"][autoNameField="${fieldName}"][rowIndex='${rowIndex}']`).val(value);

        document.dispatchEvent(new CustomEvent(`changeAutoComplete[${fieldName}][${moduleName}]`, { bubbles: true, detail: { text: () => value } }))
        document.dispatchEvent(new CustomEvent(`changeAutoComplete[${fieldName}][${moduleName}][${rowIndex}]`, { bubbles: true, detail: { text: () => value } }))

        var subRecordAutoCompleteObj = $(`.HiddenAutoComplete[module="${moduleName}"][autoNameField="${fieldName}"][name="${fieldName}"][rowIndex='${rowIndex}']`);
        if ($(subRecordAutoCompleteObj).hasClass("autoSaveSubRecord")) {
            var parentModule = $(subRecordAutoCompleteObj).attr("parentModule");
            document.dispatchEvent(new CustomEvent(`autoCompleteSaveSubRecord[parentModule="${parentModule}"]`, { detail: subRecordAutoCompleteObj }))
        }
    }

    doAutoComplete(obj) {
        var value = $(obj).val();
        var moduleName = $(obj).attr("module");
        var fieldName = $(obj).attr("autoName");
        var rowIndex = $(obj).attr("rowIndex");
        $(`.autocomplete-items[autoName='${fieldName}'][module='${moduleName}'][rowIndex='${rowIndex}']`).show();
        var isAutoCompleteQuickUpdaterInput = $(obj).hasClass("autoCompleteQuickUpdaterInput");

        console.log("Autocomplete typed " + value);
        var url = `${MAIN_URL}/api/generic/autocomplete/${moduleName}/${fieldName}/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            if (isAutoCompleteQuickUpdaterInput) {
                $(`.autoCompleteQuickUpdaterSelect`).empty();
                $.each(data, function (index, obj) {
                    var key = obj.getProp("key");
                    var value = obj.getProp("value");
                    var strHtml = `<option value="${key}">${value}</option>`;
                    $(`.autoCompleteQuickUpdaterSelect`).append(strHtml);
                });
            }
            else {
                $(`.autocomplete-items[autoName='${fieldName}'][module='${moduleName}'][rowIndex='${rowIndex}']`).empty();
                $.each(data, function (index, obj) {
                    var key = obj.getProp("key");
                    var value = obj.getProp("value");

                    if (index == 0) {
                        var strHtmlClose = `<div title="Close" style="float: right;" class="btnCloseAutoComplete" autoName="${fieldName}" module="${moduleName}" rowIndex="${rowIndex}"><i style="position:fixed;margin-top: -5px;margin-left: -5px;" class="fa fa-close"></i></div>`;
                        $(`.autocomplete-items[autoName='${fieldName}'][module='${moduleName}'][rowIndex='${rowIndex}']`).append(strHtmlClose);
                    }
                    var strHtml = `<div value="${key}" class="autocomplete-choice" autoName="${fieldName}" module="${moduleName}" rowIndex="${rowIndex}">${value}</div>`;
                    $(`.autocomplete-items[autoName='${fieldName}'][module='${moduleName}'][rowIndex='${rowIndex}']`).append(strHtml);
                });
            }
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    closeAutoComplete(obj) {
        var moduleName = $(obj).attr("module");
        var fieldName = $(obj).attr("autoName");
        var rowIndex = $(obj).attr("rowIndex");
        $(`.autocomplete-items[autoName='${fieldName}'][module='${moduleName}'][rowIndex='${rowIndex}']`).hide();
    }

    clearSelected(obj) {
        var moduleName = $(obj).attr("module");
        var fieldName = $(obj).attr("autoName");
        var rowIndex = $(obj).attr("rowIndex");
        $(`.HiddenAutoComplete[name='${fieldName}'][module='${moduleName}'][rowIndex='${rowIndex}']`).val("");
        $(`.autocomplete[name='${fieldName}'][module='${moduleName}'][rowIndex='${rowIndex}']`).val("");
    }

    loadAutoCompleteLabel(form, field, name) {
        console.log("loadAutoCompleteLabel == " + form + " [autoname='" + name + "'] == ");
        var tmpLabel = $(form + " [class~='autocomplete'][autoname='" + name + "']");
        tmpLabel.val("");

        var moduleName = $(field).attr("module");
        var subModuleName = $(field).attr("submodule");
        var value = $(field).val();

        if (value != null && value != "") {
            var url = MAIN_URL + '/api/generic/autocompletelabel/' + moduleName + '/' + name + '/' + value;
            if (subModuleName) {
                url = MAIN_URL + '/api/generic/autocompletelabel/' + subModuleName + '/' + name + '/' + value;
            }
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");
            var innerForm = form;
            var successCallback = function (data) {
                console.log('loadAutoCompleteLabel called', innerForm, url, data);
                var divDescAutoComplete = $(innerForm + " [class~='DivAutoComplete'][autoname='" + data.getProp("fieldName") + "']");
                divDescAutoComplete.html(data.getProp("value"));
                var fieldAutoComplete = $(innerForm + " [class~='autocomplete'][autoname='" + data.getProp("fieldName") + "']");
                fieldAutoComplete.val(data.getProp("value"));
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        }
    };

    loadDataAndAutoComplete(clsName, data, dRowIndex, dModuleName) {
        // benchMark.start(`loadDataAndAutoComplete`);
        $(`.${clsName}[module="${dModuleName}"][rowIndex="${dRowIndex}"]`).each(function (index, obj) {
            var key = $(obj).attr("name");
            var inputType = $(obj).attr("type");
            if (key) {
                var value = data.getProp(key);
                // console.log(key + " -> " + value);
                if (inputType == "checkbox") {
                    if (value == null || value == undefined || value == "" || value == false) {
                        $(obj).attr("checked", false);
                        $(obj).val("");
                    }
                    else {
                        $(obj).attr("checked", true);
                        $(obj).val(value);
                    }
                }
                else if (inputType == "html") {
                    $(obj).html(value);
                }
                else {
                    $(obj).val(value);
                }
            }
        });

        $(`.${clsName}.HiddenAutoComplete`).each(function (index, obj) {
            var field = $(this).attr("autoNameField");
            var rowIndex = $(this).attr("rowIndex");
            var moduleName = $(this).attr("module");
            if (field && rowIndex == dRowIndex && moduleName == dModuleName) {
                dynaAutoComplete.loadAutoCompleteRowLabel(field, rowIndex, obj);
            }
        });
        // benchMark.log();
    }

    loadAutoCompleteRowLabel(field, rowIndex, obj) {
        var moduleName = $(obj).attr("module");
        var tmpLabel = $(`[class~='autocomplete'][module='${moduleName}'][autoname='${field}'][rowIndex='${rowIndex}']`);
        tmpLabel.val("");

        var hiddenAutoComplete = `.HiddenAutoComplete[module='${moduleName}'][name="${field}"][rowIndex='${rowIndex}']`;
        var value = $(hiddenAutoComplete).val();

        if (value != null && value != "") {
            var url = `${MAIN_URL}/api/generic/autocompletelabel/${moduleName}/${field}/${value}`;
            var data = storage.get(url);
            if (data == null || data == "") {
                var ajaxRequestDTO = new AjaxRequestDTO(url, "");
                var successCallback = function (data) {
                    console.log(url, `server loadAutoCompleteRowLabel == [autoname=${field}] == [value=${value}]`, data);
                    storage.set(url, data);
                    dynaAutoComplete.arrangeLoadAutoCompleteRowLabel(moduleName, rowIndex, data);
                };
                ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
            }
            else {
                console.log(`cache loadAutoCompleteRowLabel == [autoname=${field}] == [value=${value}]`);
                dynaAutoComplete.arrangeLoadAutoCompleteRowLabel(moduleName, rowIndex, data);
            }
        }
    };

    arrangeLoadAutoCompleteRowLabel(moduleName, rowIndex, data) {
        var fieldName = data.getProp("fieldName");
        var fieldValue = data.getProp("value");
        var divDescAutoComplete = $(`.DivAutoComplete[module='${moduleName}'][autoname='${fieldName}'][rowIndex='${rowIndex}']`);
        if ($(divDescAutoComplete)) {
            $(divDescAutoComplete).html(fieldValue);
        }
        var fieldAutoComplete = $(`.autocomplete[module='${moduleName}'][autoname='${fieldName}'][rowIndex='${rowIndex}']`);
        if ($(fieldAutoComplete)) {
            $(fieldAutoComplete).val(fieldValue);
        }
    }

}

$(function () {
    dynaAutoComplete = new DynaAutoComplete();
})