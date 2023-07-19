import { logout } from "@/utils/firebase/auth";

import nookies from "nookies";
import { admin } from "@/utils/firebase/firebaseAdmin";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useRouter } from "next/router";
import { authService, dbService } from "@/utils/firebase/firebaseClient";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  addDocument,
  observeDocumentChanges,
  setDocument,
} from "@/utils/firebase/db";
import Sidebar from "@/components/Sidebar";
import Calendar from "@/components/Calendar/Calendar";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Loading from "@/components/Loading";

dayjs.extend(isSameOrBefore);

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await admin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    return {
      props: { email: email, uid: uid },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};

export default function Home({ email, uid }) {
  const user = useAuth();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const getSchedule = (data) => {
      setTodoList(data.data);
    };
    observeDocumentChanges("schedule", uid, getSchedule);
  }, []);

  return (
    <>
      {!user.user ? (
        <Loading text="로딩중..." />
      ) : (
        <Container>
          <Sidebar userData={user} />
          <Calendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            realtimeTodoList={todoList}
          />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;
