import styled from "styled-components";
import * as colors from "../../../../styles/colors";
import { motion } from "framer-motion";
import { useTeam } from "@/utils/context/TeamContext";

// svg
import List from "../../../../assets/list.svg";
import A from "../../../../assets/a.svg";
import User from "../../../../assets/user.svg";

export const TeamMemberList = ({ teamMembersData }) => {
  const { selectedTeamData } = useTeam();

  const renderAuthorityInfoAtTable = (uid) => {
    const isOwner = selectedTeamData.teamOwner === uid;
    const isAdmin =
      selectedTeamData.teamAdminMembers.filter((fuid) => uid === fuid).length >
      0
        ? true
        : false;

    if (isOwner) {
      return <AdminInfo styledbg={colors.calendar.blue}>소유자</AdminInfo>;
    } else if (isAdmin) {
      return <AdminInfo styledbg={colors.calendar.gray}>관리자</AdminInfo>;
    } else {
      return (
        <AdminInfo
          styledbg={colors.background.gray}
          style={{ color: colors.font.black }}
        >
          정회원
        </AdminInfo>
      );
    }
  };

  return (
    <>
      <TableHeaderContainer>
        <Header maxwidth={"40px"}></Header>
        <Header maxwidth={"60px"}>
          <List
            width={13}
            height={13}
            fill={colors.font.gray}
            style={{ marginLeft: "10px" }}
          />
        </Header>
        <Header>
          <A width={13} height={13} fill={colors.font.gray} />
          이름
        </Header>
        <Header maxwidth={"150px"}>
          <User
            width={16}
            height={16}
            fill={colors.font.gray}
            style={{ marginLeft: "0px" }}
          />{" "}
          권한
        </Header>
      </TableHeaderContainer>
      {selectedTeamData.teamMembers.map((item, index) => (
        <Col>
          <Box maxwidth={"40px"}>
            <input type="checkbox" />
          </Box>
          <Box maxwidth={"60px"}>{index + 1}</Box>
          <Box>{teamMembersData[index].name}</Box>
          <Box maxwidth={"150px"}>{renderAuthorityInfoAtTable(item)}</Box>
        </Col>
      ))}
    </>
  );
};

// table
const TableHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  background-color: ${colors.background.gray};
  height: 40px;

  padding-left: 10px;
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
const Col = styled.div`
  display: flex;
  align-items: center;

  height: 60px;
  border-bottom: 1px solid ${colors.border.deepgray};
  padding-left: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: ${(props) => props.maxwidth};
  /* padding: 0px 10px; */
`;
const AdminInfo = styled.div`
  width: 48px;
  height: 20px;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.styledbg};
  color: white;
  border-radius: 5px;
  margin-top: 12px;
`;
