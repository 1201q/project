import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../styles/colors";
import { v4 as uuidv4 } from "uuid";

// svg
import A from "../../assets/a.svg";
import User from "../../assets/user.svg";
import Users from "../../assets/users-alt.svg";
import Info from "../../assets/info.svg";
import Flag from "../../assets/flag.svg";
import List from "../../assets/list.svg";
import AngleDown from "../../assets/angle-small-down.svg";
import AngleUp from "../../assets/angle-small-up.svg";
import { useTeam } from "@/utils/context/TeamContext";

export default function Team() {
  const { joinedTeamList } = useTeam();
  console.log(joinedTeamList);

  const testTeamData = [
    {
      teamName: "Team A",
      leader: "John Doe",
      description: "This is Team A. We are a group of creative minds.",

      currentMembers: 5,
    },
    {
      teamName: "Team B",
      leader: "Jane Smith",
      description: "Team B is all about collaboration and innovation.",

      currentMembers: 3,
    },
    {
      teamName: "Team C",
      leader: "Michael Johnson",
      description: "Join Team C for exciting projects and challenges.",

      currentMembers: 7,
    },
    {
      teamName: "Team D",
      leader: "Emily Lee",
      description: "We are Team D, passionate about making a difference.",

      currentMembers: 4,
    },
  ];

  return (
    <Container>
      <HeaderContainer>
        <TableHeaderText>나의 팀을 관리할 수 있습니다.</TableHeaderText>
      </HeaderContainer>
      <TableHeaderContainer>
        {/* 팀이름 */}
        <Fleid styledwidth={"250px"}>
          <List
            width={13}
            height={13}
            fill={colors.font.gray}
            style={{ marginRight: "35px" }}
          />
          <A
            width={13}
            height={13}
            fill={colors.font.gray}
            style={{ marginRight: "8px" }}
          />
          팀 이름
          <SortBtn>
            <AngleDown width={16} height={16} fill={colors.font.gray} />
          </SortBtn>
        </Fleid>
        {/* 리더 */}
        <Fleid styledwidth={"150px"}>
          <User
            width={16}
            height={16}
            fill={colors.font.gray}
            style={{ marginRight: "8px" }}
          />
          소유자{" "}
          <SortBtn>
            <AngleDown width={16} height={16} fill={colors.font.gray} />
          </SortBtn>
        </Fleid>
        {/* 설명 */}
        <Fleid>
          <Info
            width={16}
            height={16}
            fill={colors.font.gray}
            style={{ marginRight: "8px" }}
          />
          설명{" "}
        </Fleid>
        {/* 참여인원 */}
        <Fleid styledwidth={"130px"}>
          <Users
            width={13}
            height={13}
            fill={colors.font.gray}
            style={{ marginRight: "8px" }}
          />
          참여인원{" "}
          <SortBtn>
            <AngleDown width={16} height={16} fill={colors.font.gray} />
          </SortBtn>
        </Fleid>
        {/* 참가하기 */}
        <Fleid
          styledwidth={"100px"}
          style={{ padding: 0, display: "flex", justifyContent: "center" }}
        >
          참가하기
        </Fleid>
      </TableHeaderContainer>
      {joinedTeamList.map((item, index) => (
        <Col key={uuidv4()}>
          {/* 팀이름 */}
          <Fleid styledwidth={"250px"}>
            <div style={{ width: "46px" }}>{index + 1}</div>
            <div>{item.teamName}</div>
          </Fleid>
          {/* 리더 */}
          <Fleid styledwidth={"150px"}>{item.teamOwnerKRname}</Fleid>
          {/* 설명 */}
          <Fleid styledwidth={"410px"}>{item.teamDescription}</Fleid>
          {/* 참여인원 */}
          <Fleid styledwidth={"130px"}>
            {joinedTeamList[index].teamMembers.length}
          </Fleid>
          {/* 참가하기 */}
          <Fleid styledwidth={"100px"}>
            <SubmitBtn>참여하기</SubmitBtn>
          </Fleid>
        </Col>
      ))}
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid ${colors.border.gray}; */
  height: 61px;
  margin-bottom: 15px;
`;

const TableHeaderContainer = styled.div`
  display: flex;
  /* border: 1px solid ${colors.border.deepgray}; */
  background-color: ${colors.background.gray};
  height: 40px;
  font-size: 15px;
  font-weight: 600;
  color: ${colors.font.darkgray};
`;

// table
const Col = styled.div`
  width: 100%;
  height: 45px;
  border-bottom: 1px solid ${colors.border.deepgray};
  display: flex;
`;

const Fleid = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 15px;
  width: ${(props) => (props.styledwidth ? props.styledwidth : "100%")};
  min-width: ${(props) => (props.styledwidth ? props.styledwidth : "200px")};
  height: 100%;
`;

const SortBtn = styled.div`
  position: absolute;
  right: 10px;
  margin-top: 5px;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  border: 1px solid ${colors.border.deepgray};
  border-radius: 10px;
  padding: 4px 10px;
`;

const TableHeaderText = styled.p`
  font-size: 25px;
  font-weight: 700;
  color: ${colors.font.black};
`;