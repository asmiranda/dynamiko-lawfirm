class FieldGenerator {
    generate() {
        console.log("FieldGenerator generate CALLED");
        $("field").each(function (index, obj) {
            var type = $(obj).attr("type");
            if (type == "TextFieldGen") {
                fieldGenerator.generateTextField(obj);
            }
            else if (type == "TextAreaGen") {
                fieldGenerator.generateTextArea(obj);
            }
            else if (type == "AutoCompleteGen") {
                fieldGenerator.generateAutoComplete(obj);
            }
            else if (type == "ComboGen") {
                fieldGenerator.generateCombo(obj);
            }
            else if (type == "IntegerGen") {
                fieldGenerator.generateInteger(obj);
            }
            else if (type == "DoubleGen") {
                fieldGenerator.generateDouble(obj);
            }
            else if (type == "SqlComboGen") {
                fieldGenerator.generateSqlCombo(obj);
            }
            else if (type == "CalendarGen") {
                fieldGenerator.generateCalendar(obj);
            }
            else if (type == "CheckBoxGen") {
                fieldGenerator.generateCheckbBox(obj);
            }
            else if (type == "MoneyGen") {
                fieldGenerator.generateMoney(obj);
            }
        });
    }

    generateMoney(obj) {
        var moduleName = $(obj).attr("module");
        var editable = $(obj).attr("editable");
        var name = $(obj).attr("name");
        var label = $(obj).attr("label");

        console.log(`FieldGenerator generateDouble for ${name} of ${moduleName}`);
        var str = "";
        if (editable == "true") {
            str = `
                <div class="form-group">
                    <label class="control-label">${label}</label>

                    <div class="input-group" style="margin-left:2px;">
                        <span class="input-group-addon">$</span>
                        <input type="text" module="${moduleName}" submodule="${moduleName}" name="${name}" class="form-control currency displayEdit text-left"
                            data-inputmask="'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'prefix': '$ ', 'placeholder': '0'"
                            data-mask/>   
                    </div>
                </div>
            `;
        }
        else {
            str = `
                <div class="form-group">
                    <label class="col-sm-4 control-label">${label}</label>
                    <div class="col-sm-8">
                        <div class="input-group" style="margin-left:2px;">
                            <span class="input-group-addon">$</span>
                            <input type="text" module="${moduleName}" submodule="${moduleName}" name="${name}" disabled class="form-control currency displayEdit text-left"
                                data-inputmask="'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'prefix': '$ ', 'placeholder': '0'"
                                data-mask/>   
                        </div>
                    </div>
                </div>
            `;
        }
        $(obj).replaceWith(str);
    }

    generateCheckbBox(obj) {
        var moduleName = $(obj).attr("module");
        var editable = $(obj).attr("editable");
        var name = $(obj).attr("name");
        var label = $(obj).attr("label");

        console.log(`FieldGenerator generateTextFieldGen for ${name} of ${moduleName}`);
        var str = "";
        if (editable == "true") {
            str = `
                <div class="form-group">
                    <input type="checkbox" module="${moduleName}" submodule="${moduleName}" name="${name}" placeholder="${label}" class="displayEdit">
                    <label class="control-label">${label}</label>
                </div>
            `;
        }
        else {
            str = `
                <div class="form-group">
                    <label class="col-sm-4 control-label">${label}</label>
                    <div class="col-sm-8">
                        <input type="checkbox" module="${moduleName}" submodule="${moduleName}" name="${name}" placeholder="${label}" class="displayEdit" disabled>
                    </div>
                </div>
            `;
        }
        $(obj).replaceWith(str);
    }

    generateCalendar(obj) {
        var moduleName = $(obj).attr("module");
        var editable = $(obj).attr("editable");
        var name = $(obj).attr("name");
        var label = $(obj).attr("label");

        console.log(`FieldGenerator generateCalendar for ${name} of ${moduleName}`);
        var str = "";
        if (editable == "true") {
            str = `
                <div class="form-group date">
                    <label class="control-label">${label}</label>
                    <input module="${moduleName}" submodule="${moduleName}" type="text" class="form-control calendar displayEdit" name="${name}" placeholder="${label}">
                    <div class="input-group-addon displayEdit">
                        <i class="fa fa-calendar"></i>
                    </div>
                </div>
            `;
        }
        else {
            str = `
                <div class="form-group">
                    <label class="col-sm-4 control-label">${label}</label>
                    <div class="col-sm-8">
                        <input module="${moduleName}" submodule="${moduleName}" type="text" class="form-control displayEdit no-border" name="${name}" placeholder="${label}">
                    </div>
                </div>
            `;
        }
        $(obj).replaceWith(str);
    }

    generateSqlCombo(obj) {
        var moduleName = $(obj).attr("module");
        var editable = $(obj).attr("editable");
        var name = $(obj).attr("name");
        var label = $(obj).attr("label");
        var modelCombo = $(obj).attr("modelCombo");

        console.log(`FieldGenerator generateSqlCombo for ${name} of ${moduleName}`);
        var str = "";
        if (editable == "true") {
            var txtOptions = "";
            // var theArray = modelCombo.split(",");
            // $(theArray).each(function(index, obj) {
            //     txtOptions += `<option value="${obj}">${obj}</option>`;
            // });
            // str = `
            //     <div class="form-group">
            //         <label class="control-label">${label}</label>
            //         <select module="${moduleName}" submodule="${moduleName}" type="text" class="form-control displayEdit" name="${name}" placeholder="${label}">
            //             ${txtOptions}
            //         </select>
            //     </div>
            // `;
        }
        else {
            str = `
                <div class="form-group">
                    <label class="col-sm-4 control-label">${label}</label>
                    <div class="col-sm-8">
                        <input module="${moduleName}" submodule="${moduleName}" type="text" class="form-control displayEdit no-border" name="${name}" placeholder="${label}">
                    </div>
                </div>
            `;
        }
        $(obj).replaceWith(str);
    }

    generateDouble(obj) {
        var moduleName = $(obj).attr("module");
        var editable = $(obj).attr("editable");
        var name = $(obj).attr("name");
        var label = $(obj).attr("label");

        console.log(`FieldGenerator generateDouble for ${name} of ${moduleName}`);
        var str = "";
        if (editable == "true") {
            str = `
                <div class="form-group">
                    <label class="control-label">${label}</label>
                    <input module="${moduleName}" submodule="${moduleName}" type="number" class="form-control displayEdit" name="${name}" placeholder="${label}"
                        min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100">
                </div>
            `;
        }
        else {
            str = `
                <div class="form-group">
                    <label class="col-sm-4 control-label">${label}</label>
                    <div class="col-sm-8">
                        <input module="${moduleName}" submodule="${moduleName}" type="text" class="form-control displayEdit no-border" name="${name}" placeholder="${label}">
                    </div>
                </div>
            `;
        }
        $(obj).replaceWith(str);
    }

    generateInteger(obj) {
        var moduleName = $(obj).attr("module");
        var editable = $(obj).attr("editable");
        var name = $(obj).attr("name");
        var label = $(obj).attr("label");

        console.log(`FieldGenerator generateInteger for ${name} of ${moduleName}`);
        var str = "";
        if (editable == "true") {
            str = `
                <div class="form-group">
                    <label class="control-label">${label}</label>
                    <input module="${moduleName}" submodule="${moduleName}" type="number" class="form-control displayEdit" name="${name}" placeholder="${label}"
                        min="0" step="1" data-number-to-fixed="0" data-number-stepfactor="100">
                </div>
            `;
        }
        else {
            str = `
                <div class="form-group">
                    <label class="col-sm-4 control-label">${label}</label>
                    <div class="col-sm-8">
                        <input module="${moduleName}" submodule="${moduleName}" type="text" class="form-control displayEdit no-border" name="${name}" placeholder="${label}">
                    </div>
                </div>
            `;
        }
        $(obj).replaceWith(str);
    }

    generateCombo(obj) {
        var moduleName = $(obj).attr("module");
        var editable = $(obj).attr("editable");
        var name = $(obj).attr("name");
        var label = $(obj).attr("label");
        var modelCombo = $(obj).attr("modelCombo");

        console.log(`FieldGenerator generateTextFieldGen for ${name} of ${moduleName}`);
        var str = "";
        if (editable == "true") {
            var txtOptions = "";
            var theArray = modelCombo.split(",");
            $(theArray).each(function (index, obj) {
                txtOptions += `<option value="${obj}">${obj}</option>`;
            });
            str = `
                <div class="form-group">
                    <label class="control-label">${label}</label>
                    <select module="${moduleName}" submodule="${moduleName}" type="text" class="form-control displayEdit" name="${name}" placeholder="${label}">
                        ${txtOptions}
                    </select>
                </div>
            `;
        }
        else {
            str = `
                <div class="form-group">
                    <label class="col-sm-4 control-label">${label}</label>
                    <div class="col-sm-8">
                        <input module="${moduleName}" submodule="${moduleName}" type="text" class="form-control displayEdit no-border" name="${name}" placeholder="${label}">
                    </div>
                </div>
            `;
        }
        $(obj).replaceWith(str);
    }

    generateAutoComplete(obj) {
        var moduleName = $(obj).attr("module");
        var enabled = $(obj).attr("enabled");
        var editable = $(obj).attr("editable");
        var name = $(obj).attr("name");
        var label = $(obj).attr("label");
        var linktoBean = $(obj).attr("linktoBean");

        console.log(`FieldGenerator generateTextFieldGen for ${name} of ${moduleName}`);
        var str = "";
        if (editable == "true") {
            if (enabled == "false") {
                str = `
                    <div class="form-group">
                        <label class="control-label" module="${moduleName}" submodule="${moduleName}" autoName="${name}" name="${name}" title="Click for help">
                            ${label}
                        </label>
                        <div class="input-group autocomplete-div">
                            <input module="${moduleName}" submodule="${moduleName}" autoName="${name}" type="text" class="form-control autocomplete displayEdit" placeholder="${label}" disabled>
                        </div>
                    
                        <input module="${moduleName}" submodule="${moduleName}" autoName="${name}" class="form-control HiddenAutoComplete" name="${name}" type="hidden">
                        <div module="${moduleName}" submodule="${moduleName}" autoName="${name}" name="${name}" class="DivAutoCompleteDefault" style="margin-left: 20px; display:none"></div>
                        <div module="${moduleName}" submodule="${moduleName}" autoName="${name}" name="${name}" class="DivAutoComplete" style="margin-left: 20px; display:none"></div>
                    </div>
                `;
            }
            else {
                str = `
                    <div class="form-group">
                        <label class="control-label" module="${moduleName}" submodule="${moduleName}" autoName="${name}" name="${name}" title="Click for help">
                            ${label}
                        </label>
                        <div class="input-group autocomplete-div">
                            <input module="${moduleName}" submodule="${moduleName}" autoName="${name}" type="text" class="form-control autocomplete displayEdit" placeholder="${label}">
                            <span class="input-group-addon displayEdit"><i class="fa fa-search"></i></span>
                            <div class="autocomplete-items" module="${moduleName}" submodule="${moduleName}" autoName="${name}">
                            </div>
                        </div>
                    
                        <input module="${moduleName}" submodule="${moduleName}" autoName="${name}" class="form-control HiddenAutoComplete" name="${name}" type="hidden">
                        <div module="${moduleName}" submodule="${moduleName}" autoName="${name}" name="${name}" class="DivAutoCompleteDefault" style="margin-left: 20px; display:none"></div>
                        <div module="${moduleName}" submodule="${moduleName}" autoName="${name}" name="${name}" class="DivAutoComplete" style="margin-left: 20px; display:none"></div>
                    </div>
                `;
            }
        }
        else {
            str = `
                <div class="form-group">
                    <label class="col-sm-4 control-label">${label}</label>
                    <div class="col-sm-8">
                        <div module="${moduleName}" submodule="${moduleName}" autoName="${name}" name="${name}" class="DivAutoComplete" style="margin-left: 20px;"></div>
                    </div>
                
                    <input module="${moduleName}" submodule="${moduleName}" autoName="${name}" type="hidden" class="form-control autocomplete displayEdit" placeholder="${label}">
                    <input module="${moduleName}" submodule="${moduleName}" autoNameField="${name}" class="form-control HiddenAutoComplete" name="${name}" type="hidden">
                    <div module="${moduleName}" submodule="${moduleName}" autoName="${name}" name="${name}" class="DivAutoCompleteDefault" style="margin-left: 20px; display:none"></div>
                </div>
            `;
        }
        $(obj).replaceWith(str);
    }

    generateTextArea(obj) {
        var moduleName = $(obj).attr("module");
        var editable = $(obj).attr("editable");
        var name = $(obj).attr("name");
        var label = $(obj).attr("label");

        console.log(`FieldGenerator generateTextFieldGen for ${name} of ${moduleName}`);
        var str = "";
        if (editable == "true") {
            str = `
                <div class="form-group">
                    <label class="control-label">${label}</label>
                    <textarea module="${moduleName}" submodule="${moduleName}" name="${name}" placeholder="${label}" class="form-control displayEdit" rows="3"></textarea>
                </div>
            `;
        }
        else {
            str = `
                <div class="form-group">
                    <label class="col-sm-4 control-label">${label}</label>
                    <div class="col-sm-8">
                        <textarea module="${moduleName}" submodule="${moduleName}" name="${name}" placeholder="${label}" class="form-control displayEdit" rows="3"></textarea>
                    </div>
                </div>
            `;
        }
        $(obj).replaceWith(str);
    }

    generateTextField(obj) {
        var moduleName = $(obj).attr("module");
        var editable = $(obj).attr("editable");
        var name = $(obj).attr("name");
        var label = $(obj).attr("label");

        console.log(`FieldGenerator generateTextFieldGen for ${name} of ${moduleName}`);
        var str = "";
        if (editable == "true") {
            str = `
                <div class="form-group">
                    <label class="control-label">${label}</label>
                    <input module="${moduleName}" submodule="${moduleName}" type="text" class="form-control displayEdit" name="${name}" placeholder="${label}">
                </div>
            `;
        }
        else {
            str = `
                <div class="form-group">
                    <label class="col-sm-4 control-label">${label}</label>
                    <div class="col-sm-8">
                        <input module="${moduleName}" submodule="${moduleName}" type="text" class="form-control displayEdit no-border" name="${name}" placeholder="${label}">
                    </div>
                </div>
            `;
        }
        $(obj).replaceWith(str);
    }
}

