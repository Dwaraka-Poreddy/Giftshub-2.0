import { auth, db, fStore, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { ref as ref1, push, child, update, get } from "firebase/database";
import { data } from "jquery";

export function encryptedData(data, encryptionKey) {
  const encryptedBytes = CryptoJS.enc.Utf8.parse(data);
  return CryptoJS.AES.encrypt(encryptedBytes, encryptionKey).toString();
}

export function decryptedData(data, decryptionKey) {
  const decryptedBytes = CryptoJS.AES.decrypt(data, decryptionKey);
  return CryptoJS.enc.Utf8.stringify(decryptedBytes);
}

export async function updateDataInRealTimeDataBase(
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

export async function addDataToRealTimeDatabase(data, realTimeDBPath) {
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

export async function addDataToFirestore({
  Folder_name,
  wishes,
  fbimg,
  encryptionKey,
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

  try {
    let docRef;
    if (addData) {
      docRef = await addDoc(collectionPath, {
        Folder_name: encryptedData(Folder_name, encryptionKey),
        wishes: encryptedData(wishes, encryptionKey),
        fbimg,
        encryptionKey,
        Bday_date: encryptedData(Bday_date, encryptionKey),
        From_name: encryptedData(From_name, encryptionKey),
        To_name: encryptedData(To_name, encryptionKey),
        array_data,
        timestamp: serverTimestamp(),
      });
      console.log("Document operation successful. Document ID: ", docRef.id);
      return docRef.id;
    } else {
      await setDoc(documentPath, {
        Folder_name: encryptedData(Folder_name, encryptionKey),
        wishes: encryptedData(wishes, encryptionKey),
        fbimg,
        encryptionKey,
        Bday_date: encryptedData(Bday_date, encryptionKey),
        From_name: encryptedData(From_name, encryptionKey),
        To_name: encryptedData(To_name, encryptionKey),
        array_data,
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
      const decryptionKey = datanew.encryptionKey;
      datanew.wishes = decryptedData(datanew.wishes, decryptionKey)
      datanew.Folder_name = decryptedData(datanew.Folder_name, decryptionKey)
      datanew.From_name = decryptedData(datanew.From_name, decryptionKey)
      datanew.Bday_date = decryptedData(datanew.Bday_date, decryptionKey)
      datanew.To_name = decryptedData(datanew.To_name, decryptionKey)
      datanew.fbimg = decryptedData(datanew.fbimg, decryptionKey)
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

export async function updateFirestoreVariable({
  parent_collection,
  parent_document,
  child_collection,
  child_document,
  variableToUpdate,
  updatedValue,
}) {
  var documentRef;
  if (child_collection) {
    documentRef = doc(
      fStore,
      parent_collection,
      parent_document,
      child_collection,
      child_document
    );
  } else {
    documentRef = doc(fStore, parent_collection, parent_document);
  }

  try {
    await updateDoc(documentRef, {
      [variableToUpdate]: updatedValue,
    });
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export async function fetchUserAllPackData(useruid) {
  try {
    const q = query(
      collection(fStore, "n-day-pack", useruid, "giftshub"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);

    const fetchedGifts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return fetchedGifts;
  } catch (error) {
    console.error("Error fetching gifts: ", error);
    return [];
  }
}
