class PayrollUI {
    constructor() {
        var dt = new Date();
        this.chosenYear = dt.getFullYear();
        this.chosenMonth = dt.getMonth();
        this.monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    }

    changePayrollPeriod(obj, typeSelected) {
        if (typeSelected == "month") {
            this.chosenMonth = parseInt($(obj).attr("month"));
        }
        else {
            this.chosenYear = $(obj).val();
        }
        payrollScheduleUI.loadActiveMonth();
        payrollScheduleUI.loadChoosePayrollList();
    }

    changeModule(evt) {
        payrollScheduleUI.init();
        payrollScheduleUI.loadActiveMonth();
        payrollScheduleUI.loadPayrollTypes();
        payrollScheduleUI.loadEmployeesForSelectedPayrollTypes();

        payrollScheduleUI.loadChoosePayrollList();
    }

    init() {
        $("#dynamikoMainSearch").hide();

        $("#selectPayrollYear").empty();
        var str1 = `<option value="${this.chosenYear - 1}">${this.chosenYear - 1}</option>`;
        var str2 = `<option value="${this.chosenYear}" selected>${this.chosenYear}</option>`;
        var str3 = `<option value="${this.chosenYear + 1}">${this.chosenYear + 1}</option>`;
        $("#selectPayrollYear").append(str1);
        $("#selectPayrollYear").append(str2);
        $("#selectPayrollYear").append(str3);
    }

