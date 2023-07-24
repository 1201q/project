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

// -------------------------------------------- 추가
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

// -------------------------------------------- 실시가 업데이트 감시
// 특정 id(이름)을 가진 doc의 변화감지
// callback 함수로 재활용 가능
export const observeDocumentChanges = (collectionName, docId, callback) => {
  const collectionRef = collection(dbService, collectionName);

  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    snapshot.forEach((doc) => {
      if (doc.id === docId) {
        callback(doc.data());
      }
    });
  });
};

// -------------------------------------------- 삭제
export const removeArrayItem = async (
  collectionId,
  documentId,
  field,
  selectedItemId
) => {
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

export const deleteDocument = async (collectionName, docId) => {
  await deleteDoc(doc(dbService, collectionName, docId));
};

// -------------------------------------------- 수정
// 스케줄 arr 특정 인덱스의 부울 변환
export const toggleArrayItem = async (
  collectionId,
  documentId,
  field,
  selectedItemId
) => {
  try {
    const docRef = doc(dbService, collectionId, documentId);
    const docSnap = await getDoc(docRef);

    const dataArray = docSnap.data()[field];
    const itemIndex = dataArray.findIndex((item) => item.id === selectedItemId);

    if (itemIndex !== -1) {
      let updatedItem = { ...dataArray[itemIndex] };
      updatedItem.isCompleted = !updatedItem.isCompleted;
      let updatedDataArray = [...dataArray];
      updatedDataArray[itemIndex] = updatedItem;

      await updateDoc(docRef, { [field]: updatedDataArray });
    }
    return null;
  } catch (error) {
    return error;
  }
};
