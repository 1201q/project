import styled from "styled-components";
import { color, motion } from "framer-motion";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isBetween from "dayjs/plugin/isBetween";
import * as colors from "../../styles/colors";

import User from "../../assets/users-alt.svg";

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

export default function Main() {
  return (
    <Container>
      <Header>프로젝트</Header>
      <ProjectContainer>
        <Card>
          <CardColor styledcolor={colors.calendar.green}></CardColor>
          <div style={{ maxWidth: "100%" }}>
            <CardTitle>나의 프로젝트!</CardTitle>
            <MemberSum>
              <User
                width={13}
                height={13}
                fill={colors.font.gray}
                style={{ marginRight: "10px", marginTop: "1px" }}
              />
              <p>10</p>
            </MemberSum>
          </div>
        </Card>
      </ProjectContainer>
      <Header>오늘 할 일</Header>
      <ContentsContainer>1</ContentsContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  padding: 15px 25px;
  overflow-y: scroll;
`;

const ProjectContainer = styled.div`
  width: 100%;
  margin-bottom: 35px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`;

const ContentsContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 35px;
`;

const Header = styled.p`
  width: 150px;
  font-size: 25px;
  font-weight: 700;
  color: ${colors.font.black};
  margin-bottom: 20px;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 296.5px;
  height: 140px;
  border-radius: 7px;
  border: 1px solid ${colors.border.gray};
  background-color: ${colors.background.gray};
  display: flex;
  cursor: pointer;
`;

const CardColor = styled.div`
  width: 10px;
  min-width: 10px;
  height: 100%;
  background-color: ${(props) => props.styledcolor};
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  border: 1px solid ${colors.border.gray};
`;

const CardTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  max-width: 100%;
  color: ${colors.font.black};
  word-wrap: break-word;
  margin-right: 10px;
  margin-top: 10px;
`;

const MemberSum = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  left: 30px;
  bottom: 20px;

  p {
    font-size: 17px;
    color: ${colors.font.gray};
  }
`;
