class HrRequisitionUI {
    changeMainId(obj) {
        utils.loadRecordToForm(obj, hrRequisitionUI);
        hrRequisitionUI.reArrange(obj);
        // hrRequisitionUI.loadFulfilled(obj);
    }

    doMainSearchData(evt) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/quickMainSearcher/${storage.filterText}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".quickMainSearcherResult").empty();
            $(data).each(function (index, obj) {
                var title = obj.getPropDefault("title", "Title Not Specified");
                var recruiter = obj.getPropDefault("recruiter", "Recruiter not chosen");
                var manager = obj.getPropDefault("manager", "Manager not chosen");
                var numberOfFulfilled = obj.getPropDefault("numberOfFulfilled", "0");
                var numberOfOpening = obj.getPropDefault("numberOfOpening");
                var hrRequisitionId = obj.getPropDefault("hrRequisitionId");
                var status = "";
                if (numberOfFulfilled == numberOfOpening) {
                    status = "Completed"
                }
                else {
                    status = `${numberOfFulfilled} completed of requested ${numberOfOpening}`;
                }
                var str = `
                    <a href="#" class="loadRecordToForm" module="HrRequisitionUI" recordid="${hrRequisitionId}" style="font-weight: bold;">${title}</a>
                    <p class="text-muted">
                        Recruiter: ${recruiter}<br/>
                        Manager: ${manager}<br/>
                        Status: ${status}
                    </p>
                    <hr>
                `
                $(".quickMainSearcherResult").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
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

    loadSelectedJob(obj) {
        var tabName = $(obj).attr("tabName");
        console.log(tabName);

        if (tabName == "JobListing") {
            utils.loadRecordToForm(obj, hrRequisitionUI);
        }
        else if (tabName == "Fulfilled") {
            hrRequisitionUI.loadFulfilled(obj);
        }
    }

    loadTopFulfilledJobs() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getTopFulfilled`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log("Arrange Top Fulfilled Requisition");
            hrRequisitionUI.arrangeFulfilled(data, "Fulfilled");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadFulfilled(obj) {
        var tabName = $(obj).attr("tabName");
        var hrRequisitionId = $(obj).val() == "" ? $(obj).attr("recordId") : $(obj).val();
        console.log("Arrange Fulfilled Requisition for record ID === " + hrRequisitionId);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getFulfilled/${hrRequisitionId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log("Arrange Fulfilled Requisition for record ID === " + hrRequisitionId);
            hrRequisitionUI.arrangeFulfilled(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeFulfilled(data, tabName) {
        console.log(data);
        var divName = `.HrRequisitionUI_FulfilledList`;
        $(divName).empty();
        var lastIndex = data.length - 1;
        $(data).each(function (index, obj) {
            var requisitionId = obj.getProp("hrRequisitionId");
            var applicantId = obj.getProp("hrApplicantId");
            var title = obj.getProp("requisitionTitle");
            var applicant = obj.getProp("applicant");
            var manager = obj.getProp("manager");
            var recruiter = obj.getProp("recruiter");
            var email = obj.getProp("email");
            var contact = obj.getProp("contact");
            var companyCode = obj.getProp("companyCode");
            var personId = obj.getProp("personId");

            var strUpload = `<a href="#" class="btn btn-box-tool quickAttachmentTarget" module="HrApplicantUI" recordId="${applicantId}" fileType="RESUME" title="Upload Resume"><i class="fa fa-paperclip"> </i> </a>`;
            var strDownload = `<a href="#" class="btn btn-box-tool quickDownloaderTarget" module="HrApplicantUI" recordId="${applicantId}" fileType="RESUME" title="Download Resume"><i class="fa fa-download"> </i> </a>`;

            var marginAdditional = null;
            if (index == 0) {
                marginAdditional = "margin-left: 0px;";
            }
            else if (lastIndex == index) {
                marginAdditional = "margin-right: 0px;";
            }
            var strHtml = `
                <div style="flex: 30%; margin: 5px; ${marginAdditional}">
                    <div class="box box-default">
                        <div class="box-header text-left toggle-box" style="padding-bottom: 0px;" toggleTarget=".box${applicantId}">
                            <div>
                                <div class="box-title">
                                    <h3 class="box-title">
                                        <a href="#" class="formLinker" recordId="${personId}" linkModule="EmployeeUI">${applicant}</a>
                                    </h3><br/>
                                    <small>${title}</small>
                                </div>
                                <div class="box-tools pull-right">
                                    <img class="img-responsive formLinker img-circle img-bordered-sm profilePic" style="height:57px;" linkModule="HrApplicantUI" recordId="${applicantId}" src="${MAIN_URL}/api/generic/${companyCode}/profilePic/HrApplicantUI/${applicantId}/${utils.nowString()}" requisitionId="${requisitionId}" applicantId="${applicantId}">
                                </div>
                            </div>
                        </div>
                        <div class="box-body text-left box${applicantId}" style="padding-left: 17px;">
                            <span>${email} - ${contact}</span><br/>
                            <span>Manager: ${manager}</span><br/>
                            <span>Recruiter: ${recruiter}</span><br/>
                            <span>Resume: ${strUpload} ${strDownload}</span>
                        </div>
                    </div>
                </div>
            `;
            $(divName).append(strHtml);
        });
    }

    loadTopJobs() {
        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getTopJobs`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            hrRequisitionUI.arrangeSearchedJobs(data, "JobListing");
            hrRequisitionUI.arrangeSearchedJobs(data, "Fulfilled");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedJobs(data, tabName) {
        var divSelector = `.HrRequisitionUI_SearchJobs[tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var numberOfOpening = obj.getProp("numberOfOpening");
            var recruiterName = obj.getProp("recruiterName");
            var managerName = obj.getProp("managerName");
            var requisitionTitle = obj.getProp("requisitionTitle");
            var recruiterId = obj.getProp("recruiterId");
            var managerId = obj.getProp("managerId");
            var targetStartDate = obj.getProp("targetStartDate");
            var hrRequisitionId = obj.getProp("hrRequisitionId");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 50;">
                        <p class="text-muted">
                            <span><a href="#" class="HrRequisitionUI_loadSelectedJob" recordId="${hrRequisitionId}" module="HrRequisitionUI" tabName="${tabName}">${requisitionTitle}</a></span>
                        </p>
                    </div>
                    <div style="flex: 25%">
                        <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> ${targetStartDate}</small>
                    </div>
                    <div style="flex: 25%">
                        <span class="pull-right">Opening: ${numberOfOpening}</span><br/>
                    </div>
                    <div style="flex: 90%">
                        <span>Hiring Manager: ${managerName}</span><br/>
                        <span>Partner Recruiter: ${recruiterName}</span>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divSelector).append(str);
        });
    }

    selectEmployee(obj) {
        var tabName = $(obj).attr("tabName");
        console.log(tabName);

        if (tabName == "RecruitersAndManagers") {
            employeeUI.loadEmployeeProfile(obj);
            hrRequisitionUI.loadEmployeeRequisition(obj);
            hrRequisitionUI.loadEmployeeInterviewSchedule(obj);
        }
    }

    selectApplicant(obj) {
        // var recordId = $(obj).attr("recordId");
        var tabName = $(obj).attr("tabName");
        console.log(tabName);

        if (tabName == "Applicants") {
            hrRequisitionUI.loadApplicantProfile(obj);
            hrRequisitionUI.loadApplicantReference(obj);
            hrRequisitionUI.loadApplicantExperience(obj);
            hrRequisitionUI.loadApplicantInterviewSchedule(obj);
        }
    }

    loadEmployeeRequisition(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getEmployeeRequisition/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            if (data.length == 0) {
                var divSelector = `.HrRequisitionUI_EmployeeJobList[tabName="RecruitersAndManagers"]`;
                $(divSelector).empty();
                $(divSelector).append("<b>No  Schedule Found!</b>");
            }
            else {
                hrRequisitionUI.arrangeEmployeeRequisition(".HrRequisitionUI_EmployeeJobList", "RecruitersAndManagers", data);
            }
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeEmployeeRequisition(divName, tabName, data) {
        var divSelector = `${divName}[tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var numberOfOpening = obj.getProp("numberOfOpening");
            var recruiterName = obj.getProp("recruiterName");
            var managerName = obj.getProp("managerName");
            var requisitionTitle = obj.getProp("requisitionTitle");
            var recruiterId = obj.getProp("recruiterId");
            var managerId = obj.getProp("managerId");
            var targetStartDate = obj.getProp("targetStartDate");
            var hrRequisitionId = obj.getProp("hrRequisitionId");
            var str = `
                <div style="display: flex;">
                    <div style="flex: 50;">
                        <p class="text-muted">
                            <span><a href="#" class="HrRequisitionUI_btnGotoJobListing" recordId="${hrRequisitionId}" module="HrRequisitionUI">${requisitionTitle}</a></span>
                        </p>
                        <span>Hiring Manager: <a href="#" class="HrRequisitionUI_btnGotoManagerProfile" recordId="${managerId}">${managerName}</a></span><br/>
                        <span>Partner Recruiter: <a href="#" class="HrRequisitionUI_btnGotoRecruiterProfile" recordId="${recruiterId}">${recruiterName}</a>
                    </div>
                    <div style="flex: 25%">
                        <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> ${targetStartDate}</small>
                    </div>
                    <div style="flex: 25%">
                        <span class="pull-right">Opening: ${numberOfOpening}</span><br/>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divSelector).append(str);
        });
    }

    loadEmployeeInterviewSchedule(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getEmployeeInterviewSchedule/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            if (data.length == 0) {
                var divSelector = `.HrRequisitionUI_ScheduleList[tabName="RecruitersAndManagers"]`;
                $(divSelector).empty();
                $(divSelector).append("<b>No  Schedule Found!</b>");
            }
            else {
                hrRequisitionUI.arrangePersonSchedule(".HrRequisitionUI_ScheduleList", "RecruitersAndManagers", data);
            }
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadApplicantInterviewSchedule(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getApplicantInterviewSchedule/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            if (data.length == 0) {
                var divSelector = `.HrRequisitionUI_ScheduleList[tabName="Applicants"]`;
                $(divSelector).empty();
                $(divSelector).append("<b>No  Schedule Found!</b>");
            }
            else {
                hrRequisitionUI.arrangePersonSchedule(".HrRequisitionUI_ScheduleList", "Applicants", data);
            }
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangePersonSchedule(divName, tabName, data) {
        var divSelector = `${divName}[tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var applicantName = obj.getProp("applicantName");
            var recruiterName = obj.getProp("recruiterName");
            var managerName = obj.getProp("managerName");
            var interviewDate = obj.getProp("interviewDate");
            var requisitionTitle = obj.getProp("requisitionTitle");
            var hrApplicantId = obj.getProp("hrApplicantId");
            var recruiterId = obj.getProp("recruiterId");
            var managerId = obj.getProp("managerId");
            var hrRequisitionId = obj.getProp("hrRequisitionId");
            var hrRequisitionApplicantInterviewId = obj.getProp("hrRequisitionApplicantInterviewId");
            var str = `
                <div style="display: flex;">
                    <div class="text-center" style="flex: 10%">
                        <img class="img-circle img-bordered-sm profilePic" name="profilePic" module="HrApplicantUI" src="${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/HrApplicantUI/${hrApplicantId}/${utils.nowString()}" alt="user image" style="width: 40px; height: 40px;"/>
                    </div>
                    <div style="flex: 50%">
                        <a href="#" class="HrRequisitionUI_btnGotoApplicantProfile" recordId="${hrApplicantId}">${applicantName}</a></span> look for 
                        <span><a href="#" class="HrRequisitionUI_btnGotoRecruiterProfile" recordId="${recruiterId}">${recruiterName}</a>
                        <p class="text-muted">
                            <span><a href="#" class="HrRequisitionUI_btnGotoJobListing" recordId="${hrRequisitionId}" module="HrRequisitionUI">${requisitionTitle}</a></span> for 
                            <span><a href="#" class="HrRequisitionUI_btnGotoManagerProfile" recordId="${managerId}">${managerName}</a></span>
                        </p>
                    </div>
                    <div style="flex: 25%">
                        <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 
                            <span>
                                <a href="#" class="quickUpdaterTarget" updater="calendar" module="HrRequisitionUI" recordId="${hrRequisitionApplicantInterviewId}" fieldName="interviewDate">${interviewDate}</a>
                            </span>
                        </small>
                    </div>
                    <div style="flex: 15%">
                        <div class="tools pull-right hand">
                            <i class="fa fa-trash-o HrRequisitionUI_btnCancelInterview" recordId="${hrRequisitionApplicantInterviewId}" module="HrRequisitionUI"> Cancel</i>
                        </div>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divSelector).append(str);
        });
    }

    loadApplicantExperience(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getApplicantExperience/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            $(".HrRequisitionUI_ApplicantExperienceList").empty();
            $(data).each(function (index, obj) {
                var personExperienceId = obj.getPropDefault("personExperienceId", "");
                var startDate = obj.getPropDefault("startDate", "");
                var endDate = obj.getPropDefault("endDate", "");
                var company = obj.getPropDefault("company", "");
                var title = obj.getPropDefault("title", "");
                var experience = obj.getPropDefault("experience", "");
                var str = `
                    <li class="time-label">
                        <span class="bg-red">
                            ${startDate}
                        </span>
                        <div class="box-tools pull-right" data-toggle="tooltip" title="">
                            <a class="btn" style="padding: 2px;"><i class="fa fa-edit hand btnAddApplicantExperience" recordId="${personExperienceId}"></i></a>
                            <a class="btn" style="padding: 2px;"><i class="fa fa-trash-o hand btnDeleteApplicantExperience" recordId="${personExperienceId}"></i></a>
                        </div>
                    </li>
                    <li>
                        <i class="fa fa-fw fa-gear bg-blue"></i>
                        <div class="timeline-item">
                            <span class="time"><i class="fa fa-clock-o"></i> till ${endDate}</span>
                            <h3 class="timeline-header"><a href="#">${title}</a> for ${company}</h3>
                            <div class="timeline-body">
                                ${experience}
                            </div>
                        </div>
                    </li>
                `;
                $(".HrRequisitionUI_ApplicantExperienceList").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadApplicantReference(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getApplicantReference/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            $(".HrRequisitionUI_Applicants_Reference").empty();
            $(data).each(function (index, obj) {
                var personReferenceId = obj.getPropDefault("personReferenceId", "");
                var firstName = obj.getPropDefault("firstName", "");
                var lastName = obj.getPropDefault("lastName", "");
                var company = obj.getPropDefault("company", "");
                var email = obj.getPropDefault("email", "");
                var contact = obj.getPropDefault("contact", "");
                var referenceName = firstName + " " + lastName;
                var referenceContact = email;
                var str = `
                    <li class="list-group-item">
                        <b class="HrRequisitionUI_Applicants_Reference_Name" recordId="${personReferenceId}">${referenceName}</b> of ${company} 
                        <div class="box-tools pull-right" data-toggle="tooltip" title="">
                            <a class="HrRequisitionUI_Applicants_Reference_Contact" style="padding: 2px;" recordId="${personReferenceId}">${referenceContact}</a>
                            <a class="btn" style="padding: 2px;"><i class="fa fa-edit hand btnAddApplicantReference" recordId="${personReferenceId}"></i></a>
                            <a class="btn" style="padding: 2px;"><i class="fa fa-trash-o hand btnDeleteApplicantReference" recordId="${personReferenceId}"></i></a>
                        </div>
                    </li>
                `;
                $(".HrRequisitionUI_Applicants_Reference").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadApplicantProfile(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getApplicantProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            var applicantName = data.getProp("firstName") + " " + data.getProp("lastName");
            var job = data.getProp("specialization");
            var email = data.getProp("email");
            var contact = data.getProp("contact");

            $(".HrRequisitionUI_Applicants_ApplicantName").html(applicantName);
            $(".HrRequisitionApplicantUI_Applicants_ApplicantJob").html(job);
            $(".HrRequisitionApplicantUI_Applicants_ApplicantEmail").html(email);
            $(".HrRequisitionApplicantUI_Applicants_ApplicantContact").html(contact);
            $(".HrRequisitionUI_Applicants_ApplicantPic").attr("src", `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/HrApplicantUI/${recordId}/${utils.nowString()}`);
            $(".HrRequisitionUI_Applicants_ApplicantPic").attr("recordId", recordId);
            $(".HrRequisitionUI_Applicants_ApplicantPic").show();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    searchApplicantFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getTopApplicants/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            hrRequisitionUI.arrangeSearchedApplicant(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadApplicants() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getTopApplicants`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            hrRequisitionUI.arrangeSearchedApplicant(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeSearchedApplicant(data) {
        var divName = `.HrRequisitionUI_ApplicantSearchList`;
        $(divName).empty();
        var tabName = $(divName).attr("tabName");
        $(data).each(function (index, obj) {
            var applicantName = obj.getProp("firstName") + " " + obj.getProp("lastName");
            var email = obj.getPropDefault("email", "");
            var specialization = obj.getPropDefault("specialization", "");
            var recordId = obj.getProp("hrApplicantId");
            var str = `
                <a href="#" class="applicantSelect" module="HrRequisitionUI" tabName="${tabName}" recordId="${recordId}" style="font-weight: bolder;">${applicantName}</a>
                <span class="text-muted">
                    ${email} - ${specialization}
                </span>
                <hr>
            `;
            $(divName).append(str);
        });
    }

    cancelInterview(obj) {
        console.log("Called cancelInterview");
        var recordId = $(obj).attr("recordId");

        var str = `
            <div class="form-group">
                <label class="control-label">Reason for cancelling</label>
                <input type="text" class="form-control displayEdit" name="HrRequisitionUI_ReasonForCancelling" placeholder="Reason" module="HrRequisitionUI" mainmodule="HrRequisitionUI">
            </div>
        `;
        var success = function () {
            var reason = $(`input[name="HrRequisitionUI_ReasonForCancelling"]`).val();
            console.log(recordId + "\t" + reason);

            var tmp = {};
            tmp["recordId"] = recordId;
            tmp["remarks"] = reason;

            var vdata = JSON.stringify(tmp);
            var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/post/cancelInterviewSchedule`;
            var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);

            var successFunction = function (data) {
                console.log(data);
                hrRequisitionUI.arrangeForInterviewSchedule(data);
            };
            ajaxCaller.ajaxPost(ajaxRequestDTO, successFunction);
        }
        showConfirmAny.confirm("Reason for cancelling", str, success);
    }

    gotoApplicantProfile(obj) {
        console.log("Called gotoApplicantProfile");
        var recordId = $(obj).attr("recordId");
        console.log("RecordId == " + recordId);
        $(`.nav-tabs a[href="#Applicants"]`).tab('show');
        hrRequisitionUI.selectApplicant(obj);
    }
    gotoRecruitersAndManagersProfile(obj) {
        console.log("Called gotoRecruitersAndManagersProfile");
        var recordId = $(obj).attr("recordId");
        console.log("RecordId == " + recordId);
        $(`.nav-tabs a[href="#RecruitersAndManagers"]`).tab('show');
        hrRequisitionUI.selectEmployee(obj);
    }
    gotoJobListing(obj) {
        console.log("Called gotoJobListing");
        var recordId = $(obj).attr("recordId");
        console.log("RecordId == " + recordId);
        $(`.nav-tabs a[href="#JobListing"]`).tab('show');
        utils.loadRecordToForm(obj, hrRequisitionUI);
    }

    addInterviewScheduleAndClose(obj) {
        var jobCode = $(`input.HiddenAutoComplete[name="HrRequisitionUI_NewInterviewScheduleJobCode"]`).val();
        var lookForCode = $(`input.HiddenAutoComplete[name="HrRequisitionUI_NewInterviewScheduleLookForCode"]`).val();
        var applicantCode = $(`input.HiddenAutoComplete[name="HrRequisitionUI_NewInterviewScheduleApplicantCode"]`).val();
        var interviewDate = $(`input[name="HrRequisitionUI_NewInterviewScheduleInterviewDate"]`).val();
        var remarks = $(`input[name="HrRequisitionUI_NewInterviewScheduleInterviewRemarks"]`).val();

        var tmp = {};
        tmp["jobCode"] = jobCode;
        tmp["applicantCode"] = applicantCode;
        tmp["lookForCode"] = lookForCode;
        tmp["interviewDate"] = interviewDate;
        tmp["remarks"] = remarks;

        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/post/addInterviewSchedule`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);

        var successFunction = function (data) {
            console.log(data);
            hrRequisitionUI.arrangeForInterviewSchedule(data);
            $('#HrRequisitionUI_AddInterviewScheduleDialog').modal('toggle');
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successFunction);
    }

    loadForInterview() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getForInterview`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            hrRequisitionUI.arrangeForInterviewSchedule(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeForInterviewSchedule(data) {
        $(".HrRequisitionUI_InterviewScheduleList").empty();
        $(data).each(function (index, obj) {
            var applicantName = obj.getProp("applicantName");
            var recruiterName = obj.getProp("recruiterName");
            var managerName = obj.getProp("managerName");
            var interviewDate = obj.getProp("interviewDate");
            var requisitionTitle = obj.getProp("requisitionTitle");
            var hrApplicantId = obj.getProp("hrApplicantId");
            var recruiterId = obj.getProp("recruiterId");
            var managerId = obj.getProp("managerId");
            var hrRequisitionId = obj.getProp("hrRequisitionId");
            var hrRequisitionApplicantInterviewId = obj.getProp("hrRequisitionApplicantInterviewId");
            var str = `
                <div style="display: flex;">
                    <div class="text-center" style="flex: 10%">
                        <img class="img-circle img-bordered-sm profilePic" name="profilePic" module="HrApplicantUI" src="${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/HrApplicantUI/${hrApplicantId}/${utils.nowString()}" alt="user image" style="width: 40px; height: 40px;"/>
                    </div>
                    <div style="flex: 50%">
                        <a href="#" class="HrRequisitionUI_btnGotoApplicantProfile" recordId="${hrApplicantId}">${applicantName}</a></span> look for 
                        <span><a href="#" class="HrRequisitionUI_btnGotoRecruiterManagerProfile" recordId="${recruiterId}" tabName="RecruitersAndManagers">${recruiterName}</a>
                        <p class="text-muted">
                            <span><a href="#" class="HrRequisitionUI_btnGotoJobListing" recordId="${hrRequisitionId}" module="HrRequisitionUI">${requisitionTitle}</a></span> for 
                            <span><a href="#" class="HrRequisitionUI_btnGotoRecruiterManagerProfile" recordId="${managerId}" tabName="RecruitersAndManagers">${managerName}</a></span>
                        </p>
                    </div>
                    <div style="flex: 25%">
                        <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 
                            <span>
                                <a href="#" class="quickUpdaterTarget" updater="calendar" module="HrRequisitionUI" recordId="${hrRequisitionApplicantInterviewId}" fieldName="interviewDate">${interviewDate}</a>
                            </span>
                        </small>
                    </div>
                    <div style="flex: 15%">
                        <div class="tools pull-right hand">
                            <i class="fa fa-trash-o HrRequisitionUI_btnCancelInterview" recordId="${hrRequisitionApplicantInterviewId}" module="HrRequisitionUI"> Cancel</i>
                        </div>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(".HrRequisitionUI_InterviewScheduleList").append(str);
        });
    }

    loadForOffer() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getForOffer`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);

            $(".HrRequisitionUI_OfferScheduleList").empty();
            $(data).each(function (index, obj) {
                var applicantName = obj.getProp("applicantName");
                var recruiterName = obj.getProp("recruiterName");
                var managerName = obj.getProp("managerName");
                var interviewDate = obj.getProp("interviewDate");
                var requisitionTitle = obj.getProp("requisitionTitle");
                var hrApplicantId = obj.getProp("hrApplicantId");
                var recruiterId = obj.getProp("recruiterId");
                var managerId = obj.getProp("managerId");
                var hrRequisitionId = obj.getProp("hrRequisitionId");
                var hrRequisitionApplicantInterviewId = obj.getProp("hrRequisitionApplicantInterviewId");
                var str = `
                    <div style="display: flex;">
                        <div class="text-center" style="flex: 10%">
                            <img class="img-circle img-bordered-sm profilePic" name="profilePic" module="HrApplicantUI" src="${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/HrApplicantUI/${hrApplicantId}/${utils.nowString()}" alt="user image" style="width: 40px; height: 40px;"/>
                        </div>
                        <div style="flex: 50%">
                            <a href="#" class="HrRequisitionUI_btnGotoApplicantProfile" recordId="${hrApplicantId}">${applicantName}</a></span> look for 
                            <span><a href="#" class="HrRequisitionUI_btnGotoRecruiterManagerProfile" recordId="${recruiterId}" tabName="RecruitersAndManagers">${recruiterName}</a>
                            <p class="text-muted">
                                <span><a href="#" class="HrRequisitionUI_btnGotoJobListing" recordId="${hrRequisitionId}" module="HrRequisitionUI">${requisitionTitle}</a></span> for 
                                <span><a href="#" class="HrRequisitionUI_btnGotoRecruiterManagerProfile" recordId="${managerId}" tabName="RecruitersAndManagers">${managerName}</a></span>
                            </p>
                        </div>
                        <div style="flex: 40%">
                            <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 
                                <span>
                                    <a href="#" class="quickUpdaterTarget" updater="calendar" module="HrRequisitionUI" recordId="${hrRequisitionApplicantInterviewId}" fieldName="interviewDate">${interviewDate}</a>
                                </span>
                            </small>
                        </div>
                    </div>
                    <hr style="margin-top: 5px; width: 98%">
                `;
                $(".HrRequisitionUI_OfferScheduleList").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadStages() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/getRecruitmentStages`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            $(".HrRequisitionUI_CandidateCount").html("0");
            $(".HrRequisitionUI_OpenJobsCount").html("0");
            $(".HrRequisitionUI_ScheduleThisWeek").html("0");

            $(".HrRequisitionUI_TotalNewApplication").html("0");
            $(".HrRequisitionUI_TotalForInterview").html("0");
            $(".HrRequisitionUI_TotalForOffer").html("0");
            $(".HrRequisitionUI_TotalFulfilled").html("0");

            $(data).each(function (index, obj) {
                var key = obj.getProp("key");
                var value = obj.getProp("value");
                if (key == "INTERVIEW") {
                    $(".HrRequisitionUI_TotalForInterview").html(value);
                }
                else if (key == "OFFER") {
                    $(".HrRequisitionUI_TotalForOffer").html(value);
                }
                else if (key == "NEW") {
                    $(".HrRequisitionUI_TotalNewApplication").html(value);
                }
                else if (key == "FULFILLED") {
                    $(".HrRequisitionUI_TotalFulfilled").html(value);
                }
                else if (key == "APPLICANT_COUNT") {
                    $(".HrRequisitionUI_CandidateCount").html(value);
                }
                else if (key == "OPEN_JOBS") {
                    $(".HrRequisitionUI_OpenJobsCount").html(value);
                }
                else if (key == "SCHEDULE_THIS_WEEK") {
                    $(".HrRequisitionUI_ScheduleThisWeek").html(value);
                }
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    showAddTask(obj) {
        $(`input[name="HrRequisitionUI_TaskId"]`).val("");
        $(`input[name="HrRequisitionUI_TaskName"]`).val("");
        $(`input[name="HrRequisitionUI_TaskDate"]`).val("");
    }

    showUpdateTask(obj) {
        var recordId = $(obj).attr("recordId");
        var taskName = $(`.HrRequisitionUI_Task[recordId="${recordId}"][name="taskName"]`).html();
        var taskDate = $(`.HrRequisitionUI_Task[recordId="${recordId}"][name="taskDate"]`).attr("value");
        $(`input[name="HrRequisitionUI_TaskId"]`).val(recordId);
        $(`input[name="HrRequisitionUI_TaskName"]`).val(taskName);
        $(`input[name="HrRequisitionUI_TaskDate"]`).val(taskDate);
    }

    deleteTask(obj) {
        var taskId = $(obj).attr("recordId");

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/deleteTask/${taskId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            hrRequisitionUI.arrangeTodoList(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    saveTask(obj, nextAction) {
        var taskId = $(`input[name="HrRequisitionUI_TaskId"]`).val();
        var taskName = $(`input[name="HrRequisitionUI_TaskName"]`).val();
        var taskDate = $(`input[name="HrRequisitionUI_TaskDate"]`).val();

        var tmp = {};
        tmp["taskId"] = taskId;
        tmp["name"] = taskName;
        tmp["taskDate"] = taskDate;

        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/post/saveTask`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);

        var successFunction = function (data) {
            console.log(data);
            hrRequisitionUI.arrangeTodoList(data);
            if (nextAction == "CLOSE") {
                $('#HrRequisitionUI_TaskDialog').modal('toggle');
            }
            else {
                $(`input[name="HrRequisitionUI_TaskName"]`).val("");
                $(`input[name="HrRequisitionUI_TaskDate"]`).val("")
            }
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successFunction);
    }

    loadTodoList() {
        console.log("loadTodoList");

        var ajaxRequestDTO = new AjaxRequestDTO();
        ajaxRequestDTO.url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/loadTodoList`;
        ajaxRequestDTO.data = "";

        var successFunction = function (data) {
            console.log(data);
            hrRequisitionUI.arrangeTodoList(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeTodoList(data) {
        $(".divToDoList").empty();
        $(data).each(function (index, obj) {
            var personTaskId = obj.getProp("personTaskId");
            var taskDate = obj.getProp("taskDate");
            var taskName = obj.getProp("name");

            var strHtml = `
                <li>
                    <span class="text HrRequisitionUI_Task" recordId="${personTaskId}" name="taskName">${taskName}</span>
                    <small class="label label-info HrRequisitionUI_Task" recordId="${personTaskId}" name="taskDate" value="${taskDate}"><i class="fa fa-clock-o"></i> ${taskDate}</small>
                    <div class="tools">
                        <i class="fa fa-edit HrRequisitionUI_btnShowUpdateTask" recordId="${personTaskId}" module="HrRequisitionUI" data-toggle="modal" data-target="#HrRequisitionUI_TaskDialog"></i>
                        <i class="fa fa-trash-o HrRequisitionUI_btnDeleteTask" recordId="${personTaskId}" module="HrRequisitionUI"></i>
                    </div>
                </li>
            `;
            $(".divToDoList").append(strHtml);
        })
    }

    createJob(obj) {
        var title = $("input[name='createJobRequisitionTitle']").val();
        var recruiterCode = $(".HiddenAutoComplete[name='createJobRecruiterCode']").val();
        var managerCode = $(".HiddenAutoComplete[name='createJobManagerCode']").val();
        var numberOfOpening = $("input[name='createJobNumberOfOpening']").val();

        var tmp = {};
        tmp["title"] = title;
        tmp["recruiterCode"] = recruiterCode;
        tmp["managerCode"] = managerCode;
        tmp["numberOfOpening"] = numberOfOpening;

        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/post/createJob`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            hrRequisitionUI.loadTeamRequisition();
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    removeApplicant(obj) {
        var hrRequisitionId = $(obj).attr("requisitionId");
        var hrRequisitionApplicantId = $(obj).attr("hrRequisitionApplicantId");
        console.log("Remove Applicant for record ID === " + hrRequisitionId);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/removeApplicant/${hrRequisitionId}/${hrRequisitionApplicantId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            hrRequisitionUI.arrangeStages(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    moveApplicant(requisitionId, applicantId, applicationStatus) {
        console.log("Rearrange for record ID === " + requisitionId);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/moveApplicant/${requisitionId}/${applicantId}/${applicationStatus}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            hrRequisitionUI.arrangeStages(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    reArrange(obj) {
        var hrRequisitionId = $(obj).val() == "" ? $(obj).attr("recordId") : $(obj).val();
        console.log("Rearrange for record ID === " + hrRequisitionId);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/loadApplicants/${hrRequisitionId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            hrRequisitionUI.arrangeStages(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeStages(data) {
        console.log(data);
        $(".newApplicant").empty();
        $(".interviewApplicant").empty();
        $(".offerApplicant").empty();
        $(data).each(function (index, obj) {
            var requisitionId = obj.getProp("hrRequisitionId");
            var hrRequisitionApplicantId = obj.getProp("hrRequisitionApplicantId");
            var applicationStatus = obj.getProp("applicationStatus");
            var applicantId = obj.getProp("hrApplicantId");
            var applicant = obj.getProp("applicant");
            var email = obj.getProp("email");
            var contact = obj.getProp("contact");
            var applyDate = obj.getProp("applyDate");
            var companyCode = obj.getProp("companyCode");

            var specialization = obj.getProp("specialization");
            if (specialization == undefined) {
                specialization = "<sub>type specialization here...</sub>";
            }
            var nextScheduleDate = obj.getProp("nextScheduleDate");
            if (nextScheduleDate == undefined) {
                nextScheduleDate = " Schedule";
            }
            var lookFor = obj.getProp("lookFor");
            if (lookFor == undefined) {
                lookFor = "<sub>employee here...</sub>";
            }

            var strAccept = "";
            var strRemove = "";
            var strUpload = "";
            var strDownload = "";
            if (applicationStatus == "NEW") {
                strRemove = `<a href="#" class="btn btn-box-tool btnRemoveApplicant" module="HrRequisitionUI" requisitionId="${requisitionId}" hrRequisitionApplicantId="${hrRequisitionApplicantId}" title="Remove Applicant"><i class="fa fa-remove"></i> Remove</a>`;
                strUpload = `<a href="#" class="btn btn-box-tool quickAttachmentTarget" module="HrApplicantUI" recordId="${applicantId}" fileType="RESUME" title="Upload Resume"><i class="fa fa-paperclip"> </i> </a>`;
                strDownload = `<a href="#" class="btn btn-box-tool quickDownloaderTarget" module="HrApplicantUI" recordId="${applicantId}" fileType="RESUME" title="Download Resume"><i class="fa fa-download"> </i> </a>`;
            }
            else if (applicationStatus == "INTERVIEW") {
                strRemove = `<a href="#" class="btn btn-box-tool btnRemoveApplicant" module="HrRequisitionUI" requisitionId="${requisitionId}" hrRequisitionApplicantId="${hrRequisitionApplicantId}" title="Remove Applicant"><i class="fa fa-remove"></i> Remove</a>`;
                strUpload = `<a href="#" class="btn btn-box-tool quickAttachmentTarget" module="HrApplicantUI" recordId="${applicantId}" fileType="RESUME" title="Upload Resume"><i class="fa fa-paperclip"> </i> </a>`;
                strDownload = `<a href="#" class="btn btn-box-tool quickDownloaderTarget" module="HrApplicantUI" recordId="${applicantId}" fileType="RESUME" title="Download Resume"><i class="fa fa-download"> </i> </a>`;
            }
            else if (applicationStatus == "OFFER") {
                strAccept = `<a href="#" class="btn btn-box-tool btnAcceptApplicant" module="HrRequisitionApplicantUI" recordId="${hrRequisitionApplicantId}" title="Accept Applicant"><i class="fa fa-thumbs-o-up"></i> Accept</a>`;
            }

            var strHtml = `
                <div class="box" draggable="true" ondragstart="hrRequisitionUI.dragApplicant(event)" requisitionId="${requisitionId}" applicantId="${applicantId}">
                    <div class="box-header text-left toggle-box" style="padding-bottom: 0px;" toggleTarget=".box${applicantId}">
                        <div>
                            <div class="box-title">
                                <h3 class="box-title">
                                    <a href="#" class="formLinker" recordId="${applicantId}" linkModule="HrApplicantUI">${applicant}</a>
                                </h3><br/>
                                <h4 class="box-title">
                                    <a href="#" class="quickUpdaterTarget" updater="text" module="HrApplicantUI" recordId="${applicantId}" fieldName="specialization">${specialization}</a>
                                </h4><br/>
                                <a href="#" style="padding-left: 0px;" class="btn btn-box-tool quickUpdaterTarget" updater="calendar" module="HrRequisitionApplicantUI" recordId="${hrRequisitionApplicantId}" fieldName="applyDate"><i class="fa fa-calendar"></i> ${nextScheduleDate}</a>
                            </div>
                            <div class="box-tools pull-right">
                                <img class="img-responsive formLinker img-circle img-bordered-sm profilePic" style="height:57px;" linkModule="HrApplicantUI" recordId="${applicantId}" src="${MAIN_URL}/api/generic/${companyCode}/profilePic/HrApplicantUI/${applicantId}/${utils.nowString()}" requisitionId="${requisitionId}" applicantId="${applicantId}">
                            </div>
                        </div>
                    </div>
                    <div class="box-body text-left box${applicantId}" style="display:none; padding-left: 17px;">
                        <span class="info-box-text">${email} - ${contact}</span>
                        <span class="info-box-text">Applied: <b>${applyDate}</b> - ${applicationStatus}</span>
                        <span class="info-box-text"><i class="fa fa-user"></i> Look For : 
                            <b>
                                <a href="#" class="quickUpdaterTarget" updater="autoComplete" module="HrRequisitionApplicantUI" recordId="${hrRequisitionApplicantId}" fieldName="lookForEmployeeCode">${lookFor}</a>
                            </b>
                        </span>
                        <span class="info-box-text">Resume: ${strUpload} ${strDownload}</span>
                        <span class="info-box-text">${strAccept}</span>
                    </div>
                </div>
            `;
            if (applicationStatus == "NEW") {
                $(".newApplicant").append(strHtml);
            }
            else if (applicationStatus == "INTERVIEW") {
                $(".interviewApplicant").append(strHtml);
            }
            else if (applicationStatus == "OFFER") {
                $(".offerApplicant").append(strHtml);
            }
        })
    }

    dragApplicant(ev) {
        ev.dataTransfer.setData("applicantId", $(ev.target).attr("applicantId"));
        ev.dataTransfer.setData("requisitionId", $(ev.target).attr("requisitionId"));
    }
    dropApplicant(obj, ev) {
        ev.preventDefault();
        var requisitionId = ev.dataTransfer.getData("requisitionId");
        var applicantId = ev.dataTransfer.getData("applicantId");
        var applicationStage = $(obj).attr("applicationStage");
        console.log("applicantId " + applicantId);
        console.log("requisitionId " + requisitionId);
        console.log("applicationStage " + applicationStage);

        this.moveApplicant(requisitionId, applicantId, applicationStage);
    }
    allowDrop(ev) {
        ev.preventDefault();
    }

    loadTeamRequisition() {
        console.log("loadTeamRequisition");

        var ajaxRequestDTO = new AjaxRequestDTO();
        ajaxRequestDTO.url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/loadTeamRequisition`;
        ajaxRequestDTO.data = "";

        var successFunction = function (data) {
            console.log(data);
            $(".myTeamRequisition").empty();
            $(data).each(function (index, obj) {
                var requisitionId = obj.getProp("reqId");
                var jobTitle = obj.getProp("title");
                var recruiter = obj.getProp("recruiter");
                var manager = obj.getProp("manager");
                var status = obj.getProp("status");
                var opening = obj.getProp("opening");

                var strHtml = `
                    <strong><a href="#" class="loadRecordToForm" module="HrRequisitionUI" recordId="${requisitionId}">${jobTitle}</a></strong>
                    <p class="text-muted">
                        Served By: <a>${recruiter}</a> for <a>${manager}</a>
                    </p>
                    <p>
                        <span class="label label-danger">Opening - ${opening}</span>
                        <span class="label label-info">Status - ${status}</span>
                    </p>
                    <hr/>
                `;
                $(".myTeamRequisition").append(strHtml);
            })
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadOpenRequisition() {
        console.log("loadOpenRequisition");

        var ajaxRequestDTO = new AjaxRequestDTO();
        ajaxRequestDTO.url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/loadOpenRequisition`;
        ajaxRequestDTO.data = "";

        var successFunction = function (data) {
            console.log(data);
            $(".myOpenRequisition").empty();
            $(data).each(function (index, obj) {
                var requisitionId = obj.getProp("reqId");
                var jobTitle = obj.getProp("title");
                var recruiter = obj.getProp("recruiter");
                var manager = obj.getProp("manager");
                var status = obj.getProp("status");
                var opening = obj.getProp("opening");

                var strHtml = `
                    <strong><a href="#" class="loadRecordToForm" module="HrRequisitionUI" recordId="${requisitionId}">${jobTitle}</a></strong>
                    <p class="text-muted">
                        Served By: <a>${recruiter}</a> for <a>${manager}</a>
                    </p>
                    <p>
                        <span class="label label-danger">Opening - ${opening}</span>
                        <span class="label label-info">Status - ${status}</span>
                    </p>
                    <hr/>
                `;
                $(".myOpenRequisition").append(strHtml);
            })
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadMyAssignedRequisition() {
        console.log("loadMyAssignedRequisition");

        var ajaxRequestDTO = new AjaxRequestDTO();
        ajaxRequestDTO.url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/loadMyAssignedRequisition`;
        ajaxRequestDTO.data = "";

        var successFunction = function (data) {
            console.log(data);
            $(".myAssignedRequisition").empty();
            $(data).each(function (index, obj) {
                var requisitionId = obj.getProp("reqId");
                var jobTitle = obj.getProp("title");
                var recruiter = obj.getProp("recruiter");
                var manager = obj.getProp("manager");
                var status = obj.getProp("status");
                var opening = obj.getProp("opening");

                var strHtml = `
                    <strong><a href="#" class="loadRecordToForm" module="HrRequisitionUI" recordId="${requisitionId}">${jobTitle}</a></strong>
                    <p class="text-muted">
                        Served By: <a>${recruiter}</a> for <a>${manager}</a>
                    </p>
                    <p>
                        <span class="label label-danger">Opening - ${opening}</span>
                        <span class="label label-info">Status - ${status}</span>
                    </p>
                    <hr/>
                `;
                $(".myAssignedRequisition").append(strHtml);
            })
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadRecruitmentPerformanceChart() {
        console.log("loadRecruitmentPerformanceChart");

        if ($("#recruitmentPerformanceChart").attr("id")) {
            var recruitmentPerformanceChart = document.getElementById("recruitmentPerformanceChart").getContext("2d");

            var ajaxRequestDTO = new AjaxRequestDTO();
            ajaxRequestDTO.url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/recruitmentPerformanceChart`;
            ajaxRequestDTO.data = "";

            var successFunction = function (data) {
                console.log(data);
                widgetChartRule.doChart("#recruitmentPerformanceChart", data, data.chartType, function (evt) {
                    hrRequisitionUI.recruitmentPerformanceChartClickHandler(evt, recruitmentPerformanceChart, this.getElementsAtEvent(evt), this);
                });
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
        }
    }

    recruitmentPerformanceChartClickHandler(evt, chart, obj, segment) {
        // var activePoints = chart.getElementsAtEvent(evt);
        // var selectedIndex = activePoints[0]._index;
        // console.log(this.data.datasets[0].data[selectedIndex]);              
        console.log(obj);
        console.log(segment);
    }

    acceptApplicant(obj) {
        var moduleName = $(obj).attr("module");
        var hrRequisitionApplicantId = $(obj).attr("recordId");
        console.log(moduleName);
        console.log(hrRequisitionApplicantId);
        var ajaxRequestDTO = new AjaxRequestDTO();
        ajaxRequestDTO.url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HrRequisitionUI/acceptForEmployment/${hrRequisitionApplicantId}`;
        ajaxRequestDTO.data = "";

        var successFunction = function (data) {
            console.log(data);
            $('.nav-tabs a[href="#Tab4"]').tab('show');
            // var key = data.getProp("key");
            // var value = data.getProp("value");
            // formLinker.linkToForm(key, value)
            loadFulfilled($(mainId));
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }
}

