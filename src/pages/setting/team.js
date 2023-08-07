import Team from "@/components/Team/Team";
import Header from "@/components/setting/Header";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import nookies from "nookies";
import { admin } from "@/utils/firebase/firebaseAdmin";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useTeam } from "@/utils/context/TeamContext";
import { observeJoinedTeamChanges } from "@/utils/firebase/db";
import { motion } from "framer-motion";

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

    return { props: { uid: uid, email: email } };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};

export default function Setting({ uid }) {
  const user = useAuth();
  const { setJoinedTeamList } = useTeam();

  useEffect(() => {
    const getTeamList = (data) => {
      const myteam = data.filter((item) => item.teamMembers.includes(uid));
      setJoinedTeamList(myteam);
    };

    observeJoinedTeamChanges("team", getTeamList);
  }, []);

  return (
    <>
      {user.user && (
        <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Header smallHeaderText={"팀"} />
          <Main>
            <Padding>
              <Team />
            </Padding>
          </Main>
        </Container>
      )}
    </>
  );
}

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  margin-top: 50px;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Padding = styled.div`
  width: 1080px;
  height: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1080px) {
    width: 800px;
  }
`;
