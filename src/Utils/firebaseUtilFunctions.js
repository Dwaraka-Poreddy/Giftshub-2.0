import { auth, db, fStore, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref as ref1, push, child, update, get } from "firebase/database";

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

export function getDataFromRealtimeDatabase(realtimeDataPath) {
  const todoRef = ref1(db, realtimeDataPath);
  return new Promise((resolve, reject) => {
    get(todoRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          resolve(data); // Resolve with the retrieved data
        } else {
          resolve(null); // Resolve with null if no data available
        }
      })
      .catch((error) => {
        reject(error); // Reject with the error if any occurs
      });
  });
}

export async function addMultiDayPackageDataToFirestore({
  Folder_name,
  wishes,
  fbimg,
  Bday_date,
  From_name,
  To_name,
  array_data,
  parent_collection,
  parent_document,
  child_collection,
}) {
  const collectionPath = collection(
    fStore,
    parent_collection,
    parent_document,
    child_collection
  );

  try {
    const docRef = await addDoc(collectionPath, {
      Folder_name,
      wishes,
      fbimg,
      Bday_date,
      From_name,
      To_name,
      array_data,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
}

export async function addLivelinksDataToFirestore({
  Folder_name,
  wishes,
  fbimg,
  Bday_date,
  From_name,
  To_name,
  array_data,
  parent_collection,
  parent_document,
}) {
  const collectionPath = collection(fStore, parent_collection);
  const documentPath = doc(collectionPath, parent_document);

  try {
    const docRef = await setDoc(documentPath, {
      Folder_name: Folder_name,
      wishes: wishes,
      fbimg: fbimg,
      From_name: From_name,
      Bday_date: Bday_date,
      To_name: To_name,
      array_data: array_data,
      timestamp: serverTimestamp(),
    });
    console.log("Document updated successfully");
    return docRef.id;
  } catch (error) {
    console.error("Error updating document: ", error);
    return null;
  }
}

export async function addDataToFirestore({
  Folder_name,
  wishes,
  fbimg,
  Bday_date,
  From_name,
  To_name,
  array_data,
  parent_collection,
  parent_document,
  child_collection,
  addData,
}) {
  var collectionPath = collection(fStore, parent_collection);
  var documentPath;

  if (addData) {
    collectionPath = collection(
      collectionPath,
      parent_document,
      child_collection
    );
  } else {
    documentPath = doc(collectionPath, parent_document);
  }

  console.log(addData, "hmmmmm", collectionPath);

  try {
    let docRef;
    if (addData) {
      docRef = await addDoc(collectionPath, {
        Folder_name,
        wishes,
        fbimg,
        Bday_date,
        From_name,
        To_name,
        array_data,
        timestamp: serverTimestamp(),
      });
      console.log("Document operation successful. Document ID: ", docRef.id);
      return docRef.id;
    } else {
      await setDoc(documentPath, {
        Folder_name,
        wishes,
        fbimg,
        Bday_date,
        From_name,
        To_name,
        array_data: array_data,
        timestamp: serverTimestamp(),
      });
      console.log("Document operation successful. ");
      return parent_document;
    }
  } catch (error) {
    console.error("Error performing document operation: ", error);
    return null;
  }
}

export async function fetchDocumentFromFireStore(docRef) {
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const datanew = docSnap.data();
      return datanew;
    } else {
      console.log("Document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
