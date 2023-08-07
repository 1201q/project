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

export const addSchedule = async (collectionId, documentId, field, value) =>
  // 컬렉션 / 내 uid / 추가할 필드 / 추가할 value
  // 캘린더에 스케줄을 추가합니다.
  // 해당 uid에 처음 스케줄이 추가된다면 [value]로 초기값을 설정합니다.
  // 완료시 null을 return합니다.
  {
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

export const removeSchedule = async (
  collectionId,
  documentId,
  field,
  selectedItemId
) => {
  // 컬렉션 / 내 uid / 추가할 필드 / 삭제할 스케줄의 id
  // 캘린더 배열의 지정한 스케줄을 삭제합니다.
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

export const toggleScheduleComplete = async (
  collectionId,
  documentId,
  field,
  selectedItemId
) => {
  // 컬렉션 / 내 uid / 추가할 필드 / 부울 변환할 스케줄의 id
  // isCompleted를 부울 변환해 업데이트 합니다.
  // 완료시 null을 return합니다.

  try {
    const docRef = doc(dbService, collectionId, documentId);
    const docSnap = await getDoc(docRef);

    const dataArray = docSnap.data()[field];
    const itemIndex = dataArray.findIndex((item) => item.id === selectedItemId);

    if (itemIndex !== -1) {
      //해당하는 스케줄이 스케줄 배열에 존재한다면
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
