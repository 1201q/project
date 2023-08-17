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

export const updateTeamData = async (
  collectionId,
  documentId,
  field,
  value
) => {
  // 컬렉션 / 팀의 docid / 수정할 필드 / 수정할 value
  // 팀 설정 모달에서 데이터를 변경합니다.
  // 완료시 null을 return합니다.
  // !!배열이 아닌 데이터만 변경합니다.
  try {
    const docRef = doc(dbService, collectionId, documentId);
    const docSnap = await getDoc(docRef);

    await updateDoc(docRef, { [field]: value });

    return null;
  } catch (error) {
    console.log(error);
  }
};
