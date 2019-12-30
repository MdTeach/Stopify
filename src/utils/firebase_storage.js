import "firebase/storage";
import {Storage} from './firebase'


//soring our bucket url
const bucket_url = "gs://auth-a3c8b.appspot.com";

//define the audio
let audio = new Audio()

//get the music stored
const getTestAudio = ()=>{
    const songName = "01. Beatiful People.mp3";
    console.log("Loading "+ songName);
    const songRef = Storage.ref().child(songName);
    songRef.getDownloadURL().then((url)=>{
        console.log(url)
        audio = new Audio(url);
        console.log("Now playing...")
        audio.play();
    }).catch((err)=>{
        console.log(err)
    }); 
      
}

const playPauseAudio = ()=>{
    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
}

export {
    getTestAudio,
    playPauseAudio
}