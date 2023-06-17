import { auth, db, fStore, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  ref as ref1,
  push,
  child,
  update,
} from "firebase/database";

export function uploadImageAndGetDownloadURL(image_url, storagePath) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, image_url);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        console.log("Image uploaded successfully");
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

export async function updateSlidePuzzleWithImage(
  data,
  realTimeDBPath,
  realTimeDBKey
) {
  try {
    const slidePuzzleRef = ref1(db, realTimeDBPath);
    const childRef = child(slidePuzzleRef, realTimeDBKey);
    const updatedData = {
      ...data,
    };

    await update(childRef, updatedData);
    console.log("Value updated successfully!");
  } catch (error) {
    console.error("Error updating value:", error);
  }
}

export async function addDataToRealTImeDatabase(data, realTimeDBPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const newKey = push(ref1(db, realTimeDBPath), {
        ...data,
      }).key;

      resolve(newKey);
    } catch (error) {
      console.error("Error updating value:", error);
      reject(error);
    }
  });
}
