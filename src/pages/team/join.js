import styled from "styled-components";
import { color, motion } from "framer-motion";
import * as colors from "../../styles/colors";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import React, { useState, useRef, useEffect } from "react";
import { observeCollectionChanges, updateTeamField } from "@/utils/firebase/db";
import { v4 as uuidv4 } from "uuid";

//svg
import Refresh from "../../assets/refresh.svg";
import { useRouter } from "next/router";

export default function Invite() {
  const user = useAuth();
  const router = useRouter();
  const [code, setCode] = useState([]);
  const [correctTeamList, setCorrectTeamList] = useState([]);
  const [correctTeamDocId, setCorrectTeamDocId] = useState([]);
  const [isTeamListLoading, setIsTeamListLoading] = useState(true);
  const inputRefs = useRef([]);

  const getTeamData = (data, docId) => {
    setCorrectTeamList(data);
    setCorrectTeamDocId(docId);
    setIsTeamListLoading(false);
  };

  useEffect(() => {
    if (code.length === 6) {
      setIsTeamListLoading(true);
      observeCollectionChanges("team", code.join(""), getTeamData);
    } else {
      setIsTeamListLoading(true);
    }
  }, [code]);

  const onChange = (idx, value) => {
    setCode((prev) => {
      let newCode = [...prev];
      newCode[idx] = String(value).toLocaleUpperCase();
      return newCode;
    });

    setTimeout(() => {
      if (idx !== 5) {
        inputRefs.current[idx + 1].focus();
      } else {
        inputRefs.current[5].blur();
      }
    });
  };

  return (
    <MainContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopHeaderText>기존 팀에 참여해보세요</TopHeaderText>{" "}
      <BottomHeaderText>
        참가하고 싶은 팀의 6자리 코드를 입력하세요
      </BottomHeaderText>
      <InputContainer>
        {[0, 1, 2, 3, 4, 5].map((item, idx) => (
          <Input
            type="text"
            maxLength={1}
            ref={(el) => (inputRefs.current[idx] = el)}
            key={uuidv4()}
            onChange={(e) => {
              onChange(idx, e.target.value);
            }}
            value={code[idx]}
          />
        ))}
      </InputContainer>
      {code.length > 5 && (
        <ResetButton onClick={() => setCode([])}>
          <Refresh width={18} height={18} fill={colors.font.darkgray} />
        </ResetButton>
      )}
      {!isTeamListLoading &&
        (correctTeamList.length === 0 ? (
          <ErrorContainer>
            정보가 없어요. 코드를 다시 입력해주세요.
          </ErrorContainer>
        ) : (
          <ListContainer>
            {correctTeamList.map((item, idx) => (
              <List key={item.teamUID}>
                <ListContentsContainer>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <ListHeaderText>{item.teamName}</ListHeaderText>
                    <OwnerNameText>
                      소유자: {item.teamOwnerKRname}
                    </OwnerNameText>
                  </div>
                  <ListContents>{item.teamDescription}</ListContents>
                </ListContentsContainer>
                <ListButtonContainer>
                  <ListJoinButton
                    onClick={() => {
                      updateTeamField(
                        "team",
                        correctTeamDocId[idx],
                        "teamMembers",
                        user.user.uid
                      ).then((data) => {
                        console.log(data);
                        router.replace("/team");
                      });
                    }}
                  >
                    신청
                  </ListJoinButton>
                </ListButtonContainer>
              </List>
            ))}
          </ListContainer>
        ))}
    </MainContainer>
  );
}

// container
const MainContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  max-width: 90vw;
  margin-top: 80px;
`;

const ListContainer = styled.div`
  bottom: 80px;
  width: 500px;
  height: 200px;
  overflow-y: scroll;
  margin-top: 30px;
`;

const ListButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 70px;
  min-width: 70px;
  margin-left: 10px;
`;

const ListContentsContainer = styled.div`
  width: 100%;
`;

const ErrorContainer = styled.div`
  margin-top: 50px;
  font-size: 18px;
  text-align: center;
`;

// 요소
const Input = styled.input`
  width: 50px;
  height: 50px;
  font-size: 25px;

  border-radius: 10px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.02);
  outline: none;
  text-align: center;
  border: ${(props) =>
    props.styledborder
      ? `3px solid ${colors.calendar.blue}`
      : `3px solid ${colors.border.deepgray}`};
`;

const TopHeaderText = styled.p`
  text-align: center;
  font-weight: 700;
  font-size: 60px;
  color: ${colors.font.black};
  margin-top: 100px;
`;
const BottomHeaderText = styled.p`
  margin-top: 20px;
  text-align: center;
  font-weight: 200;
  font-size: 24px;
  color: ${colors.font.gray};
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 30px;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 18px;
`;

// 리스트
const List = styled.div`
  display: flex;
  border: 2px solid ${colors.border.deepgray};
  border-radius: 7px;
  height: 110px;

  padding: 15px;
  margin-bottom: 15px;
  margin-left: 10px;
  margin-right: 10px;
`;

const ListHeaderText = styled.p`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 8px;
  color: ${colors.font.black};
`;

const OwnerNameText = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${colors.font.gray};
  margin-left: 10px;
`;

const ListContents = styled.div`
  font-size: 14px;
  padding-top: 10px;
  border-top: 1px solid ${colors.border.deepgray};
`;

const ListJoinButton = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 7px;
  background-color: ${colors.calendar.blue};
  color: white;
  font-size: 15px;
  font-weight: 700;
`;
