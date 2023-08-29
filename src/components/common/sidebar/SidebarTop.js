import styled from "styled-components";
import * as colors from "../../../styles/colors";
import { motion } from "framer-motion";
import { useMain } from "@/utils/context/MainContext";
import { useAuth } from "@/utils/context/auth/AuthProvider";

export default function SidebarTop() {
  const { setIsUserModalOpen } = useMain();
  const user = useAuth();

  return (
    <Container>
      <ProfileContainer>
        <ProfileWrapper
          onClick={() => {
            setIsUserModalOpen(true);
          }}
        >
          <ProfileImage>나</ProfileImage>
          <ProfileName>{user.user ? user.user.displayName : ""}</ProfileName>
        </ProfileWrapper>
      </ProfileContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  position: fixed;
  background-color: white;
  z-index: 100;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.border.darkgray};
  padding: 8px;
  height: 61px;
  background-color: ${colors.background.midnight};
`;

const ProfileWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 7px;
  svg {
    margin-left: 11px;
  }

  &:hover {
    background-color: #343541;

    p {
      font-weight: 600;
    }
  }
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  border-radius: 7px;
  background-color: ${colors.others.orange};
  color: white;
  font-weight: 700;
  margin-right: 15px;
`;

const ProfileName = styled.p`
  color: ${colors.font.white};
  font-weight: 800;
  font-size: 19px;
`;
