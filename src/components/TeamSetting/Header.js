import styled from "styled-components";
import * as colors from "../../styles/colors";
import { useAuth } from "@/utils/context/auth/AuthProvider";

export default function Header({ headerText = "설정", smallHeaderText }) {
  const user = useAuth();
  return (
    <>
      <HeaderContainer>
        <Padding>
          <FlexDiv>
            <HeaderText>{headerText}</HeaderText>
            <SmallHeaderText>{smallHeaderText}</SmallHeaderText>
          </FlexDiv>
          <FlexDiv>
            <ProfileWrapper>
              <ProfileImage>나</ProfileImage>
              <ProfileName>{user && user.user.displayName}</ProfileName>
            </ProfileWrapper>
          </FlexDiv>
        </Padding>
      </HeaderContainer>
    </>
  );
}

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid ${colors.border.deepgray};
  z-index: 800;
`;

const Padding = styled.div`
  width: 1080px;
  height: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1080px) {
    width: 800px;
  }
`;

const HeaderText = styled.p`
  font-size: 29px;
  font-weight: 700;
  color: ${colors.font.black};
`;

const SmallHeaderText = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.font.gray};
  opacity: 0.5;
  margin-left: 15px;
  margin-top: 9px;
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
  margin-right: 10px;
`;

const ProfileName = styled.p`
  color: ${colors.font.black};
  font-weight: 800;
  font-size: 19px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    background-color: #ededed;
    opacity: 0.95;
  }
  padding: 6px 8px;
  border-radius: 7px;
  cursor: pointer;
`;
