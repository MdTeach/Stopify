import "firebase/storage";
import { Storage } from "./firebase";

//soring our bucket url
const bucket_url = "gs://auth-a3c8b.appspot.com";

//define the audio
let audio = new Audio();

//get the music stored
const getTestAudio = async () => {
  const songName = "01. Beatiful People.mp3";
  console.log("Loading " + songName);
  const songUrl = await getAudioUrl(songName);
  audio = new Audio(songUrl);
  console.log("Now playing...");
  audio.play();

  // const songRef = Storage.ref().child(songName);
  // songRef.getDownloadURL().then((url)=>{
  //     console.log(url)
  //     audio = new Audio(url);
  //     console.log("Now playing...")
  //     audio.play();
  // }).catch((err)=>{
  //     console.log(err)
  // });
};

const getAllFiles = async () => {
  const listRef = Storage.ref().root.listAll();
  return listRef;
};

const getAudioUrl = async songName => {
  const songRef = Storage.ref().child(songName);
  return songRef.getDownloadURL();
};

const getPicture = async picture => {
  const picRef = Storage.ref("album_pic/" + picture + ".jpg");
  return picRef.getDownloadURL();
};

const playPauseAudio = () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};

export { getTestAudio, getAudioUrl, playPauseAudio, getPicture, getAllFiles };
