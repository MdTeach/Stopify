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

export { getAllSongsInfo };
