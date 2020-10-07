class ScreenShare {
    constructor() {
        this.localScreen;
        this.mediaConstraints = window.constraints = {
            audio: false,
            // video: true,
            video: true
        };
    }

    initScreen(shareScreenSuccessCallback) {
        if (navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia(screenShare.mediaConstraints)
                .then(function (stream) {
                    screenShare.localScreen = stream;
                    shareScreenSuccessCallback();
                })
        }
    }

    handleError(error) {
        if (error.name === 'ConstraintNotSatisfiedError') {
            const v = constraints.video;
            screenShare.errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
        } else if (error.name === 'PermissionDeniedError') {
            screenShare.errorMsg('Permissions have not been granted to share your screen');
        }
        screenShare.errorMsg(`getUserDisplay error: ${error.name}`, error);
    }

    errorMsg(msg, error) {
        const errorElement = document.getElementById('errorMsg');
        errorElement.innerHTML += `<p>${msg}</p>`;
        if (typeof error !== 'undefined') {
            console.error(error);
        }
    }

}
