import { useEffect } from "react";
import nookies from "nookies";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import styled from "styled-components";
import { admin } from "@/utils/firebase/firebaseAdmin";
import {
  observeDocumentChanges,
  observeCollectionChanges,
  observeJoinedTeamChanges,
} from "@/utils/firebase/db";
// 컴포넌트
import Sidebar from "@/components/Sidebar";
import Calendar from "@/components/Calendar/Calendar";
import Loading from "@/components/Loading";
// context
import { useCalendar } from "@/utils/context/CalendarContext";
import { useTeam } from "@/utils/context/TeamContext";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useRouter } from "next/router";

dayjs.extend(isSameOrBefore);

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    if (!cookies.token) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

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
  const router = useRouter();
  const { setScheduleList } = useCalendar();
  const { setJoinedTeamList } = useTeam();

  useEffect(() => {
    const getSchedule = (data) => {
      setScheduleList(data.data);
    };

    const getTeamList = (data) => {
      const myteam = data.filter((item) => item.teamMembers.includes(uid));
      setJoinedTeamList(myteam);
      console.log(data);
    };

    if (user.user) {
      router.push("/");

      observeDocumentChanges("schedule", uid, getSchedule); // 스케줄
      observeJoinedTeamChanges("team", getTeamList);
    }
  }, [user]);

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
