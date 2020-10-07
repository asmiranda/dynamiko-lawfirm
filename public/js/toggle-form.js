class ToggleForm {
    readOnly() {
        console.log("ToggleForm readOnly");
        setTimeout(
            function () {
                $('.displayEdit').each(function (index, obj) {
                    console.log(index);
                    //                    $(obj).addClass("displayMode");
                    if ($(obj).is("span")) {
                        $(obj).css("display", "none")
                    }
                    else if ($(obj).is("textarea")) {
                        $(obj).css("border", "none")
                        $(obj).css("overflow", "hidden")
                    }
                    else {
                        $(obj).css("border", "none")
                    }
                });
            }, 50
        );
    }
}

$(function () {
    toggleForm = new ToggleForm();
})