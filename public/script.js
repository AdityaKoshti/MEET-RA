// Socket.io client initialisation
const socket = io('/')
const videoGrid = document.getElementById('video-grid')

// Making the peer to peer connections with the library PeerJs witch is built on WebRTC.
const myPeer = new Peer(undefined, {
  secure: true,
  host:'my-peer-server-meet.herokuapp.com',
  port: 443
})

// My VideoStream
let myVideoStream;
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

// APIs to make audio and video strem possible
navigator.mediaDevices
.getUserMedia({
    video: true,
    audio: true
})
.then(stream => {

    myVideoStream = stream;
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)

        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })
    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    });
})

socket.on('user-disconnected', userId => {
    if(peers[userId]) peers[userId].close()
})

myPeer.on('open', async (id) => {
    socket.emit('join-room', ROOM_ID, id);
})


function connectToNewUser(userId, stream){
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream){
    // Once the video is loaded it will played automatically
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}


// Toggle function which reverses the function of mic button on click
const muteUnmute = () => {
    let enable = myVideoStream.getAudioTracks()[0].enabled;
    if(enable){
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    }else{
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}
  

// Toggle function which reverses the function of video button on click
const playStop = () => {
    let enable = myVideoStream.getVideoTracks()[0].enabled;
    if (enable) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
};
  
// Set Mic Off 
const setMuteButton = () => {
    const html = `
        <i class="fas fa-microphone"></i>
        <span>Mute</span>
    `;
    document.querySelector(".main__mute_button").innerHTML = html;
};
  
// Set Mic On
const setUnmuteButton = () => {
    const html = `
        <i class="unmute fas fa-microphone-slash"></i>
        <span>Unmute</span>
    `;
    document.querySelector(".main__mute_button").innerHTML = html;
};
  
// Stop Video
  const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `;
    document.querySelector(".main__video_button").innerHTML = html;
  };
  
// Play Video
  const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `;
    document.querySelector(".main__video_button").innerHTML = html;
  };