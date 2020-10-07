class FormLinker {
    startChildToFormLink(obj) {
        var moduleName = $(obj).attr("module");
        var submodule = $(obj).attr("submodule");
        var recordId = $(obj).attr("mainId");
        var fieldname = $(obj).attr("fieldname");
        var childid = $(obj).attr("childid");
        formLinker.linkChildToForm(moduleName, submodule, fieldname, recordId, childid);
    }

    linkChildToForm(moduleName, submodule, fieldname, recordId, childid) {
        var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/childtoformlink/" + moduleName + "/" + submodule + "/" + fieldname + "/" + recordId + "/" + childid;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);

            var formModule = data.getProp("moduleName");
            var formId = data.getProp("recordId");
            formLinker.linkToForm(formModule, formId);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    startLink(obj) {
        var linkModule = $(obj).attr("linkModule");
        var recordId = $(obj).attr("recordId");
        formLinker.linkToForm(linkModule, recordId);
    }

    linkToForm(moduleName, recordId) {
        registerDatatable.clearRegister();

        constructMainForm.construct(moduleName, recordId);
        fileUpload.initUpload();
    }
}