class FieldConstructor {
    initFields(moduleName) {
        console.log("this.initFields called == " + moduleName);

        var fieldAutoComplete = new FieldAutoComplete(moduleName);
        fieldAutoComplete.init();

        // <!--this is for calendar-->
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
}

class FieldMultiSelect {
    changeMultiSelectData(moduleName) {
        var recordId = $(mainId).val();
        console.log("RECORD ID = " + recordId);
        $(".multiSelect[module='" + moduleName + "'][mainmodule='" + moduleName + "']").each(function () {
            var fieldLabelName = $(this).attr("name");
            console.log("MULTI SELECT FIELD " + fieldLabelName);
            var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/multiselect/" + moduleName + "/" + fieldLabelName + "/" + recordId;
            console.log("url = " + url);
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");
            var successCallback = function (data) {
                console.log(data);
                var fieldName = $(data)[0].field;
                console.log("fieldName = " + fieldName);
                var myInput = $(".multiSelect[module='" + moduleName + "'][mainmodule='" + moduleName + "'][name='" + fieldName + "']");
                $(myInput).empty();
                $.each(data, function (i, obj) {
                    if (i > 0) {
                        var label = obj.getProp("label");
                        var id = obj.getProp("id");
                        var opt = new Option(label, id);
                        $(opt).html(label);
                        $(myInput).append(opt);
                    }
                });
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        });
    }

    clickDisplayAdd(moduleName, btn) {
        var fieldName = $(btn).attr("name");
        console.log("multiSelectDisplayAdd fieldName = " + fieldName);
        var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/multiselect/options/" + moduleName + "/" + fieldName;
        console.log("multiSelectDisplayAdd url = " + url);
        var myInput = $(".multiSelect[module='" + moduleName + "'][mainmodule='" + moduleName + "'][name='" + fieldName + "']");
        var varr = [];
        $(".multiSelect[module='" + moduleName + "'][mainmodule='" + moduleName + "'][name='" + fieldName + "'] > option").each(function () {
            varr.push(this.value);
        });
        console.log("multiSelectDisplayAdd varr = " + varr);
        var ajaxRequestDTO = new AjaxRequestDTO(url, JSON.stringify(varr));
        var successCallback = function (data) {
            console.log(data);
            var fieldName = $(data)[0].field;
            console.log("fieldName = " + fieldName);
            var myInput = $(".multiSelectOptionList[module='" + moduleName + "'][mainmodule='" + moduleName + "'][name='" + fieldName + "']");
            $(myInput).empty();
            $.each(data, function (i, obj) {
                if (i > 0) {
                    var label = obj.getProp("label");
                    var id = obj.getProp("id");
                    var opt = new Option(label, id);
                    $(opt).html(label);
                    $(myInput).append(opt);
                }
            });
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    addSelected(moduleName, btn) {
        var fieldName = $(btn).attr("name");
        console.log("fieldName = " + fieldName);
        var myInput = $(".multiSelect[module='" + moduleName + "'][mainmodule='" + moduleName + "'][name='" + fieldName + "']");
        $(".multiSelectOptionList[module='" + moduleName + "'][mainmodule='" + moduleName + "'][name='" + fieldName + "']" + " option:selected").each(function () {
            var opt = new Option($(this).text(), $(this).val());
            $(opt).html($(this).text());
            $(myInput).append(opt);

            $(this).remove();
        });
        console.log("myInput = " + $(myInput).val());
    }

    deleteSelected(moduleName, btn) {
        var fieldName = $(btn).attr("name");
        console.log("fieldName = " + fieldName);
        $(".multiSelect[module='" + moduleName + "'][mainmodule='" + moduleName + "'][name='" + fieldName + "']" + " option:selected").each(function () {
            $(this).remove();
        });
    }

    filterChoices(moduleName, btn) {
        var fieldName = $(btn).attr("name");
        var fieldValue = $(btn).val();
        console.log("multiSelectTextFilter fieldName = " + fieldName);
        var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/multiselect/options/filter/" + moduleName + "/" + fieldName + "/" + fieldValue;
        console.log("multiSelectTextFilter url = " + url);
        var myInput = $(".multiSelect[module='" + moduleName + "'][mainmodule='" + moduleName + "'][name='" + fieldName + "']");
        var varr = [];
        $(".multiSelect[module='" + moduleName + "'][mainmodule='" + moduleName + "'][name='" + fieldName + "'] > option").each(function () {
            varr.push(this.value);
        });
        console.log("multiSelectTextFilter varr = " + varr);
        var ajaxRequestDTO = new AjaxRequestDTO(url, JSON.stringify(varr));
        var successCallback = function (data) {
            console.log(data);
            var fieldName = $(data)[0].field;
            console.log("fieldName = " + fieldName);
            var myInput = $(".multiSelectOptionList[module='" + moduleName + "'][mainmodule='" + moduleName + "'][name='" + fieldName + "']");
            $(myInput).empty();
            $.each(data, function (i, obj) {
                if (i > 0) {
                    var label = obj.getProp("label");
                    var id = obj.getProp("id");
                    var opt = new Option(label, id);
                    $(opt).html(label);
                    $(myInput).append(opt);
                }
            });
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    init(moduleName) {
    }
}

class FieldAutoComplete {
    init(moduleName) {
        console.log("AUTO COMPLETE MODULE " + moduleName);
        $(".autocomplete[module='" + moduleName + "'][mainmodule='" + moduleName + "']").each(function () {
            var fieldLabelName = $(this).attr("autoName");
            console.log("AUTO COMPLETE FIELD " + fieldLabelName);
            var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/autocomplete/" + moduleName + "/" + fieldLabelName;
            var autoCompleteDisplayField = $(this);
            var autoCompleteValueField = $("[autoNameField='" + fieldLabelName + "'][name='" + fieldLabelName + "']");
            var autoCompleteDescDivDefault = $(".DivAutoCompleteDefault[autoName='" + fieldLabelName + "'][name='" + fieldLabelName + "']");
            var autoCompleteDescDiv = $(".DivAutoComplete[autoName='" + fieldLabelName + "'][name='" + fieldLabelName + "']");
            var autoCompleteHelpTip = $("label[autoName='" + fieldLabelName + "'][name='" + fieldLabelName + "']");
            $(autoCompleteHelpTip).click(function (e) {
                console.log("Clicked Help!!!");
                showAutoCompleteFieldHelp.show($(autoCompleteDisplayField).attr("helpTitle"), autoCompleteDisplayField, autoCompleteDescDivDefault, autoCompleteDescDiv);
            });
        });

    }
}
