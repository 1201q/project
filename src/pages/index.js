import { useEffect, useState } from "react";
import nookies from "nookies";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import styled from "styled-components";
import { admin } from "@/utils/firebase/firebaseAdmin";
import { motion } from "framer-motion";
import {
  observeDocumentChanges,
  observeJoinedTeamChanges,
  observeCollectionData,
} from "@/utils/firebase/db";
// 컴포넌트
import Sidebar from "@/components/Main/Sidebar";
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
  const {
    isTeamDataLoading,
    setIsTeamDataLoading,
    joinedTeamList,
    setJoinedTeamList,
    setSelectedTeamData,
    selectedTeamUid,
    setSelectedTeamUid,
    setSelectedTeamMembersData,
  } = useTeam();

  useEffect(() => {
    const getScheduleData = (data) => {
      setScheduleList(data.data);
    };

    const getTeamListData = (data) => {
      const myteam = data.filter((item) => item.teamMembers.includes(uid));

      if (myteam.length === 0) {
        setJoinedTeamList([]);
      } else {
        setJoinedTeamList(myteam);
      }
    };

    const getSelectTeamUID = (data) => {
      const myTeamUid = data[0].selectedTeamUid;
      setSelectedTeamUid(myTeamUid);
    };

    if (user === null) {
      router.push("/auth/login");
      return;
    }

    router.push("/");
    observeCollectionData("users", [uid], getSelectTeamUID); // 내 유저 db 가져오기
    observeDocumentChanges("schedule", uid, getScheduleData); // 스케줄
    observeJoinedTeamChanges("team", getTeamListData);
  }, [user]);

  useEffect(() => {
    let members = [];

    if (joinedTeamList.length > 0 && selectedTeamUid) {
      const callback = (data) => {
        setSelectedTeamMembersData(data);
        setIsTeamDataLoading(false);
      };
      const selectedTeamData = joinedTeamList.filter(
        (team) => team.teamUID === selectedTeamUid
      );

      if (selectedTeamData[0]) {
        members = selectedTeamData[0].teamMembers;
        setSelectedTeamData(selectedTeamData[0]);
        observeCollectionData("users", members, callback);
      }
    }
  }, [joinedTeamList, selectedTeamUid]);

  return (
    <>
      {!user.user && isTeamDataLoading ? (
        <Loading text="로딩중..." />
      ) : (
        <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Sidebar userData={user} />
          <Calendar />
        </Container>
      )}
    </>
  );
}

const Container = styled(motion.div)`
  display: flex;
  width: 100%;
`;