    displayEmployeePayslipPreview() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/pwidget/PayrollScheduleUI/displayEmployeePayslipPreview/${storage.lastEmployeePayrollId}`;
        $(`iframe[report="EmployeePayslipPreview"]`).attr("src", url);
    }

    loadEmployeePayrollLoan() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/getEmployeePayrollLoan/${storage.lastEmployeePayrollId}`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".PayrollScheduleUI-ListEmployeePayrollLoan").empty();
            $(data).each(function (index, obj) {
                var employeePayrollId = obj.getProp("EmployeePayrollId");
                var employeePayrollLoanId = obj.getProp("employeePayrollLoanId");
                var loanAmount = obj.getPropDefault("loanAmount", "0");
                var loanPaymentAmount = obj.getPropDefault("loanPaymentAmount", "0");
                var loanName = obj.getProp("loanName");
                var str = `  
                    <div style="flex: 50%; padding: 2px;">
                        <div class="info-box bg-red" style="padding: 5px; min-height:0px;">
                            <span class="info-box-text">${loanName} - ${loanAmount}</span>
                            <span class="info-box-number hand">
                                <span class="quickUpdaterCallback" placement="auto right" callback="payrollScheduleUI.chooseEmployeeForUpdate()" updater="text" module="PayrollScheduleUI" recordId="${employeePayrollLoanId}" fieldName="loanPaymentAmount">${loanPaymentAmount} <i class="fa fa-fw fa-money"></i></span>
                            </span>
                        </div>
                    <div>
                `;
                $(".PayrollScheduleUI-ListEmployeePayrollLoan").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadEmployeePayrollDeduction() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/getEmployeePayrollDeduction/${storage.lastEmployeePayrollId}`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".PayrollScheduleUI-ListEmployeePayrollDeduction").empty();
            $(data).each(function (index, obj) {
                var employeePayrollId = obj.getProp("EmployeePayrollId");
                var employeePayrollDeductionId = obj.getProp("employeePayrollDeductionId");
                var totalDeductionAmount = obj.getPropDefault("totalDeductionAmount", "0");
                var deductionName = obj.getProp("deductionName");
                var str = `  
                    <div style="flex: 50%; padding: 2px;">
                        <div class="info-box bg-yellow" style="padding: 5px; min-height:0px;">
                            <span class="info-box-text">${deductionName}</span>
                            <span class="info-box-number hand">
                                <span class="quickUpdaterCallback" placement="auto right" callback="payrollScheduleUI.chooseEmployeeForUpdate()" updater="text" module="PayrollScheduleUI" recordId="${employeePayrollDeductionId}" fieldName="totalDeductionAmount">${totalDeductionAmount} <i class="fa fa-fw fa-money"></i></span>
                            </span>
                        </div>
                    <div>
                `;
                $(".PayrollScheduleUI-ListEmployeePayrollDeduction").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadEmployeePayrollBenefit() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/getEmployeePayrollBenefit/${storage.lastEmployeePayrollId}`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".PayrollScheduleUI-ListEmployeePayrollBenefit").empty();
            $(data).each(function (index, obj) {
                var employeePayrollId = obj.getProp("EmployeePayrollId");
                var employeePayrollBenefitId = obj.getProp("employeePayrollBenefitId");
                var totalBenefitAmount = obj.getPropDefault("totalBenefitAmount", "0");
                var benefitName = obj.getProp("benefitName");
                var str = `  
                    <div style="flex: 50%; padding: 2px;">
                        <div class="info-box bg-green" style="padding: 5px; min-height:0px;">
                            <span class="info-box-text">${benefitName}</span>
                            <span class="info-box-number hand">
                                <span class="quickUpdaterCallback" placement="auto right" callback="payrollScheduleUI.chooseEmployeeForUpdate()" updater="text" module="PayrollScheduleUI" recordId="${employeePayrollBenefitId}" fieldName="totalBenefitAmount">${totalBenefitAmount} <i class="fa fa-fw fa-money"></i></span>
                            </span>
                        </div>
                    <div>
                `;
                $(".PayrollScheduleUI-ListEmployeePayrollBenefit").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadEmployeePayrollWorkHours() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/getEmployeePayrollWorkHours/${storage.lastEmployeePayrollId}`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".PayrollScheduleUI-ListEmployeePayrollDetail").empty();
            $(data).each(function (index, obj) {
                var employeePayrollId = obj.getProp("EmployeePayrollId");
                var employeeTimeSheetId = obj.getProp("employeeTimeSheetId");
                var employeePayrollDetailId = obj.getProp("employeePayrollDetailId");
                var workDate = obj.getProp("workDate");
                var workD = new Date(workDate);

                var totalHours = obj.getPropDefault("totalHours", "0");
                var totalHoursAmount = obj.getPropDefault("totalHoursAmount", "0");
                var totalOtHours = obj.getPropDefault("totalOtHours", "0");
                var totalOtAmount = obj.getPropDefault("totalOtAmount", "0");
                var attendanceType = obj.getPropDefault("attendanceType", "GENERATED");
                var dayName = obj.getPropDefault("attendanceType", "GENERATED");

                var background = "bg-aqua";
                var isWeekend = ([0, 6].indexOf(workD.getDay()) != -1);
                if (isWeekend) {
                    attendanceType = moment(workD).format("ddd");
                    background = "bg-yellow";
                }
                else {
                    attendanceType = moment(workD).format("ddd");
                }

                var colorHours = "gray";
                if (totalHours == 8 || totalHours == 0) {
                    colorHours = "white";
                }
                var colorOTHours = "gray";
                if (totalOtHours == 0) {
                    colorOTHours = "white";
                }
                var str = `  
                    <div class="" style="flex: 25%; padding: 2px;">
                        <div class="info-box ${background}" style="padding: 5px;">
                            <span class="info-box-text">${workDate} <span>[${attendanceType}]</span></span>
                            <span class="info-box-number hand" style="color: ${colorHours};">
                                <span class="quickUpdaterCallback" placement="auto right" callback="payrollScheduleUI.chooseEmployeeForUpdate()" updater="text" module="PayrollScheduleUI" recordId="${employeePayrollDetailId}" fieldName="totalHours"><i class="fa fa-fw fa-clock-o"></i>: ${totalHours} </span>
                                <span class="quickUpdaterCallback pull-right" placement="auto left" callback="payrollScheduleUI.chooseEmployeeForUpdate()" updater="text" module="PayrollScheduleUI" recordId="${employeePayrollDetailId}" fieldName="totalHoursAmount">${totalHoursAmount} <i class="fa fa-fw fa-money"></i></span>
                            </span>

                            <div class="progress">
                                <div class="progress-bar" style="width: 100%"></div>
                            </div>
                            <span class="progress-description hand" style="color: ${colorOTHours};">
                                <span class="info-box-number">
                                    <span class="quickUpdaterCallback" placement="auto right" callback="payrollScheduleUI.chooseEmployeeForUpdate()" updater="text" module="PayrollScheduleUI" recordId="${employeePayrollDetailId}" fieldName="totalOtHours">OT: ${totalOtHours} </span>
                                    <span class="quickUpdaterCallback pull-right" placement="auto left" callback="payrollScheduleUI.chooseEmployeeForUpdate()" updater="text" module="PayrollScheduleUI" recordId="${employeePayrollDetailId}" fieldName="totalOtAmount">${totalOtAmount} <i class="fa fa-fw fa-money"></i></span>
                                </span>
                            </span>
                        </div>
                    <div>
                `;
                $(".PayrollScheduleUI-ListEmployeePayrollDetail").append(str);
            });
            $(".chosenEmployeePayroll").html(storage.lastEmployeePayrollTitle);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    chooseEmployeeForUpdate(obj) {
        var recordId = "";
        var recordTitle = "";
        if (obj == null || obj == undefined) {
            recordId = storage.lastEmployeePayrollId;
            recordTitle = storage.lastEmployeePayrollTitle;
        }
        else {
            recordId = $(obj).attr("recordId");
            recordTitle = $(obj).attr("title");
        }
        storage.lastEmployeePayrollId = recordId;
        storage.lastEmployeePayrollTitle = recordTitle;
        payrollScheduleUI.loadEmployeePayrollWorkHours();
        payrollScheduleUI.loadEmployeePayrollDetails();
        // payrollScheduleUI.loadEmployeePayrollDeduction();
        // payrollScheduleUI.loadEmployeePayrollLoan();
        payrollScheduleUI.displayEmployeePayslipPreview();
    }

    saveEmployeePayrollDetail() {
        console.log("saveEmployeePayrollDetail called");
        var tmp = {};
        $(`.editEmployeePayrollDetail[module="EmployeePayrollUI"]`).each(function (index, myObj) {
            var name = $(myObj).attr("name");
            var value = $(myObj).val();

            tmp[name] = value;
        });
        console.log(tmp);
        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/post/saveEmployeePayrollDetail`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            payrollScheduleUI.arrangeEmployeePayrollDetails(data);
            showModalAny.show("Save Employee Payroll", "Saved Employee Payroll Detail!");
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    updateEmployeePayrolDetailAmount(obj) {
        var basicPay = $(`.editEmployeePayrollDetail[name="basicPay"]`).val();
        var totalOtAmount = $(`.editEmployeePayrollDetail[name="totalOtAmount"]`).val();

        var totalSSSAmount = $(`.editEmployeePayrollDetail[name="totalSSSAmount"]`).val();
        var totalAdjustmentAmount = $(`.editEmployeePayrollDetail[name="totalAdjustmentAmount"]`).val();
        var totalTaxAmount = $(`.editEmployeePayrollDetail[name="totalTaxAmount"]`).val();

        var totalGrossAmount = utils.parseFloatOrZero(basicPay) + utils.parseFloatOrZero(totalOtAmount);
        var totalDeductionAmount = utils.parseFloatOrZero(totalSSSAmount) + utils.parseFloatOrZero(totalAdjustmentAmount) + utils.parseFloatOrZero(totalTaxAmount);
        var totalNetAmount = totalGrossAmount - totalDeductionAmount;

        $(`.editEmployeePayrollDetail[name="totalGrossAmount"]`).val(totalGrossAmount);
        $(`.editEmployeePayrollDetail[name="totalDeductionAmount"]`).val(totalDeductionAmount);
        $(`.editEmployeePayrollDetail[name="totalNetAmount"]`).val(totalNetAmount);
    }

    loadEmployeePayrollDetails() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/getEmployeePayrollDetail/${storage.lastEmployeePayrollId}`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            payrollScheduleUI.arrangeEmployeePayrollDetails(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeEmployeePayrollDetails(data) {
        var employeePayrollId = data.getProp("employeePayrollId");
        var basicPay = data.getProp("basicPay");
        var totalOtAmount = data.getProp("totalOtAmount");

        var totalSSSAmount = data.getProp("totalSSSAmount");
        var totalAdjustmentAmount = data.getProp("totalAdjustmentAmount");
        var totalTaxAmount = data.getProp("totalTaxAmount");

        var totalGrossAmount = utils.parseFloatOrZero(basicPay) + utils.parseFloatOrZero(totalOtAmount);
        var totalDeductionAmount = utils.parseFloatOrZero(totalSSSAmount) + utils.parseFloatOrZero(totalAdjustmentAmount) + utils.parseFloatOrZero(totalTaxAmount);
        var totalNetAmount = totalGrossAmount - totalDeductionAmount;

        $(`.editEmployeePayrollDetail[name="employeePayrollId"]`).val(employeePayrollId);

        $(`.editEmployeePayrollDetail[name="basicPay"]`).val(basicPay);
        $(`.editEmployeePayrollDetail[name="totalOtAmount"]`).val(totalOtAmount);

        $(`.editEmployeePayrollDetail[name="totalSSSAmount"]`).val(totalSSSAmount);
        $(`.editEmployeePayrollDetail[name="totalAdjustmentAmount"]`).val(totalAdjustmentAmount);
        $(`.editEmployeePayrollDetail[name="totalTaxAmount"]`).val(totalTaxAmount);

        $(`.editEmployeePayrollDetail[name="totalGrossAmount"]`).val(totalGrossAmount);
        $(`.editEmployeePayrollDetail[name="totalDeductionAmount"]`).val(totalDeductionAmount);
        $(`.editEmployeePayrollDetail[name="totalNetAmount"]`).val(totalNetAmount);
    }

    choosePayrollSchedule(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/getEmployeePayrollList/${recordId}`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".PayrollScheduleUI-ListEmployeeForUpdate").empty();
            $(data).each(function (index, obj) {
                var recordId = obj.getProp("EmployeePayrollId");
                var firstName = obj.getProp("firstName");
                var lastName = obj.getProp("lastName");
                var basicPay = obj.getProp("basicPay");
                var monthlyRate = obj.getProp("monthlyRate");
                var dailyRate = obj.getProp("dailyRate");
                var hourlyRate = obj.getProp("hourlyRate");
                var payrollType = obj.getProp("payrollType");
                var taxPackage = obj.getProp("taxPackage");
                var str = `
                    <a href="#" class="btnChooseEmployeeForUpdate toggle-any" toggleTarget=".divEmployeePayroll_${recordId}" recordId="${recordId}" title="${lastName}, ${firstName}"><strong>${lastName}, ${firstName}</strong> [${basicPay}]</a>
                    <div class="text-muted divEmployeePayroll_${recordId}" style="display: none;">
                        Basic Pay: <span class="pull-right"><b>${basicPay}</b></span><br/>
                        Monthly Rate: <span class="pull-right"><b>${monthlyRate}</b></span><br/>
                        Daily Rate: <span class="pull-right"><b>${dailyRate}</b></span><br/>
                        Hourly Rate: <span class="pull-right"><b>${hourlyRate}</b></span><br/>
                        Tax: <span class="pull-right"><b>${taxPackage}</b></span><br/>
                        Type: <span class="pull-right"><b>${payrollType}</b></span>
                    </div>
                    <hr/>
                `;
                $(".PayrollScheduleUI-ListEmployeeForUpdate").append(str);
            });
            $(".chosenPayroll").html($(obj).attr("title"));
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadChoosePayrollList() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/getPayrollList/${payrollScheduleUI.chosenYear}/${payrollScheduleUI.chosenMonth + 1}`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".PayrollScheduleUI-ChoosePayrollList2").empty();
            $(data).each(function (index, obj) {
                var name = obj.getProp("name");
                var startDate = obj.getProp("cutOffStartDate");
                var endDate = obj.getProp("cutOffEndDate");
                var payrollTypes = obj.getProp("payrollTypes");
                var recordId = obj.getProp("PayrollScheduleId");
                var str = `
                    <div class="border-right" style="flex: 1; margin: 0px; 1px;">
                        <div class="description-block btnChoosePayrollSchedule hand" recordId="${recordId}" title="${name}">
                            <h5 class="description-header">${name}</h5>
                            <span class="description-text">${startDate}</span><br/>
                            <span class="description-text">${endDate}</span>
                        </div>
                    </div>
                `;
                $(".PayrollScheduleUI-ChoosePayrollList2").append(str);
            });
            $(".chosenYearAndMonth").html(payrollScheduleUI.chosenYear + "-" + payrollScheduleUI.monthNames[payrollScheduleUI.chosenMonth]);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    savePayroll() {
        console.log("SAVE PAYROLL CALLED");
        var payrollObj = new PayrollObj();
        payrollObj.payrollName = $(`.displayEdit[name="runPayrollName"]`).val();
        payrollObj.startDate = $(`.displayEdit[name="startDate"]`).val();
        payrollObj.endDate = $(`.displayEdit[name="endDate"]`).val();
        payrollObj.chosenYear = payrollScheduleUI.chosenYear;
        payrollObj.chosenMonth = payrollScheduleUI.chosenMonth + 1;

        var payrollTypes = [];
        $(".EmployeePayrollType_CheckBox:checked").each(function (index, obj) {
            var payrollType = $(obj).val();
            if (payrollType) {
                payrollTypes.push(payrollType);
            }
        });
        payrollObj.payrollTypes = payrollTypes;

        var employees = [];
        $(".AllEmployee_CheckBox:checked").each(function (index, obj) {
            var employee = $(obj).val();
            if (employee) {
                employees.push(employee);
            }
        });
        payrollObj.employees = employees;

        var vdata = JSON.stringify(payrollObj);
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/post/runPayroll`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    loadEmployeesForSelectedPayrollTypes() {
        var payrollTypes = [];
        $(".EmployeePayrollType_CheckBox:checked").each(function (index, obj) {
            var payrollType = $(obj).val();
            if (payrollType) {
                payrollTypes.push(payrollType);
            }
        });
        var vdata = JSON.stringify(payrollTypes);
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/post/getEmployeesForSelectedPayrollTypes`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            $(".PayrollScheduleUI_EmployeePayrollList").empty();
            $(data).each(function (index, obj) {
                var employeeName = obj.getProp("lastName") + ", " + obj.getProp("firstName");
                var personId = obj.getProp("personId");
                var str = `
                    <div class="checkbox col-md-4" style="flex: 1; margin: auto;">
                        <label>
                            <input class="AllEmployee_CheckBox" type="checkbox" value="${personId}" checked>
                            <b>${employeeName}</b>
                        </label>
                    <div>
                `;
                $(".PayrollScheduleUI_EmployeePayrollList").append(str);
            });
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    loadPayrollTypes() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/getEmployeePayrollTypes`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".PayrollScheduleUI_EmployeePayrollTypes").empty();
            $(data).each(function (index, obj) {
                var str = `
                    <div class="checkbox" style="flex: 1; margin: auto;">
                        <label>
                            <input class="EmployeePayrollType_CheckBox" type="checkbox" value="${obj}">
                            <b>${obj}</b>
                        </label>
                    </div>
                `;
                $(".PayrollScheduleUI_EmployeePayrollTypes").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadActiveMonth() {
        console.log("Called Load Active Month");
        var months = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

        var dt = new Date();
        var currentMonth = months[dt.getMonth()];
        var prevMonth = months[(dt.getMonth() > 0) ? dt.getMonth() - 1 : -1];
        var nextMonth = months[(dt.getMonth() > 11) ? 1 : dt.getMonth() + 1];
        $(months).each(function (index, obj) {
            $(`[module="PayrollScheduleUI"][month="${obj}"]`).removeClass("bg-active-month");
            $(`[module="PayrollScheduleUI"][month="${obj}"]`).removeClass("bg-inactive-month");
            $(`[module="PayrollScheduleUI"][month="${obj}"]`).removeClass("bg-before-active-month");
            $(`[module="PayrollScheduleUI"][month="${obj}"]`).removeClass("bg-after-active-month");
            if (currentMonth == obj) {
                $(`[module="PayrollScheduleUI"][month="${obj}"]`).addClass("bg-active-month");
                $(`[module="PayrollScheduleUI"][month="${obj}"] a.status-display`).html("Current");
            }
            else if (prevMonth == obj) {
                $(`[module="PayrollScheduleUI"][month="${obj}"]`).addClass("bg-before-active-month");
                $(`[module="PayrollScheduleUI"][month="${obj}"] a.status-display`).html("Past");
            }
            else if (nextMonth == obj) {
                $(`[module="PayrollScheduleUI"][month="${obj}"]`).addClass("bg-after-active-month");
                $(`[module="PayrollScheduleUI"][month="${obj}"] a.status-display`).html("Next");
            }
            else {
                $(`[module="PayrollScheduleUI"][month="${obj}"]`).addClass("bg-inactive-month");
                $(`[module="PayrollScheduleUI"][month="${obj}"] a.status-display`).html("-- --");
            }
        });
        $(".PayrollMonthName").html(payrollScheduleUI.monthNames[payrollScheduleUI.chosenMonth]);
        $(".PayrollYear").html(payrollScheduleUI.chosenYear);
        payrollScheduleUI.loadPayrollDetailForMonth();
    }

    loadPayrollDetailForMonth() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PayrollScheduleUI/loadPayrollDetailForMonth/${payrollScheduleUI.chosenYear}/${payrollScheduleUI.chosenMonth + 1}`;
        console.log(url);
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }
}
