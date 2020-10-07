class ChildFieldConstructor {
    initFields(moduleName, subModuleName) {
        console.log("this.initFields called == " + moduleName + ":" + subModuleName);
        childFieldAutoComplete.init(moduleName, subModuleName);
    }
}

class ChildFieldAutoComplete {
    init(moduleName, subModuleName) {
        var dialogWindow = "#myModal" + subModuleName;
        $(".autocomplete[submodule='" + subModuleName + "']").each(function () {
            var fieldLabelName = $(this).attr("autoName");
            var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/subautocomplete/" + moduleName + "/" + subModuleName + "/" + fieldLabelName;
            var autoCompleteDisplayField = $(this);
            var autoCompleteValueField = $(".HiddenAutoComplete[submodule='" + subModuleName + "'][name='" + fieldLabelName + "']");
            var autoCompleteDescDivDefault = $(".DivAutoCompleteDefault[autoName='" + fieldLabelName + "'][name='" + fieldLabelName + "']");
            var autoCompleteDescDiv = $(".DivAutoComplete[autoName='" + fieldLabelName + "'][name='" + fieldLabelName + "']");
        });
    }
}
