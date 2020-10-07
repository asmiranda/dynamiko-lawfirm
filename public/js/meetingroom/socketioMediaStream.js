class SocketIOMediaStream {
    canvas;
    canvasStream;
    localVideo;

    videoSharing = true;
    audioSharing = true;
    screenSharing = false;
    withBackground = true;

    getMediaConstraints() {
        var context = this;

        var mediaConstraints = {
            audio: context.audioSharing,
            video: true,
            name: "Camera"
        };
        return mediaConstraints;
    }

    async loadBodyPix() {
        let context = this;
        this.canvas = document.getElementById('activeVideoCanvas');
        let options = {
            multiplier: 0.75,
            stride: 32,
            quantBytes: 4
        }
        while (this.withBackground) {
            if (this.myVideo.srcObject != null) {
                await bodyPix.load(options)
                    .then(net => context.perform(net))
                    .catch(err => console.log(err))
            }
        }
    }

    async perform(net) {
        const segmentation = await net.segmentPerson(this.myVideo);

        const backgroundBlurAmount = 7;
        const edgeBlurAmount = 7;
        const flipHorizontal = false;

        bodyPix.drawBokehEffect(
            this.canvas, this.myVideo, segmentation, backgroundBlurAmount,
            edgeBlurAmount, flipHorizontal);

        if (this.canvasStream == null || this.canvasStream == undefined) {
            this.canvasStream = this.canvas.captureStream(30);
            let videoBlur = document.getElementById("myVideoBlur");
            videoBlur.srcObject = this.canvasStream;
        }
    }

    initVideo(mediaSuccessCallback) {
        let context = this;
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(socketIOMediaStream.getMediaConstraints())
                .then(function (stream) {
                    socketIOMediaStream.localVideo = stream;
                    let video = document.getElementById("myVideo");
                    video.srcObject = socketIOMediaStream.localVideo;
                    context.myVideo = video;
                    // context.loadBodyPix();
                })
                .then(function () {
                    mediaSuccessCallback();
                })
        }
    }

    handleError(error) {
        if (error.name === 'ConstraintNotSatisfiedError') {
            const v = constraints.video;
            socketIOMediaStream.errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
        } else if (error.name === 'PermissionDeniedError') {
            socketIOMediaStream.errorMsg('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
        }
        socketIOMediaStream.errorMsg(`getUserMedia error: ${error.name}`, error);
    }

    errorMsg(msg, error) {
        const errorElement = document.getElementById('errorMsg');
        errorElement.innerHTML += `<p>${msg}</p>`;
        if (typeof error !== 'undefined') {
            console.error(error);
        }
    }

}
