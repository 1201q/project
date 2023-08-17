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

export async function setDocument(collectionId, documentId, data) {
  // 새로운 document를 생성합니다. 이름(documentId)을 지정합니다.
  try {
    const docRef = doc(dbService, collectionId, documentId);
    await setDoc(docRef, data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addDocument(collectionId, data) {
  // 새로운 document를 생성합니다. 이름(documentId)은 랜덤입니다.
  try {
    const collectionRef = collection(dbService, collectionId);
    await addDoc(collectionRef, data);
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateArrayField(collectionId, documentId, field, value) {
  // 컬렉션의 특정 문서에 배열을 push 합니다.
  // [] 빈 배열인 경우 빈 배열에 push 합니다.
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

export async function updateTeamField(collectionId, documentId, field, value) {
  // 컬렉션의 특정 문서에 배열을 push 합니다.
  // [] 빈 배열인 경우 빈 배열에 push 합니다.
  try {
    const docRef = doc(dbService, collectionId, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, { [field]: arrayUnion(value) });
    } else {
      setDoc(docRef, { [field]: [value] });
    }
    return docSnap.id;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// -------------------------------------------- 실시간 업데이트 감시
export const observeCollectionChanges = (
  collectionName,
  teamCode,
  callback
) => {
  // 특정 컬렉션의 추가와 삭제 변화를 감시합니다.
  // callback 함수로 재활용 가능
  const collectionRef = collection(dbService, collectionName);

  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    const dataArr = []; // 빈 배열 생성
    const docId = [];
    snapshot.forEach((doc) => {
      if (doc.data().teamCode === teamCode) {
        dataArr.push(doc.data());
        docId.push(doc.id);
      }
    });
    callback(dataArr, docId);
  });
};

export const observeDocumentChanges = (collectionName, docId, callback) => {
  // 특정 id(이름)을 가진 doc의 변화를 감시합니다.
  // callback 함수로 재활용 가능
  const collectionRef = collection(dbService, collectionName);

  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    snapshot.forEach((doc) => {
      if (doc.id === docId) {
        callback(doc.data());
      }
    });
  });
};

export const observeJoinedTeamChanges = (collectionName, callback) => {
  // 특정 컬렉션의 추가와 삭제 변화를 감시합니다.
  // callback 함수로 재활용 가능
  const collectionRef = collection(dbService, collectionName);

  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    const dataArr = [];
    snapshot.forEach((doc) => {
      dataArr.push({ docId: doc.id, ...doc.data() });
      // dataArr.push(doc.id);
    });

    callback(dataArr);
  });
};

// -------------------------------------------- 삭제
export const removeArrayItem = async (
  collectionId,
  documentId,
  field,
  selectedItemId
) => {
  // 배열의 특정 id를 가진 요소를 삭제해서 업데이트합니다.
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
  // 해당 doc을 완전히 삭제합니다.
  await deleteDoc(doc(dbService, collectionName, docId));
};

// -------------------------------------------- 수정

export const toggleArrayItem = async (
  collectionId,
  documentId,
  field,
  selectedItemId
) => {
  // 스케줄 arr 특정 인덱스의 (상태)부울을 변환합니다.
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
