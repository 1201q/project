import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import nookies from "nookies";
import { admin } from "@/utils/firebase/firebaseAdmin";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useTeam } from "@/utils/context/TeamContext";
import { observeJoinedTeamChanges } from "@/utils/firebase/db";
import { motion } from "framer-motion";
import * as colors from "../../styles/colors";

import TeamSettingModal from "../../components/TeamSetting/Modal/TeamSettingModal";
import TeamMain from "../../components/TeamSetting/TeamMain";
import Header from "../../components/TeamSetting/Header";

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
  const { isTeamSettingModal, setJoinedTeamList } = useTeam();

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
        <>
          <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Header smallHeaderText={"팀"} />
            <Main>
              <Padding>
                <TeamMain />
              </Padding>
            </Main>
          </Container>
          {isTeamSettingModal && <TeamSettingModal />}
        </>
      )}
    </>
  );
}

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh;
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

const BgContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  width: 1200px;
  max-width: 90vw;
  height: 600px;
  max-height: 90vh;
  background-color: red;
  z-index: 900;
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;

  margin: 20px;

  &:hover {
    background-color: ${colors.background.gray};
  }
`;

// header
const HeaderText = styled.p`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 800;
`;
const TeamHeaderText = styled.p`
  /* margin-bottom: 30px; */

  font-size: 18px;
  font-weight: 700;
  color: ${colors.font.gray};
  opacity: 0.5;
  margin-left: 15px;
  margin-top: 12px;
`;

const HeaderContainer = styled.div`
  display: flex;
`;
