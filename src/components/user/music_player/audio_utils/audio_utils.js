import "firebase/storage";
import "firebase/firestore";
import { Storage, FireStore as db } from "../../../../utils/firebase";

/**
 * Returns the all songs infos from the database
 */
const getAllSongsInfo = async () => {
  try {
    const snaps = await db.collection("music").get();
    //const rsnaps = await db.collection("recentSongs").get();

    const songs = snaps.docs.map(el => el.data());

    return songs;
  } catch (error) {
    return { error: error };
  }
};

/**
 * Returns the all recent songs infos from the database
 */
const getAllRecentSongsInfo = async (currentUser) => {
  try {
    const snaps = await db
      .collection("recentSongs")
      .where("uid", "==", currentUser.uid)
      //
      .get();
    const recsongs = snaps.docs.map(el => el.data());

    return recsongs;
  } catch (error) {
    return { error: error };
  }
};


const subscriptionToRecentSongChanges = (currentUser,callback)=>{
  db.collection("recentSongs")
      .where("uid", "==", currentUser.uid)
      .onSnapshot(
        async function(_) {
          callback();
        },
        function(error) {
          console.log(error, "Error");
        }
  )
}

export { getAllSongsInfo, getAllRecentSongsInfo,subscriptionToRecentSongChanges};
