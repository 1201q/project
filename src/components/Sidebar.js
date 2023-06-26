import styled from "styled-components";
import Image from "next/image";

export default function Sidebar() {
  return (
    <Container>
      <Wrapper>
        <LogoContainer>
          <Image
            src={require("../assets/rocket-lunch.svg")}
            alt="logo"
            width={30}
            height={30}
          />
        </LogoContainer>

        <MenuContainer>
          <Menu>
            <Image
              src={require("../assets/check-circle.svg")}
              alt="check"
              width={20}
              height={20}
            />
            <Text>나의작업</Text>
          </Menu>
          <Menu>
            <Image
              src={require("../assets/calendar.svg")}
              alt="calendar"
              width={20}
              height={20}
            />
            <Text>일정</Text>
          </Menu>
          <Menu>
            <Image
              src={require("../assets/file-medical-alt.svg")}
              alt="file"
              width={20}
              height={20}
            />
            <Text>레포트</Text>
          </Menu>
          <Menu>
            <Image
              src={require("../assets/diagram-project.svg")}
              alt="diagram"
              width={20}
              height={20}
            />
            <Text>프로젝트</Text>
          </Menu>
        </MenuContainer>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fbfcff;
  width: 220px;
  min-width: 220px;
  height: 100vh;
  background-color: #fbfcff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 30px 30px;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  color: #a9b2c5;
  font-size: 15px;
  font-weight: 600;
  margin-left: 20px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  img {
    margin-top: 0px;
  }
`;

const MenuContainer = styled.div``;

const LogoContainer = styled.div`
  margin-bottom: 60px;
`;
