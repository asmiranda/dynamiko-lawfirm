class DynaRegister {
    constructor() {
        this.dataTableMap = new Map();
        this.saasMap = new Map();
    }

    clearDataTable() {
        dynaRegister.dataTableMap.clear();
    }
    getDataTable(moduleName) {
        var obj = dynaRegister.dataTableMap.get(moduleName);
        return obj;
    }
    createChildTable(moduleName, tableSelector) {
        var readWrite = $(tableSelector).attr("readWrite");
        var canNew = $(tableSelector).attr("canNew");
        var canEdit = $(tableSelector).attr("canEdit");
        var canDelete = $(tableSelector).attr("canDelete");
        var childTableColFields = $(tableSelector).attr("columns");
        var childFieldId = $(tableSelector).attr("childFieldId");
        var linkableColumns = $(tableSelector).attr("linkableColumns");
        if (linkableColumns) {
            linkableColumns = linkableColumns.toUpperCase();
        }

        var childTable = null;
        if (readWrite=='true'||canEdit=='true'||canDelete=='true') {
            childTable = $(tableSelector).DataTable( {
                "searching": false,
                "bLengthChange": false,
    
                "autoWidth": true,
                "fixedHeader": {
                    "header": false,
                    "footer": false
                },
                "columnDefs": [
                    {
                        "width": "70px",
                        "targets": 0,
                        'orderable': false,
                    },
                ],
            } );
        }
        else {
            childTable = $(tableSelector).DataTable( {
                "searching": false,
                "bLengthChange": false,
    
                "autoWidth": true,
                "fixedHeader": {
                    "header": false,
                    "footer": false
                },
                "columnDefs": [
                    {
                        'orderable': false,
                    },
                ],
            } );
        }

        childTable.childTableColFields = childTableColFields;
        childTable.childFieldId = childFieldId;
        childTable.readWrite = readWrite;
        childTable.canNew = canNew;
        childTable.canEdit = canEdit;
        childTable.canDelete = canDelete;
        childTable.linkableColumns = linkableColumns;
        childTable.selectedId = null;

        dynaRegister.dataTableMap.set(moduleName, childTable);
        return childTable;
    }
    createMainTable(moduleName, tableSelector, myForm) {
        var mainDataTable = $(tableSelector).DataTable( {
            searching:      false,
            scrollX:        true,
            scrollCollapse: true,
        } );
        mainDataTable.selectedId = null;
  
        $(tableSelector + ' tbody').on('click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }
            else {
                mainDataTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                console.log($(this).attr("id"));
                mainDataTable.selectedId = $(this).attr("id");
                myForm.loadToForm();
            }
        } );
        dynaRegister.dataTableMap.set(moduleName, mainDataTable);
        return mainDataTable;
    }
    clearTable(moduleName) {
        var tbl = dynaRegister.getDataTable(moduleName);
        tbl.clear().draw(false);
    }
    registerSaas(saas, obj) {
        dynaRegister.saasMap.set(saas, obj);
    }
}
