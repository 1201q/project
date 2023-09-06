import { dbService } from "./firebaseClient";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

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

export const grantAdminPermission = async (
  collectionId,
  documentId,
  field,
  value
) => {
  // 컬렉션의 특정 문서에 배열을 push 합니다.
  // [] 빈 배열인 경우 빈 배열에 push 합니다.
  // !!배열만 변경합니다.
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

export const revokeAdminPermission = async (
  collectionId,
  documentId,
  field,
  selectedUserUid
) => {
  // 컬렉션 / 내 uid / 해당 필드 / 삭제할 useruid
  // 특정 선택한 유저의 관리자 권한을 뺏습니다
  // 완료시 null을 return합니다.
  try {
    const docRef = doc(dbService, collectionId, documentId);
    const docSnap = await getDoc(docRef);

    const removeTarget = docSnap
      .data()
      .teamAdminMembers.find((item) => item === selectedUserUid);

    await updateDoc(docRef, { [field]: arrayRemove(removeTarget) });
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const exportTeamMember = async (
  collectionId,
  documentId,
  field,
  selectedUserUid
) => {
  // 컬렉션 / 내 uid / 해당 필드 / 삭제할 useruid
  // 선택한 유저를 팀에서 내보냅니다.
  // 완료시 null을 return합니다.
  try {
    const docRef = doc(dbService, collectionId, documentId);
    const docSnap = await getDoc(docRef);

    const removeTarget = docSnap
      .data()
      .teamMembers.find((item) => item === selectedUserUid);

    await updateDoc(docRef, { [field]: arrayRemove(removeTarget) });
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
};
