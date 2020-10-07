class UserUI {
  doSpecialAction(data) {
    console.log("UserUI doSpecialAction " + data);
    if (data == "startReset") {
      userUI.resetPassword("");
    }
    else {
      showModalAny.show("User", data);
    }
  }

  resetPassword(anyText) {
    var str = `
          <div class="box box-info">
            <div class="box-body">
              <span class="info-box-text" style="padding: 10px;">${anyText}</span>
              <div class="form-group">
                <label for="oldPassword" class="col-sm-4 control-label">Old Password</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" id="oldPassword" placeholder="Old Password">
                </div>
              </div>

              <div class="form-group">
                <label for="newPassword" class="col-sm-4 control-label">New Password</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" id="newPassword" placeholder="New Password">
                </div>
              </div>

              <div class="form-group">
                <label for="confirmPassword" class="col-sm-4 control-label">Confirm Password</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password">
                </div>
              </div>

            </div>
          </div>        
        `;
    var recordId = $(mainId).val();
    if (recordId > 0) {
      var success = function () {
        console.log("testing confirm only");
        userUI.saveReset();
      }
      showConfirmAny.confirm("Password Reset", str, success);
    }
    else {
      showModalAny.show("Password Reset", "Please select a user");
    }
  }

  saveReset() {
    var oldPassword = $("#oldPassword").val();
    var newPassword = $("#newPassword").val();
    var confirmPassword = $("#confirmPassword").val();

    if (newPassword != confirmPassword) {
      userUI.resetPassword("New and Confirm password not match.");
    }
    else {
      var recordId = $(mainId).val();
      var url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/specialaction/UserUI/savereset/" + recordId;
      var resetPasswordDTO = new ResetPasswordDTO(oldPassword, newPassword);
      var vdata = JSON.stringify(resetPasswordDTO);
      var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
      var successCallback = function (data) {
        console.log(data);
        showModalAny.show("Password Reset", data);
      };
      ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }
  }
}

class ResetPasswordDTO {
  constructor(oldPassword, newPassword) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
