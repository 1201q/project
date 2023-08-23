import styled from "styled-components";
import * as colors from "../../../../styles/colors";
import { motion } from "framer-motion";
import { useTeam } from "@/utils/context/TeamContext";

// svg
import List from "../../../../assets/list.svg";
import A from "../../../../assets/a.svg";
import User from "../../../../assets/user.svg";
import Setting from "../../../../assets/settings (3).svg";
import Checkbox from "../../../../assets/checkbox (1).svg";
import { useEffect, useState } from "react";
import {
  grantAdminPermission,
  revokeAdminPermission,
} from "@/utils/firebase/setting";
import { observeCollectionData } from "@/utils/firebase/db";

export const TeamAdminSetting = () => {
  const {
    selectedTeamData,
    selectedTeamMembersData,
    setIsSettingModalLoading,
    setIsTeamSettingModal,
  } = useTeam();

  const [selectedUserIndexArr, setSelectedUserIndexArr] = useState(
    Array(selectedTeamMembersData.length).fill(false)
  );
  const [mode, setMode] = useState("grant"); // grant, revoke
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (!selectedUserIndexArr.every((item) => item === false)) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
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

  const isAdmin = (uid, isContainOwner) => {
    // isContainOwner가 true일 경우 owner도 true로 return 하고
    // isContainOwner가 false일 경우 owner는 false로 return 합니다.
    // return true or false
    const owner = selectedTeamData.teamOwner === uid;
    const admin =
      selectedTeamData.teamAdminMembers.filter((fuid) => uid === fuid).length >
      0
        ? true
        : false;

    if (isContainOwner && owner) {
      return true;
    } else if (!isContainOwner && owner) {
      return false;
    } else if (admin) {
      return true;
    } else {
      return false;
    }
  };

  const handleCheckbox = (index) => {
    setSelectedUserIndexArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  const onExecute = () => {
    let correctUserArr = [];

    selectedTeamMembersData
      .filter((user, index) => {
        if (selectedUserIndexArr[index]) {
          return user;
        }
      })
      .map((filteredUser) => {
        correctUserArr.push(filteredUser);
      });

    if (mode === "grant") {
      correctUserArr.map((user) => {
        grantAdmin(user.uid);
      });
    } else if (mode === "revoke") {
      correctUserArr.map((user) => {
        revokeAdmin(user.uid);
      });
    }
  };

  const grantAdmin = async (userUid) => {
    setIsSettingModalLoading(true);
    const update = await grantAdminPermission(
      "team",
      selectedTeamData.docId,
      "teamAdminMembers",
      userUid
    );

    if (!update) {
      setIsSettingModalLoading(false);
      setIsTeamSettingModal(false);
    } else {
      console.log(update);
    }
  };

  const revokeAdmin = async (userUid) => {
    setIsSettingModalLoading(true);
    const update = await revokeAdminPermission(
      "team",
      selectedTeamData.docId,
      "teamAdminMembers",
      userUid
    );
    if (!update) {
      setIsSettingModalLoading(false);
      setIsTeamSettingModal(false);
    } else {
      console.log(update);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Header>관리자 권한 관리</Header>
      <ControlContainer>
        <Description>
          선택한 팀원을 관리자로 임명하거나 관리자 권한을 회수할 수 있습니다.
        </Description>
        <FlexDiv>
          <Select
            onChange={(e) => {
              setMode(e.target.value);
              setSelectedUserIndexArr(
                Array(selectedTeamMembersData.length).fill(false)
              );
            }}
          >
            <option value="grant">관리자 권한 부여</option>
            <option value="revoke">관리자 권한 뺏기</option>
          </Select>
        </FlexDiv>
      </ControlContainer>
      <TableHeaderContainer>
        <TableHeader maxwidth={"40px"}>
          <Checkbox
            width={12}
            height={12}
            fill={colors.font.gray}
            style={{ marginLeft: "10px" }}
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
          />{" "}
          권한
        </TableHeader>
      </TableHeaderContainer>
      {selectedTeamData.teamMembers.map((member, index) => (
        <Col key={selectedTeamMembersData[index].uid}>
          <Box maxwidth={"40px"}>
            {mode === "grant" ? (
              <>
                {!isAdmin(selectedTeamMembersData[index].uid, true) && (
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleCheckbox(index);
                    }}
                    checked={selectedUserIndexArr[index]}
                  />
                )}
              </>
            ) : (
              <>
                {isAdmin(selectedTeamMembersData[index].uid, false) && (
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleCheckbox(index);
                    }}
                    checked={selectedUserIndexArr[index]}
                  />
                )}
              </>
            )}
          </Box>
          <Box maxwidth={"60px"}>{index + 1}</Box>
          <Box>
            {selectedTeamMembersData[index].name}
            <EmailText>{selectedTeamMembersData[index].email}</EmailText>
          </Box>
          <Box maxwidth={"150px"}>{renderAuthorityInfoAtTable(member)}</Box>
        </Col>
      ))}
      {isButtonVisible && (
        <SaveBtn
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExecute}
        >
          업데이트
        </SaveBtn>
      )}
    </motion.div>
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

const Select = styled.select`
  width: max-content;
  background-color: ${colors.background.gray};
  color: ${colors.font.darkgray};
  border-radius: 7px;
  outline: none;
  padding: 5px 10px;
  border: none;
  font-size: 12px;
  font-weight: 700;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  option {
    background-color: white;
    color: ${colors.font.black};
    font-size: 12px;
  }
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

const SaveBtn = styled(motion.button)`
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: fit-content;
  background-color: ${colors.calendar.mint};
  color: white;
  border-radius: 7px;
  padding: 8px 23px;
  border: none;
  font-size: 15px;
`;
