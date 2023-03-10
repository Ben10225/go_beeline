// room api
let checkRoomExist = async (roomId) => {
    let response = await fetch(`/room/${roomId}`);
    let data = await response.json();
    return data.exist;
}

let getRemoteUser = async (roomId, remoteUuid) => {
    let response = await fetch(`/room/${roomId}/user/${remoteUuid}`);
    let data = await response.json();
    if(data.data){
        return data.data;
    }
}

let insertMongoRoomData = async (roomId, uuid, audioStatus, videoStatus, auth, userName, userImg) => {
    let response = await fetch(`/room/${roomId}/user/${uuid}`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "audioStatus": audioStatus,
            "videoStatus": videoStatus,
            "auth": auth,
            "name": userName,
            "imgUrl": userImg,
        })
    });
    let data = await response.json();
}

let setUserStreamStatus = async (roomId, uuid, status, bool) => {
    let body;
    if(status === "audio"){
        body = JSON.stringify({
            "option": "audioStatus",
            "videoOrAudio": bool,
        })
    }else if(status === "video"){
        body = JSON.stringify({
            "option": "videoStatus",
            "videoOrAudio": bool,
        })
    }
    let response = await fetch(`/room/${roomId}/user/${uuid}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: body,
    });
    let data = await response.json();
}

let setBackRoomLeaveStatus = async (roomId, uuid) => {
    let response = await fetch(`/room/${roomId}/user/${uuid}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "option": "leave",
            "leave": false,
        })
    });
    let data = await response.json();
}

let setWaitingStatus = async (roomId, uuid, audioStatus, videoStatus) => {
    let response = await fetch(`/room/${roomId}/user/${uuid}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "option": "bothStatus",
            "bothAudio": audioStatus,
            "bothVideo": videoStatus,
        })
    });
    let data = await response.json();
}

let sendUserSecToDB = async (roomId, uuid, sec, click) => {
    let response = await fetch(`/room/${roomId}/user/${uuid}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "option": "game",
            "sec": sec,
            "gameClick": click,
        })
    });
    let data = await response.json();
    return data.data;
}

let getGroupInfo = async (roomId) => {
    let response = await fetch(`/room/${roomId}/users`);
    let data = await response.json();
    return [data.data, data.host];
}

let checkIfAuthAlready = async (roomId) => {
    let response = await fetch(`/room/${roomId}/auth`);
    let data = await response.json();
    if(data){
        return [data.message, data.authUuid]
    }
}

let getRoomChatAndShare = async (roomId) => {
    let response = await fetch(`/room/${roomId}/chatAndShare`);
    let data = await response.json();
    if(data){
        return [data.chatOpen, data.screenShare];
    }
}

let setRoomEnterToken = async (roomId) => {
    let response = await fetch(`/room/${roomId}/token`);
    let data = await response.json();
}

let setScreenShareBool = async (roomId, bool) => {
    let response = await fetch(`/room/${roomId}/screen`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "screenShare": bool,
        })
    });
    let data = await response.json();
}

let assignNewAuth = async (roomId, oldUuid, newUuid) => {
    let response = await fetch(`/room/${roomId}/auth`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "oldUuid": oldUuid,
            "newUuid": newUuid,
        })
    });
    let data = await response.json();
}

let setRoomChatStatus = async (roomId, b) => {
    let response = await fetch(`/room/${roomId}/chat`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "chatOpen": b,
        })
    });
    let data = await response.json();
}

// leave api
let setLeaveTrueOrDeleteRoom = async (roomId, uuid, auth) => {
    let response = await fetch(`/leave/${roomId}/user/${uuid}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "auth": auth,
        })
    });
    let data = await response.json();
    return data.ok;
}

let refuseUserInRoom = async (roomId, uuid) => {
    let response = await fetch(`/leave/${roomId}/user/${uuid}`, {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json"
        },
    });
    let data = await response.json();
}

// chat api
let resetAuthData = async (roomId, uuid) => {
    let response = await fetch(`/chat/${roomId}/user/${uuid}`);
    let data = await response.json();
    if(data){
        return [data.newHost, data.chatOpen];
    }
}

// game api
let getGameResult = async (roomId) => {
    let response = await fetch(`/game/${roomId}`);
    let data = await response.json();
    return data.data;
}

let resetAllUserGameClickFalse = async (roomId) => {
    let response = await fetch(`/game/${roomId}`, {
        method: "PATCH",
    });
    let data = await response.json();
}

export default {
    setWaitingStatus,
    resetAllUserGameClickFalse,
    setUserStreamStatus,
    setRoomEnterToken,
    setBackRoomLeaveStatus,
    resetAuthData,
    setRoomChatStatus,
    getRoomChatAndShare,
    getRemoteUser,
    insertMongoRoomData,
    setLeaveTrueOrDeleteRoom,
    refuseUserInRoom,
    setScreenShareBool,
    sendUserSecToDB,
    getGameResult,
    checkIfAuthAlready,
    assignNewAuth,
    getGroupInfo,
    checkRoomExist,
}
