class ChildTabs {
    constructor() {
        this.childTabArray = [];
    }

    newDisplayTab(obj) {
        var subModule = $(obj).attr("submodule")
        var childTab = childTabs.getChildTab(subModule);
        childTab.newDisplayTab(obj);
    }

    deleteDisplayTab(obj) {
        var subModule = $(obj).attr("submodule")
        var childTab = childTabs.getChildTab(subModule);
        childTab.deleteDisplayTab(obj);
    }

    cancelDisplayTab(obj) {
        var subModule = $(obj).attr("submodule")
        var childTab = childTabs.getChildTab(subModule);
        childTab.cancelDisplayTab();
    }

    setFileProfile(obj) {
        var subModule = $(obj).attr("submodule")
        var childTab = childTabs.getChildTab(subModule);
        childTab.setFileProfile(obj);
    }

    removeAttachedFile(obj) {
        var subModule = $(obj).attr("submodule")
        var childTab = childTabs.getChildTab(subModule);
        childTab.removeAttachedFile(obj);
    }

    displayLargeImageFullScreen(obj) {
        var subModule = $(obj).attr("submodule")
        var childTab = childTabs.getChildTab(subModule);
        childTab.displayLargeImageFullScreen(obj);
    }

    editChildRecord(obj) {
        var submodule = $(obj).attr("submodule")
        var recId = $(obj).attr("recordId");
        var childTab = childTabs.getChildTab(subModule);

        var childTable = dynaRegister.getDataTable(submodule);
        childTable.selectedId = recId;
        console.log("SELECTED ID == "+childTable.selectedId);
        if (childTable.selectedId) {
            childTab.loadToForm();
            childTab.editDisplayTab(this);
            childTab.displayAllFiles();
        }
        else {
            e.stopPropagation();
            noSelectedRecordEdit.alert();
        }
    }

    getChildTab(subModule) {
        var childTab = null;
        $.each(childTabs.childTabArray, function(index, obj) {
            if (obj.subModuleName==subModule) {
                childTab = obj;
            }
        });
        return childTab;
    }

    initTabs(moduleName) {
        $.each($('.myChildTab[submodule]'), function(i, obj) {  
            console.log("initTabs");
            console.log(i);
            console.log($(obj).attr("submodule"));
            var childTab = new ChildTab(moduleName, $(obj).attr("submodule"), $(obj).attr("cache"));
            childTab.constructTab();

            childTabs.childTabArray.push(childTab);
        });
    };

    clearAllDisplayTabs() {
        console.log("clearAllDisplayTabs");
        console.log(childTabs.childTabArray);
        $.each(childTabs.childTabArray, function(i, childTab) {
            console.log(i);
            console.log(childTab);
            childTab.clearDisplayTabs();
        });
    };

    reloadAllDisplayTabs() {
        console.log("reloadAllDisplayTabs");
        console.log(childTabs.childTabArray);
        $.each(childTabs.childTabArray, function(i, childTab) {
            console.log(i);
            console.log(childTab);
            childTab.reloadDisplayTabs();
        });
    };
};
