class SocketIOP2P {
    constructor() {
        this.transientP2P;
        this.stunServer = "dynamikosoft.com";
        this.peerConnectionConfig = {
            'iceServers': [
                {
                    urls: [`stun:${this.stunServer}:3478`, `turn:${this.stunServer}:3478`],
                    credential: 'Miran!11',
                    username: 'dynamiko'
                },
            ]
        }
        // this.peerConnectionConfig = {
        //     'iceServers': [
        //         { 'urls': ['stun:stun.services.mozilla.com', 'stun:stun.l.google.com:19302'] },
        //     ]
        // }
    }

    updateChatUsers() {
        let context = this;
        $("#selectChatUser").empty();
        $("#selectChatUser").append(`<option value="all">Everyone</option>`);
        let connArr = Object.keys(this.peerConnections);
        $(connArr).each(function (index, key) {
            let myP2P = context.peerConnections[key];
            console.log(myP2P);
            $("#selectChatUser").append(`<option value="${myP2P.email}">${myP2P.profile}</option>`);
        })
    }

    handleShareScreen() {
        this.transientP2P.handleShareScreen();
    }

    handleUnshareScreen() {
        this.transientP2P.handleUnshareScreen();
    }

    unshareScreen() {
        let context = this;
        let connArr = Object.keys(this.peerConnections);
        $(connArr).each(function (index, key) {
            let myP2P = context.peerConnections[key];
            console.log(myP2P);
            myP2P.unshareScreen();
        })
    }

    shareScreen() {
        let context = this;

        screenShare.initScreen(function () {
            let connArr = Object.keys(context.peerConnections);
            $(connArr).each(function (index, key) {
                let myP2P = context.peerConnections[key];
                console.log(myP2P);
                myP2P.shareScreen();
            })
        });
    }

    handleStartWebinarRequest(obj) {
        for (const track of socketIOMediaStream.localVideo.getTracks()) {
            track.enabled = false;
        }
    }

    handleEndWebinarRequest(obj) {
        for (const track of socketIOMediaStream.localVideo.getTracks()) {
            track.enabled = true;
        }
    }

    startWebinar() {
        let context = this;
        let connArr = Object.keys(this.peerConnections);
        $(connArr).each(function (index, key) {
            let myP2P = context.peerConnections[key];
            console.log(myP2P);
            myP2P.startWebinar();
        })
    }

    endWebinar() {
        let context = this;
        let connArr = Object.keys(this.peerConnections);
        $(connArr).each(function (index, key) {
            let myP2P = context.peerConnections[key];
            console.log(myP2P);
            myP2P.endWebinar();
        })
    }

    handleRemoteUnsaveMode() {
        this.transientP2P.handleRemoteUnsaveMode();
    }

    handleRemoteSaveMode(email) {
        this.transientP2P.handleRemoteSaveMode();
    }

    saveBandWidth() {
        let context = this;
        // $(`#remoteVideos`).hide();
        let hostEmail = storage.get("Person").email;
        let connArr = Object.keys(this.peerConnections);
        $(connArr).each(function (index, key) {
            if (key != hostEmail) {
                let myP2P = context.peerConnections[key];
                console.log(myP2P);
                myP2P.saveBandWidth();
            }
        })
    }

    unsaveBandWidth() {
        let context = this;
        // $(`#remoteVideos`).hide();
        let connArr = Object.keys(this.peerConnections);
        $(connArr).each(function (index, key) {
            let myP2P = context.peerConnections[key];
            console.log(myP2P);
            myP2P.unsaveBandWidth();
        })
    }

    sendChatMessage(chatUser, chatMessage) {
        let context = this;
        let connArr = Object.keys(this.peerConnections);
        if (chatUser == "all") {
            $(connArr).each(function (index, key) {
                let myP2P = context.peerConnections[key];
                console.log(myP2P);
                myP2P.sendChatMessage(chatMessage);
            })
        }
        else {
            let myP2P = context.peerConnections[chatUser];
            console.log(myP2P);
            myP2P.sendChatMessage(chatMessage);
        }
    }

    clearConnections() {
        $(".videoBoxList").empty();
        let activeVideo = document.getElementById("activeVideo")
        activeVideo.srcObject = null;
        this.peerConnections = [];
    }

    isMessageForMe(data) {
        let fromEmail = data["fromEmail"];
        let toEmail = data["toEmail"];
        let forMe = toEmail == storage.get("Person").email;
        forMe = forMe && fromEmail != storage.get("Person").email;
        console.log(`is forMe[${storage.get("Person").email}] == ${forMe} from ${fromEmail}`);
        return forMe;
    }

    initJoinedRoom(mySocket, data) {
        console.log(`initJoinedRoom`, data)
        let fromEmail = data["fromEmail"];
        if (fromEmail != storage.get("Person").email) {
            let toEmail = data["fromEmail"];
            let profile = data["profile"];
            let myP2P = new MyP2P(toEmail, profile, false);
            console.log(`initJoinedRoom New P2P for ${toEmail} - ${storage.get("Person").email}`);
            this.peerConnections[toEmail] = myP2P;
            mySocket.emit("welcomejoiner", { "fromEmail": storage.get("Person").email, "toEmail": toEmail, "room": leftMenu.latestModuleCode, "profile": storage.get("Person").firstName });
        }
    }

    initWelcomeJoiner(mySocket, data) {
        if (this.isMessageForMe(data)) {
            let toEmail = data["fromEmail"];
            let profile = data["profile"];
            this.sendOffer(toEmail, profile)
        }
    }

    sendOffer(toEmail, profile) {
        let myP2P = new MyP2P(toEmail, profile, true);
        console.log(`sendOffer New P2P for ${toEmail} - ${storage.get("Person").email}`);
        this.peerConnections[toEmail] = myP2P;
        myP2P.sendOffer();
    }

    onOffer(mySocket, data) {
        if (this.isMessageForMe(data)) {
            let toEmail = data["fromEmail"];
            let myP2P = this.peerConnections[toEmail]
            this.peerConnections[toEmail] = myP2P;
            myP2P.sendAnswer(data);
            socketIOP2P.updateChatUsers();
        }
    }

    onNewOffer(mySocket, data) {
        if (this.isMessageForMe(data)) {
            let toEmail = data["fromEmail"];
            let profile = data["profile"];
            let myP2P = new MyP2P(toEmail, profile, true);
            this.peerConnections[toEmail] = myP2P;
            myP2P.sendAnswer(data);
        }
    }

    onAnswer(mySocket, data) {
        if (this.isMessageForMe(data)) {
            let toEmail = data["fromEmail"];
            let myP2P = this.peerConnections[toEmail]
            console.log(`onAnswer with ${toEmail}`)
            myP2P.peerConnection.setRemoteDescription(new RTCSessionDescription(data["sdp"]));
            socketIOP2P.updateChatUsers();
        }
    }

    onIce(mySocket, data) {
        if (this.isMessageForMe(data)) {
            let toEmail = data["fromEmail"];
            let myP2P = this.peerConnections[toEmail]
            // console.log(`onIce from ${toEmail}`, data)

            myP2P.peerConnection.addIceCandidate(new RTCIceCandidate(data.ice));
        }
    }

    onLeaveRoom(mySocket, data) {
        let toEmail = data["fromEmail"];
        let myP2P = this.peerConnections[toEmail]
        if (myP2P) {
            myP2P.leaveRoom()
        }
    }
}
