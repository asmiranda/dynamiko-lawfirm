class QuickCall {
    constructor() {
        $(document).on('click', `#btnQuickCall`, function() {
            quickCall.btnQuickCall(this);
        });
    }
    
    btnQuickCall(obj) {
    }
}

$(function () {
    quickCall = new QuickCall();
});
