class UiService {
    constructor() {
        this.profileName;
        $(document).on('click', '.manageUserRoles', function () {
            uiService.manageUserRoles();
        });
        $(document).on('click', '.manageDepartment', function () {
            uiService.manageDepartment();
        });
        $(document).on('click', '.manageTaxCategory', function () {
            uiService.manageTaxCategory();
        });
        $(document).on('click', '.manageAccountChart', function () {
            uiService.manageAccountChart();
        });
        $(document).on('click', '.manageBenefit', function () {
            uiService.manageBenefit();
        });
        $(document).on('click', '.manageEmployee', function () {
            uiService.manageEmployee();
        });
        $(document).on('click', '.manageSupplier', function () {
            uiService.manageSupplier();
        });
        $(document).on('click', '.manageProduct', function () {
            uiService.manageProduct();
        });
        $(document).on('click', '.choiceCompany', function () {
            uiService.changeCompany($(this).attr("companyCode"), $(this).attr("companyName"));
        });
    }

    initHome() {
        // uiService.initCompany();
        uiService.initProfile();
    }

    manageEmployee() {
        uiService.loadUI('EmployeeUI');
    }

    manageSupplier() {
        uiService.loadUI('SupplierUI');
    }

    manageProduct() {
        uiService.loadUI('ProductUI');
    }

    manageUserRoles() {
        uiService.loadUI('UserUI');
    }

    manageDepartment() {
        uiService.loadUI('DepartmentUI');
    }

    manageTaxCategory() {
        uiService.loadUI('TaxCategoryUI');
    }

    manageAccountChart() {
        uiService.loadUI('AccountGroupUI');
    }

    manageBenefit() {
        uiService.loadUI('HrBenefitUI');
    }

    loadUI(myui) {
        var moduleName = myui;
        storage.setModule(moduleName);
        registerDatatable.clearRegister();

        constructMainForm.construct(moduleName);
    }

    initCompany() {
        var url = MAIN_URL + '/api/ui/' + storage.getCompanyCode() + '/company';
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        $(".chooseCompanyList").empty();
        var successCallback = function (data) {
            console.log(data);
            $(data).each(function (index, obj) {
                var companyCode = obj.getProp("code");
                var companyName = obj.getProp("name");
                var str = `
                    <li>
                        <a href="#" class="choiceCompany" companyCode="${companyCode}" companyName="${companyName}">${companyName}</a>
                    </li>
                `;
                $(".chooseCompanyList").append(str);
                uiService.changeCompany(companyCode, companyName);
            });
            uiService.initLogo();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    changeCompany(companyCode, companyName) {
        storage.companyCode = companyCode;
        storage.companyName = companyName;
        var useCompanyStr = `
            <span style="padding-right: 15px;">${companyName}</span><i class="fa fa-bank"></i>
        `;
        $("#useCompany").empty();
        $("#useCompany").append(useCompanyStr);

        if (storage.getModule()) {
            leftMenu.loadLatestUI();
        }
    }

    initLogo() {
        var url = MAIN_URL + '/api/ui/' + storage.getCompanyCode() + '/logo';
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log("logo ==");
            console.log(data);
            $(".logo").html(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    initProfile() {
        $(".profileName").html(storage.get("Person").firstName);
    }
}

$(function () {
    uiService = new UiService();
})