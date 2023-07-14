import { dbService } from "./firebaseClient";
import {
  getDoc,
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

// document 이름 지정
export async function setDocument(collectionId, documentId, data) {
  try {
    const docRef = doc(dbService, collectionId, documentId);
    await setDoc(docRef, data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

// document 이름은 랜덤
export async function addDocument(collectionId, data) {
  try {
    const collectionRef = collection(dbService, collectionId);
    await addDoc(collectionRef, data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

// 컬렉션 특정 문서에 배열을 push
export async function updateArrayField(collectionId, documentId, field, value) {
  try {
    const docRef = doc(dbService, collectionId, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, { [field]: arrayUnion(value) });
    } else {
      setDoc(docRef, { [field]: [value] });
    }
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
}
