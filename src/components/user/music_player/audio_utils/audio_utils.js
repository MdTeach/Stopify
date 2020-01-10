import "firebase/storage";
import { Storage } from "../../../../utils/firebase";


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
