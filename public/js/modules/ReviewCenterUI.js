class ReviewCenterUI {
    submitEnrollment() {
        var studentId = $("input[name='PersonId']").val();
        var choiceProgram = $("select[name='choiceProgram']").val();
        var paymentReceipt = $("input[name='paymentReceipt']").val();
        var enrollmentRemarks = $("textarea[name='enrollmentRemarks']").val();

        if (reviewCenter.validateEnrollment()) {
            var tmpEnrollment = {};
            tmpEnrollment["studentId"] = studentId;
            tmpEnrollment["choiceProgram"] = choiceProgram;
            tmpEnrollment["paymentReceipt"] = paymentReceipt;
            tmpEnrollment["enrollmentRemarks"] = enrollmentRemarks;

            var vdata = JSON.stringify(tmpEnrollment);
            console.log(vdata);
            var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/ReviewStudentUI/post';
            var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
            var successCallback = function (data) {
                console.log(data);
                showModalAny.show(data.getProp("key"), data.getProp("value"));
            };
            ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
        }
    }

    validateEnrollment() {
        var isValid = true;
        var studentId = $("input[name='PersonId']").val();
        var choiceProgram = $("select[name='choiceProgram']").val();
        var paymentReceipt = $("input[name='paymentReceipt']").val();
        var enrollmentRemarks = $("textarea[name='enrollmentRemarks']").val();
        console.log(studentId);
        console.log(choiceProgram);
        console.log(paymentReceipt);
        console.log(enrollmentRemarks);
        if (choiceProgram == "") {
            $(".errorNote").html("Program must be selected.");
            isValid = false;
        }
        else if (paymentReceipt == "") {
            $(".errorNote").html("Please type payment receipt.");
            isValid = false;
        }
        return isValid;
    }

    populateEnrollmentChoices() {
        var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/widget/ReviewStudentUI/programs";
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $("select[name='choiceProgram']").empty();
            $(data).each(function (index, obj) {
                var code = obj.getProp("code");
                var name = obj.getProp("name");
                var option = '<option value="' + code + '">' + name + '</option>';
                console.log(option);

                $("select[name='choiceProgram']").append(option);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    searchQuestion(obj) {
        var examId = $(obj).attr("examId");
        var value = $(obj).val();
        console.log(value);
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/ReviewProgramModuleUI/searchQuestions/' + examId + "/" + value;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log("Record Found");
            console.log(data);
            $(".addQuestionList").empty();
            $.each(data, function (index, obj) {
                var question = obj.getProp("question");
                var answer = obj.getProp("answer");
                var choiceA = obj.getProp("choiceA");
                var choiceB = obj.getProp("choiceB");
                var choiceC = obj.getProp("choiceC");
                var choiceD = obj.getProp("choiceD");
                var examQuestionId = obj.getProp("ReviewQuestionAnswerId");
                var qHtml = `
                    <li class="list-group-item">
                        <b>${question}</b> <a class="pull-right btnReviewCenterAddQuestion" examId="${examId}" examQuestionId="${examQuestionId}" title="${examId} - ${examQuestionId}"><i class="fa fa-fw fa-plus-square"></i> Add</a>
                    </li>
                `;
                $(".addQuestionList").append(qHtml);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    showQuestions(obj) {
        var examId = $(obj).attr("examId");
        $("input.txtReviewCenterSearchQuestion").attr("examId", examId);

        var title = $(obj).attr("title");
        $(".examTitle").html(title + " [" + examId + "]");
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/ReviewProgramModuleUI/loadQuestions/' + examId;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log("Record Found");
            console.log(data);
            $(".questionList").empty();
            $.each(data, function (index, obj) {
                var question = obj.getProp("question");
                var answer = obj.getProp("answer");
                var examQuestionId = obj.getProp("ReviewProgramModuleExamQuestionId");
                var qHtml = `
                    <li class="list-group-item">
                        <b>${question}</b> <a class="pull-right btnReviewCenterDeleteQuestion" examId="${examId}" examQuestionId="${examQuestionId}" title="${examId + " - " + examQuestionId}"><i class="fa fa-fw fa-trash-o"></i></a><a class="pull-right">${answer}</a>
                    </li>
                `;
                $(".questionList").append(qHtml);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    addQuestion(obj) {
        var examId = $(obj).attr("examId");
        var examQuestionId = $(obj).attr("examQuestionId");
        var txtSearch = $(".txtReviewCenterSearchQuestion").val();

        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/ReviewProgramModuleUI/addQuestion/' + examId + "/" + examQuestionId + "/" + txtSearch;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log("Record Found");
            console.log(data);
            $(".addQuestionList").empty();
            $.each(data, function (index, obj) {
                var question = obj.getProp("question");
                var answer = obj.getProp("answer");
                var choiceA = obj.getProp("choiceA");
                var choiceB = obj.getProp("choiceB");
                var choiceC = obj.getProp("choiceC");
                var choiceD = obj.getProp("choiceD");
                var examQuestionId = obj.getProp("ReviewQuestionAnswerId");
                var qHtml = `
                    <li class="list-group-item">
                        <b>${question}</b> <a class="pull-right btnReviewCenterAddQuestion" examId="${examId}" examQuestionId="${examQuestionId}" title="${examId} - ${examQuestionId}"><i class="fa fa-fw fa-plus-square"></i> Add</a>
                    </li>
                `;
                $(".addQuestionList").append(qHtml);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    deleteQuestion(obj) {
        var examId = $(obj).attr("examId");
        var examQuestionId = $(obj).attr("examQuestionId");
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/ReviewProgramModuleUI/deleteQuestion/' + examId + "/" + examQuestionId;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log("Record Found");
            console.log(data);
            $(".questionList").empty();
            $.each(data, function (index, obj) {
                var question = obj.getProp("question");
                var answer = obj.getProp("answer");
                examQuestionId = obj.getProp("ReviewProgramModuleExamQuestionId");
                var qHtml = `
                    <li class="list-group-item">
                        <b>${question}</b> <a class="pull-right btnReviewCenterDeleteQuestion" examId="${examId}" examQuestionId="${examQuestionId}" title="${examId + " - " + examQuestionId}"><i class="fa fa-fw fa-trash-o"></i></a><a class="pull-right">${answer}</a>
                    </li>
                `;
                $(".questionList").append(qHtml);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }
    loadToForm(obj) {
        console.log(obj);
        if (obj.moduleName == 'ReviewProgramModuleUI') {
            $(".examTitle").html(`<i style="color:red;">please select from left button</i>`);
            $(".questionList").empty();
        }
    }
    clearSearch(obj) {
        console.log(obj);
        if (obj.moduleName == 'ReviewProgramModuleUI') {
            $(".examTitle").html(`<i style="color:red;">please select from left button</i>`);
            $(".questionList").empty();
        }
    }

}
