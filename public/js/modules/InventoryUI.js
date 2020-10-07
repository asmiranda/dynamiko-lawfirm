class InventoryUI { 
    changeMainId(obj) {
    }

    doMainSearchData(evt) {
    }

    changeModule(evt) {
        personTaskUI.loadTodoList();
        employeeUI.loadTopEmployees();
        productUI.loadTopProducts("EquipmentsMaterials");
    }

    init() {
        $("#dynamikoMainSearch").hide();
    }

    selectProduct(obj) {
        // var recordId = $(obj).attr("recordId");
        var tabName = $(obj).attr("tabName");
        console.log(tabName);

        if (tabName=="EquipmentsMaterials") {
            productUI.loadProductProfile(obj);
            purchaseOrderUI.loadActivePoForProduct(obj);
        }
    }
}

