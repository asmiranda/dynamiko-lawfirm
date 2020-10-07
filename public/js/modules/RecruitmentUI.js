class RecruitmentUI { 
    changeMainId(obj) {
        utils.loadRecordToForm(obj, hrRequisitionUI);
        hrRequisitionUI.reArrange(obj);
        // hrRequisitionUI.loadFulfilled(obj);
    }

    doMainSearchData(evt) {
        hrRequisitionUI.doMainSearchData(evt);
    }

    changeModule(evt) {
        employeeUI.init();

        personTaskUI.loadTodoList();
        hrRequisitionUI.loadStages();
        hrRequisitionUI.loadForInterview();
        hrRequisitionUI.loadForOffer();

        hrRequisitionUI.loadApplicants();
        employeeUI.loadTopEmployees();
        hrRequisitionUI.loadTopJobs();
        hrRequisitionUI.loadTopFulfilledJobs();
    }


    init() { 
        $("#dynamikoMainSearch").hide();
    }
}

