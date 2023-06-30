import { dbService } from "./firebaseClient";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

export async function setDocument(collectionId, documentId, data) {
  try {
    const docRef = doc(dbService, collectionId, documentId);
    await setDoc(docRef, data);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addDocument(collectionId, data) {
  try {
    const collectionRef = collection(dbService, collectionId);
    await addDoc(collectionRef, data);
  } catch (error) {
    console.log(error);
    return null;
  }
}
