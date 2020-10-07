class GlobalEventsHr {
    initializeGlobalEvents() {
        

        $(document).on('click', '.employeeSelect[module="EmployeeUI"][tabName="RecruitersAndManagers"]', function() {
            hrRequisitionUI.selectEmployee(this);
        });
        $(document).on('click', '.applicantSelect[module="HrRequisitionUI"]', function() {
            hrRequisitionUI.selectApplicant(this);
        });
        $(document).on('keyup', '.searchApplicantFilter[module="HrRequisitionUI"]', function() {
            hrRequisitionUI.searchApplicantFilter(this);
        });
        $(document).on('click', '.employeeSelect[module="EmployeeUI"]', function() {
            employeeUI.selectEmployee(this);
        });
        $(document).on('keyup', '.searchEmployeeFilter[module="EmployeeUI"]', function() {
            employeeUI.searchEmployeeFilter(this);
        });
        $(document).on('click', '.btnRemoveSupervisor', function() {
            employeeUI.removeSupervisor(this);
        });
        $(document).on('click', '.btnRemoveTeamMember', function() {
            employeeUI.removeTeamMember(this);
        });


        $(document).on('click', '.btnSaveEmployeePayrollDetail', function() {
            payrollScheduleUI.saveEmployeePayrollDetail(this);
        });
        $(document).on('keyup', 'input.editEmployeePayrollDetail', function() {
            payrollScheduleUI.updateEmployeePayrolDetailAmount(this);
        });
        $(document).on('change', '#selectPayrollYear', function() {
            payrollScheduleUI.changePayrollPeriod(this, "year");
        });
        $(document).on('click', '.btnPayrollMonth', function() {
            payrollScheduleUI.changePayrollPeriod(this, "month");
        });

        $(document).on('click', '.btnChooseEmployeeForUpdate', function() {
            payrollScheduleUI.chooseEmployeeForUpdate(this);
        });
        $(document).on('click', '.btnChoosePayrollSchedule', function() {
            payrollScheduleUI.choosePayrollSchedule(this);
        });
        $(document).on('click', '.btnSavePayroll', function() {
            payrollScheduleUI.savePayroll();
        });
        $(document).on('click', '.EmployeePayrollType_CheckBox', function() {
            payrollScheduleUI.loadEmployeesForSelectedPayrollTypes();
        });

                
        $(document).on('click', '.HrRequisitionUI_btnCancelInterview', function() {
            hrRequisitionUI.cancelInterview(this);
        });
        $(document).on('click', '.HrRequisitionUI_btnAddInterviewScheduleClose', function() {
            hrRequisitionUI.addInterviewScheduleAndClose(this);
        });
        $(document).on('click', '.HrRequisitionUI_btnGotoApplicantProfile', function() {
            hrRequisitionUI.gotoApplicantProfile(this);
        });
        $(document).on('click', '.HrRequisitionUI_btnGotoRecruiterManagerProfile', function() {
            hrRequisitionUI.gotoRecruitersAndManagersProfile(this);
        });
        $(document).on('click', '.HrRequisitionUI_btnGotoJobListing', function() {
            hrRequisitionUI.gotoJobListing(this);
        });
        $(document).on('click', '.HrRequisitionUI_loadSelectedJob', function() {
            hrRequisitionUI.loadSelectedJob(this);
        });


        $(document).on('click', '.btnAcceptApplicant', function() {
            hrRequisitionUI.acceptApplicant(this);
        });
        $(document).on('click', '.btnCreateJob', function() {
            hrRequisitionUI.createJob(this);
        });
        $(document).on('click', '.btnRemoveApplicant', function() {
            hrRequisitionUI.removeApplicant(this);
        });
    }
}
