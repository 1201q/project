import styled from "styled-components";
import * as colors from "../../styles/colors";
import { v4 as uuidv4 } from "uuid";

// svg
import A from "../../assets/a.svg";
import User from "../../assets/user.svg";
import Users from "../../assets/users-alt.svg";
import Info from "../../assets/info.svg";
import List from "../../assets/list.svg";
import Setting from "../../assets/settings (3).svg";

import { useTeam } from "@/utils/context/TeamContext";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useEffect } from "react";
import { observeCollectionData } from "@/utils/firebase/db";

export default function TeamMain() {
  const user = useAuth();
  const {
    selectedTeamData,
    setSelectedTeamData,
    setIsTeamSettingModal,
    joinedTeamList,
    setSelectedTeamMembersData,
  } = useTeam();

  const renderAuthorityInfo = (item) => {
    const isOwner = item.teamOwner === user.user.uid;
    const isAdmin =
      item.teamAdminMembers.filter((uid) => uid === user.user.uid).length > 0
        ? true
        : false;

    if (isOwner) {
      return <AdminInfo styledbg={colors.calendar.blue}>소유자</AdminInfo>;
    } else if (isAdmin) {
      return <AdminInfo styledbg={colors.calendar.gray}>관리자</AdminInfo>;
    }
  };

  useEffect(() => {
    if (selectedTeamData) {
      const callback = (data) => {
        // membersData가 / db의 teamMembers와 순서가 맞게
        let orderArr = [...selectedTeamData.teamMembers];

        const sortArr = orderArr.map((uid) =>
          data.find((item) => uid === item.uid)
        );
        setSelectedTeamMembersData(sortArr);

        // membersData가 / db의 teamMembers와 순서가 맞게
      };

      observeCollectionData("users", selectedTeamData.teamMembers, callback);
    }
  }, [selectedTeamData]);

  return (
    <Container>
      <PageHeaderContainer>
        <HeaderText>나의 팀을 관리할 수 있습니다.</HeaderText>
      </PageHeaderContainer>
      <TableHeaderContainer>
        <Header maxwidth={"60px"}>
          <List
            width={13}
            height={13}
            fill={colors.font.gray}
            style={{ marginLeft: "10px" }}
          />
        </Header>
        {/* 팀이름 */}
        <Header maxwidth={"240px"}>
          <A width={13} height={13} fill={colors.font.gray} />팀 이름
        </Header>
        {/* 리더 */}
        <Header
          maxwidth={"80px"}
          style={{
            display: "flex",
            justifyContent: "flex-start",

            paddingLeft: "12px",
          }}
        >
          소유자
        </Header>
        {/* 권한 */}
        <Header maxwidth={"80px"}>
          <User width={16} height={16} fill={colors.font.gray} />
          권한{" "}
        </Header>
        {/* 설명 */}
        <Header>
          <Info width={16} height={16} fill={colors.font.gray} />
          설명{" "}
        </Header>
        {/* 참여인원 */}
        <Header maxwidth={"100px"}>
          <Users width={13} height={13} fill={colors.font.gray} />
          참여인원{" "}
        </Header>
        {/* 참가하기 */}
        <Header
          maxwidth={"80px"}
          style={{ display: "flex", justifyContent: "center" }}
        >
          설정
        </Header>
      </TableHeaderContainer>
      {joinedTeamList.map((item, index) => (
        <Col key={uuidv4()}>
          <Box maxwidth={"60px"}>
            <TeamNumText>{index + 1}</TeamNumText>
          </Box>
          {/* 팀이름 */}
          <Box maxwidth={"240px"}>
            <TeamNameText>{item.teamName}</TeamNameText>
            <TeamCodeText>#{item.teamCode}</TeamCodeText>
          </Box>
          {/* 리더 */}
          <Box maxwidth={"80px"}>
            <TeamNumText>{item.teamOwnerKRname}</TeamNumText>
          </Box>
          {/* 권한 */}
          <Box maxwidth={"80px"}>{renderAuthorityInfo(item)}</Box>
          {/* 설명 */}
          <Box>
            <TeamDescriptionText>{item.teamDescription}</TeamDescriptionText>
          </Box>
          {/* 참여인원 */}
          <Box maxwidth={"100px"}>
            <TeamNumText>
              {joinedTeamList[index].teamMembers.length}명
            </TeamNumText>
          </Box>
          {/* 참가하기 */}
          <Box
            maxwidth={"80px"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {(item.teamAdminMembers.filter((uid) => uid === user.user.uid)
              .length > 0 ||
              item.teamOwner === user.user.uid) && (
              <Setting
                width={14}
                height={14}
                fill={colors.font.gray}
                style={{ opacity: 0.3 }}
                onClick={() => {
                  setIsTeamSettingModal(true);
                  setSelectedTeamData(item);
                }}
              />
            )}
          </Box>
        </Col>
      ))}
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  width: 100%;
  color: ${colors.font.black};
`;

const PageHeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 61px;
  margin-bottom: 15px;
`;

const TableHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  background-color: ${colors.background.gray};
  height: 50px;

  padding-left: 10px;
`;

const AdminInfo = styled.div`
  width: 51px;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.styledbg};
  color: white;
  border-radius: 7px;
`;

const Header = styled.div`
  width: 100%;

  max-width: ${(props) => props.maxwidth};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  font-weight: 700;
  color: ${colors.font.darkgray};

  svg {
    margin-left: 10px;
    margin-right: 8px;
  }
`;

// table
const Col = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid ${colors.border.deepgray};
  padding-left: 10px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: ${(props) => props.maxwidth};
  padding: 0px 10px;
`;

// text
const HeaderText = styled.p`
  font-size: 25px;
  font-weight: 700;
  color: ${colors.font.black};
`;

const TeamNumText = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-left: 2px;
`;

const TeamNameText = styled.p`
  font-size: 17px;
  font-weight: 800;
  color: ${colors.font.black};
`;

const TeamDescriptionText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.font.black};
`;

const TeamCodeText = styled.p`
  margin-top: 3px;
  font-size: 12px;
  font-weight: 400;
  color: ${colors.font.gray};
`;
