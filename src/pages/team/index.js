import styled from "styled-components";
import { motion } from "framer-motion";
import * as colors from "../../styles/colors";

import { useAuth } from "@/utils/context/auth/AuthProvider";

//svg
import JoinUser from "../../assets/user-add.svg";
import Team from "../../assets/users-medical.svg";
import Info from "../../assets/info.svg";
import { useRouter } from "next/router";

export default function Join() {
  const user = useAuth();
  const router = useRouter();

  return (
    <MainContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopHeaderText>팀을 이루어보세요</TopHeaderText>
      <ButtonContainer>
        <MenuBtn
          onClick={() => {
            router.push("/team/join");
          }}
        >
          <Contents whileHover={{ scale: 1.08, opacity: 0.9 }}>
            <Team width={70} height={70} fill={colors.font.black} />
            <ButtonText>기존 팀에 참여하기</ButtonText>
          </Contents>
        </MenuBtn>
        <MenuBtn
          onClick={() => {
            router.push("/team/new");
          }}
        >
          <Contents whileHover={{ scale: 1.08, opacity: 0.9 }}>
            <JoinUser width={50} height={50} fill={colors.font.black} />
            <ButtonText>새로운 팀 생성하기</ButtonText>
          </Contents>
        </MenuBtn>
      </ButtonContainer>
      {user.user && (
        <CurrentUserInfo initial={{ y: 20 }} animate={{ y: 0 }}>
          <Info
            width={20}
            height={20}
            fill={"white"}
            style={{ marginRight: "10px" }}
          />
          현재 로그인중. {user.user.displayName}님.
        </CurrentUserInfo>
      )}
    </MainContainer>
  );
}

// container
const MainContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 460px;
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
`;

// 요소
const TopHeaderText = styled.p`
  position: absolute;
  top: 100px;
  text-align: center;
  font-weight: 700;
  font-size: 60px;
  color: ${colors.font.black};
`;

const MenuBtn = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 3px solid ${colors.border.deepgray};
  border-radius: 10px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.02);
  cursor: pointer;

  svg {
    margin-bottom: 30px;
  }

  &:hover {
    border: 3px solid ${colors.calendar.blue};

    svg {
      fill: ${colors.calendar.blue};
    }

    p {
      color: ${colors.calendar.blue};
    }
  }
`;

const Contents = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.p`
  position: absolute;
  bottom: 35px;
  font-weight: 700;
  font-size: 20px;
  color: ${colors.font.black};
`;

const CurrentUserInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  width: 300px;
  background-color: ${colors.calendar.blue};
  text-align: center;
  padding: 13px 13px;
  border-radius: 30px;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.08);
  color: white;
  font-size: 20px;
`;
