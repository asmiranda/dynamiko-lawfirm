class RegisterDatatable {
    register(datatable) {
        console.log("register");
        if (datatable) {
            console.log("register datatable");
            allTable.push(datatable);
            console.log("length : " + allTable.length);
        }
    }

    clearRegister() {
        console.log("clearRegister");
        $.each(allTable, function (index, obj) {
            console.log(index);
            console.log(obj);
            try {
                $(obj).destroy();
            }
            catch (err) {
                console.log(err);
            }
        });
        allTable = [];
    }
}

$(function () {
    registerDatatable = new RegisterDatatable();
})