import styled from "styled-components";
import * as colors from "../../../../styles/colors";
import { motion } from "framer-motion";
import { useTeam } from "@/utils/context/TeamContext";

// svg
import List from "../../../../assets/list.svg";
import A from "../../../../assets/a.svg";
import User from "../../../../assets/user.svg";
import Setting from "../../../../assets/settings (3).svg";
import { useEffect, useState } from "react";

export const TeamMemberList = () => {
  const { selectedTeamData, selectedTeamMembersData } = useTeam();
  const [isAllCheckBoxChecked, setIsAllCheckBoxChecked] = useState(false);
  const [selectedUserIndexArr, setSelectedUserIndexArr] = useState(
    Array(selectedTeamMembersData.length).fill(false)
  );

  useEffect(() => {
    if (selectedUserIndexArr.every((item) => item === true)) {
      setIsAllCheckBoxChecked(true);
    } else {
      setIsAllCheckBoxChecked(false);
    }
  }, [selectedUserIndexArr]);

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

  const handleCheckbox = (index) => {
    setSelectedUserIndexArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  const handleHeaderCheckbox = () => {
    if (isAllCheckBoxChecked) {
      setSelectedUserIndexArr(
        Array(selectedTeamMembersData.length).fill(false)
      );
    } else {
      setSelectedUserIndexArr(Array(selectedTeamMembersData.length).fill(true));
    }
  };

  return (
    <>
      <Header>팀원 관리</Header>
      <ControlContainer>
        <Description>팀원을 관리해보세요.</Description>
        <FlexDiv>
          <Button whileHover={{ opacity: 0.8 }} whileTap={{ scale: 0.98 }}>
            <Setting
              width={13}
              height={13}
              fill={"white"}
              style={{ marginRight: "5px" }}
            />
            팀원 내보내기
          </Button>
        </FlexDiv>
      </ControlContainer>
      <TableHeaderContainer>
        <TableHeader maxwidth={"40px"}>
          <input
            type="checkbox"
            style={{ marginLeft: "10px" }}
            onChange={handleHeaderCheckbox}
            checked={isAllCheckBoxChecked}
          />
        </TableHeader>
        <TableHeader maxwidth={"60px"}>
          <List
            width={13}
            height={13}
            fill={colors.font.gray}
            style={{ marginLeft: "10px" }}
          />
        </TableHeader>
        <TableHeader>
          <A width={12} height={12} fill={colors.font.gray} />
          이름
        </TableHeader>
        <TableHeader maxwidth={"150px"}>
          <User
            width={14}
            height={14}
            fill={colors.font.gray}
            style={{ marginLeft: "0px", marginTop: "1px" }}
          />
          권한
        </TableHeader>
      </TableHeaderContainer>
      {selectedTeamData.teamMembers.map((item, index) => (
        <Col key={selectedTeamMembersData[index].uid}>
          <Box maxwidth={"40px"}>
            <input
              type="checkbox"
              onChange={() => {
                handleCheckbox(index);
              }}
              checked={selectedUserIndexArr[index]}
            />
          </Box>
          <Box maxwidth={"60px"}>{index + 1}</Box>
          <Box>
            {selectedTeamMembersData[index].name}
            <EmailText>{selectedTeamMembersData[index].email}</EmailText>
          </Box>
          <Box maxwidth={"150px"}>{renderAuthorityInfoAtTable(item)}</Box>
        </Col>
      ))}
    </>
  );
};

const FlexDiv = styled.div`
  display: flex;
`;

const Header = styled.div`
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 2px solid ${colors.border.deepgray};
  font-size: 20px;
  color: ${colors.font.darkgray};
`;

const Description = styled.p`
  font-size: 17px;
`;

const Button = styled(motion.button)`
  width: max-content;
  background-color: ${colors.calendar.mint};
  color: white;
  border-radius: 7px;
  padding: 5px 10px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  margin-left: 5px;
  display: flex;
  align-items: center;
`;

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

// table
const TableHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  background-color: ${colors.background.gray};
  height: 40px;

  padding-left: 10px;
`;
const TableHeader = styled.div`
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
  margin-top: 0px;
`;

const EmailText = styled.div`
  font-size: 13px;
  color: ${colors.font.darkgray};
`;
