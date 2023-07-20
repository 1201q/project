import { useEffect } from "react";
import nookies from "nookies";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import styled from "styled-components";
import { admin } from "@/utils/firebase/firebaseAdmin";
import { observeDocumentChanges } from "@/utils/firebase/db";
// 컴포넌트
import Sidebar from "@/components/Sidebar";
import Calendar from "@/components/Calendar/Calendar";
import Loading from "@/components/Loading";
// context
import { useCalendar } from "@/utils/context/CalendarContext";
import { useAuth } from "@/utils/context/auth/AuthProvider";

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

export default function Home({ uid }) {
  const user = useAuth();
  const { setScheduleList } = useCalendar();

  useEffect(() => {
    const getSchedule = (data) => {
      setScheduleList(data.data);
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
          <Calendar />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;
