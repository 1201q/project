import { dbService } from "./firebaseClient";
import {
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export const addProject = async (collectionId, documentId, field, value) => {
  // 컬렉션 / 내 uid / 추가할 필드 / 추가할 value
  // 새로운 프로젝트를 추가합니다.
  // 해당 uid에 처음 프로젝트가 추가된다면 [value]로 초기값을 설정합니다.
  // 완료시 null을 return합니다.

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
};

export const removeProject = async (
  collectionId,
  documentId,
  field,
  selectedItemId
) => {
  // 컬렉션 / 내 uid / 추가할 필드 / 삭제할 스케줄의 id
  // 프로젝트 배열의 특정한 프로젝트를 삭제합니다.
  // 완료시 null을 return합니다.
  try {
    const docRef = doc(dbService, collectionId, documentId);
    const docSnap = await getDoc(docRef);

    const removeTarget = docSnap
      .data()
      .data.find((item) => item.id === selectedItemId);

    await updateDoc(docRef, { [field]: arrayRemove(removeTarget) });
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
};
