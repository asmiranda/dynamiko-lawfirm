class SocketIOMessageHandler {
    joinRoom(mySocket) {
        console.log(`joinRoom ${leftMenu.latestModuleCode}`)
        mySocket.emit("joinroom", { "fromEmail": storage.get("Person").email, "room": leftMenu.latestModuleCode, "profile": storage.get("Person").firstName });
    }

    onJoinedRoom(mySocket, data) {
        console.log(`onJoinedRoom`, data)
        socketIOP2P.initJoinedRoom(mySocket, data);
    }

    onWelcomeJoiner(mySocket, data) {
        console.log(`onWelcomeJoiner`, data)
        socketIOP2P.initWelcomeJoiner(mySocket, data);
    }

    onOffer(mySocket, data) {
        console.log(`onOffer`, data)
        let fromEmail = data["fromEmail"];
        if (storage.get("Person").email != fromEmail) {
            socketIOP2P.onOffer(mySocket, data);
        }
    }

    onNewOffer(mySocket, data) {
        console.log(`onNewOffer`, data)
        let fromEmail = data["fromEmail"];
        if (storage.get("Person").email != fromEmail) {
            socketIOP2P.onNewOffer(mySocket, data);
        }
    }

    onAnswer(mySocket, data) {
        console.log(`onAnswer`, data)
        let fromEmail = data["fromEmail"];
        if (storage.get("Person").email != fromEmail) {
            socketIOP2P.onAnswer(mySocket, data);
        }
    }

    onIce(mySocket, data) {
        console.log(`onIce`, data)
        socketIOP2P.onIce(mySocket, data);
    }

    leaveRoom(mySocket) {
        console.log(`leaveRoom`)
        if (leftMenu.latestModuleCode) {
            mySocket.emit("leaveroom", { "fromEmail": storage.get("Person").email, "room": leftMenu.latestModuleCode });
        }
    }

    onLeaveRoom(mySocket, data) {
        console.log("onLeaveRoom", data)
        socketIOP2P.onLeaveRoom(mySocket, data);
    }
}
