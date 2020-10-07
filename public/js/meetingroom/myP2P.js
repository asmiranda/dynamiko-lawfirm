class MyP2P {
    constructor(email, profile, isOfferSender) {
        let context = this;
        this.email = email;
        this.profile = profile;
        this.isOfferSender = isOfferSender;
        this.videoElem;
        this.sendChannel;
        this.receiveChannel;
        this.senders;
        this.receivers;
        this.screenSharing;
        this.peerConnection;
        this.remoteIsSharingScreen;

        this.initVideoBox();
        this.initP2P();
    }

    initP2P() {
        let context = this;
        this.peerConnection = new RTCPeerConnection(socketIOP2P.peerConnectionConfig, {
            optional: [{
                RtpDataChannels: true
            }]
        });
        this.initDataChannel();

        this.peerConnection.onicecandidate = function (event) {
            context.sendIce(event);
        }

        this.peerConnection.ontrack = function (ev) {
            context.onTrack(ev);
        };
    }

    handleShareScreen() {
        this.screenSharing = true;
    }

    handleUnshareScreen() {
        this.screenSharing = false;
    }

    unshareScreen() {
        screenShare.localScreen.getTracks()[0].enable = false;

        let tmp = { 'dataType': 'UnshareScreen', 'email': this.email, 'message': "UnshareScreen Mode" };
        this.sendChannel.send(JSON.stringify(tmp));
    }

    shareScreen() {
        // this.sendClearP2PSignal();
        this.initP2P();
        this.sendNewOffer();
    }

    startWebinar() {
        try {
            let tmp = { 'dataType': 'StartWebinar', 'email': this.email, 'message': "Webinar Mode" };
            this.sendChannel.send(JSON.stringify(tmp));
        }
        catch (e) {
            console.log(e);
        }
    }

    endWebinar() {
        try {
            let tmp = { 'dataType': 'EndWebinar', 'email': this.email, 'message': "Unload Webinar Mode" };
            this.sendChannel.send(JSON.stringify(tmp));
        }
        catch (e) {
            console.log(e);
        }
    }

    handleRemoteUnsaveMode() {
        let context = this;
        $(this.senders).each(function (index, sender) {
            console.log("Enable Sender Track", sender, sender.track);
            for (const track of socketIOMediaStream.localVideo.getTracks()) {
                try {
                    sender.replaceTrack(track);
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }

    handleRemoteSaveMode() {
        let context = this;
        $(this.senders).each(function (index, sender) {
            console.log("Disable Sender Track", sender, sender.track);
            try {
                context.peerConnection.removeTrack(sender);
            }
            catch (e) {
                console.log(e);
            }
        });
    }

    unsaveBandWidth() {
        try {
            let tmp = { 'dataType': 'UnsaveMode', 'email': this.email, 'message': "Unsaving Mode" };
            this.sendChannel.send(JSON.stringify(tmp));
        }
        catch (e) {
            console.log(e);
        }
    }

    saveBandWidth() {
        try {
            let tmp = { 'dataType': 'SaveMode', 'email': this.email, 'message': "Saving Mode" };
            this.sendChannel.send(JSON.stringify(tmp));
        }
        catch (e) {
            console.log(e);
        }
    }

    sendClearP2PSignal() {
        try {
            let tmp = { 'dataType': 'ClearP2P', 'email': this.email, 'message': "Clear P2P" };
            this.sendChannel.send(JSON.stringify(tmp));
        }
        catch (e) {
            console.log(e);
        }
    }

    sendChatMessage(chatMessage) {
        let profileName = storage.get("Person").firstName;
        let tmp = { 'dataType': 'Chat', 'profileName': profileName, 'message': chatMessage };
        this.sendChannel.send(JSON.stringify(tmp));
    }

    initVideoBox() {
        let context = this;
        console.log(`initVideoBox called for ${context.email}`)

        let tmp = $(`.remoteMiniVideo[email='${context.email}']`);
        if (tmp.length == 0) {
            let str = `
                <video class="remoteMiniVideoStream" id="v_${context.email}" email="${context.email}" autoplay playsinline></video>
            `;
            $(".videoBoxList").append(str);
        }
        context.videoElem = document.getElementById(`v_${context.email}`);
    }

    sendTracks() {
        try {
            let outputTracks = [];
            outputTracks = outputTracks.concat(socketIOMediaStream.localVideo.getAudioTracks());
            // outputTracks = outputTracks.concat(socketIOMediaStream.canvasStream.getTracks());
            // let outputMediaStream = new MediaStream(outputTracks);

            // for (const track of outputMediaStream.getTracks()) {
            //     console.log(`sendTracks to ${this.email}`, track.label)
            //     this.peerConnection.addTrack(track, outputMediaStream);
            // }
            for (const track of socketIOMediaStream.localVideo.getTracks()) {
                console.log(`sendTracks to ${this.email}`, track.label)
                this.peerConnection.addTrack(track, socketIOMediaStream.localVideo);
            }
        }
        catch (e) {
            console.log(e);
        }
        this.senders = this.peerConnection.getSenders();
    }

    sendScreen() {
        if (screenShare.localScreen) {
            screenShare.localScreen.getTracks()[0].enable = true;
            for (const track of screenShare.localScreen.getTracks()) {
                console.log(`shareScreen to ${this.email}`, screenShare.localScreen, "Screen Share ID", track.label, track.id);
                this.peerConnection.addTrack(track, screenShare.localScreen);
            }
        }
        this.senders = this.peerConnection.getSenders();
    }

    initDataChannel() {
        let context = this;
        this.sendChannel = this.peerConnection.createDataChannel("sendChannel");
        this.sendChannel.onopen = function (event) {
            console.log("sendChannel onopen", event);
        };
        this.sendChannel.onclose = function (event) {
            console.log("sendChannel onclose", event);
        };

        context.sendChannel.onmessage = function (evt) {
            console.log("receiveChannel onmessage");
            let data = JSON.parse(evt.data);
            const customEvent = new CustomEvent('dataChannelMessageReceived', { bubbles: true, detail: evt });
            socketIOP2P.transientP2P = context;
            document.dispatchEvent(customEvent);
        };
    }

    sendOffer() {
        let context = this;

        this.sendTracks();
        this.peerConnection.createOffer(function (sdp) {
            console.log(`sendOffer to ${context.email}`)
            context.peerConnection.setLocalDescription(sdp);
            //this manipulates the sdp automatically based on number of users
            sdp.sdp = context.setVideoAndScreenBitRate(sdp.sdp);
            socketIOMeetingRoom.socket.emit("offer", { "fromEmail": storage.get("Person").email, "toEmail": context.email, "sdp": sdp, "room": leftMenu.latestModuleCode, "profile": storage.get("Person").firstName });
        }, function (error) {
            console.log("sendOffer", error)
        });
    }

    sendNewOffer() {
        let context = this;

        this.sendTracks();
        this.sendScreen();
        this.peerConnection.createOffer(function (sdp) {
            console.log(`sendNewOffer to ${context.email}`)
            context.peerConnection.setLocalDescription(sdp);
            sdp.sdp = context.setVideoAndScreenBitRate(sdp.sdp);
            socketIOMeetingRoom.socket.emit("new_offer", { "fromEmail": storage.get("Person").email, "toEmail": context.email, "sdp": sdp, "room": lleftMenu.latestModuleCode, "profile": storage.get("Person").firstName });
        }, function (error) {
            console.log("sendNewOffer", error)
        });
    }

    sendAnswer(data) {
        let context = this;
        let pAnswer = null;
        context.sendTracks();
        context.peerConnection.setRemoteDescription(new RTCSessionDescription(data["sdp"]));
        context.peerConnection.createAnswer().then(function (answer) {
            pAnswer = answer;
            return context.peerConnection.setLocalDescription(answer);
        })
            .then(function () {
                console.log(`onOffer to ${context.email}`)
                pAnswer.sdp = context.setVideoAndScreenBitRate(pAnswer.sdp);
                socketIOMeetingRoom.socket.emit("answer", { "fromEmail": storage.get("Person").email, "toEmail": context.email, "sdp": pAnswer, "room": leftMenu.latestModuleCode, "profile": storage.get("Person").firstName });
            })
            .catch(e => console.log(e));
    }

    onTrack(ev) {
        console.log(`onTrack from ${this.email}`)
        let context = this;
        console.log("Track Label and ID", ev.track.label, ev.track.id);
        // do not map Audio, its included in the video cam stream
        if (!ev.track.label.includes("audio")) {
            if (ev.streams && ev.streams[0]) {
                let stream = ev.streams[0];
                console.log("Received Stream", stream);
                if (stream.getTracks().length == 2) {
                    context.onReceiveVideo(stream);
                }
                else {
                    context.onReceiveScreen(stream);
                }
            }
        }
    };

    onReceiveVideo(tmpMedia) {
        console.log(`onReceiveVideo track from ${this.email}`, tmpMedia)
        console.log(this.videoElem)
        this.videoElem.srcObject = tmpMedia;

        let activeVideo = document.getElementById(`activeVideo`);
        activeVideo.srcObject = tmpMedia;
        let context = this;
        tmpMedia.getAudioTracks()[0].onended = function () {
            context.remoteNoAudio();
        };
        tmpMedia.getAudioTracks()[0].onmute = function () {
            context.remoteNoAudio();
        };
        tmpMedia.getAudioTracks()[0].onunmute = function () {
            context.remoteWithAudio();
        };
        tmpMedia.getVideoTracks()[0].onended = function () {
            context.remoteNoVideo();
        };
        tmpMedia.getVideoTracks()[0].onmute = function () {
            context.remoteNoVideo();
        };
        tmpMedia.getVideoTracks()[0].onunmute = function () {
            context.remoteWithVideo();
        };
    }

    onReceiveScreen(tmpMedia) {
        console.log(`onReceiveScreen track from ${this.email}`)
        var screenVideo = document.getElementById(`activeVideo`);
        var miniScreenVideo = document.getElementById(`activeScreenShare`);
        console.log(screenVideo);
        screenVideo.srcObject = tmpMedia;
        miniScreenVideo.srcObject = tmpMedia;
        let context = this;
        tmpMedia.getVideoTracks()[0].onended = function () {
            context.remoteNoScreen();
        };
        tmpMedia.getVideoTracks()[0].onmute = function () {
            context.remoteNoScreen();
        };
        tmpMedia.getVideoTracks()[0].onunmute = function () {
            context.remoteWithScreen();
        };
    }

    remoteNoAudio() {
        console.log("Remote No Audio")
    }

    remoteWithAudio() {
        console.log("Remote With Audio")
    }

    remoteNoVideo() {
        console.log("Remote No Video")
    }

    remoteWithVideo() {
        console.log("Remote With Video")
    }

    remoteNoScreen() {
        console.log("Remote No Screen")
        // $("#activeVideo").hide();
        // $("#activeScreenShare").hide();
    }

    remoteWithScreen() {
        console.log("Remote With Screen")
        $("#activeVideo").show();
        $("#activeScreenShare").show();
    }

    leaveRoom() {
        // $(`.miniVideo[email="${this.email}"]`).remove();
    }

    sendIce(event) {
        if (event.candidate) {
            socketIOMeetingRoom.socket.emit("ice", { "fromEmail": storage.get("Person").email, "toEmail": this.email, "ice": event.candidate, "room": leftMenu.latestModuleCode });
        }
    }

    setVideoAndScreenBitRate(sdp) {
        let newSdp = sdp;
        let connArr = Object.keys(socketIOP2P.peerConnections);
        if (connArr.length <= 2) {
            // do nothing
        }
        else if (connArr.length <= 4) {
            newSdp = this.setMediaBitrate(newSdp, "video", 10)
            newSdp = this.setMediaBitrate(newSdp, "audio", 10)
        }
        else {
            newSdp = this.setMediaBitrate(newSdp, "video", 10)
            newSdp = this.setMediaBitrate(newSdp, "audio", 10)
        }
        return newSdp;
    }

    setMediaBitrate(sdp, media, bitrate) {
        var lines = sdp.split("\n");
        var line = -1;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].indexOf("m=" + media) === 0) {
                line = i;
                break;
            }
        }
        if (line === -1) {
            console.debug("Could not find the m line for", media);
            return sdp;
        }
        console.debug("Found the m line for", media, "at line", line);

        // Pass the m line
        line++;

        // Skip i and c lines
        while (lines[line].indexOf("i=") === 0 || lines[line].indexOf("c=") === 0) {
            line++;
        }

        // If we're on a b line, replace it
        if (lines[line].indexOf("b") === 0) {
            console.debug("Replaced b line at line", line);
            lines[line] = "b=AS:" + bitrate;
            return lines.join("\n");
        }

        // Add a new b line
        console.debug("Adding new b line before line", line);
        var newLines = lines.slice(0, line)
        newLines.push("b=AS:" + bitrate)
        newLines = newLines.concat(lines.slice(line, lines.length))
        return newLines.join("\n")
    }
}
