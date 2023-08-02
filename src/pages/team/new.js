import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { motion } from "framer-motion";
import * as colors from "../../styles/colors";
import dayjs from "dayjs";

import { addDocument } from "@/utils/firebase/db";
import { useAuth } from "@/utils/context/auth/AuthProvider";

//svg
import Refresh from "../../assets/refresh.svg";
import { useRouter } from "next/router";

export default function New() {
  const user = useAuth();
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  useEffect(() => {
    createRandomCode();
  }, []);

  const onChange = (e) => {
    const { value, name } = e.target;

    if (name === "teamname") {
      setTeamName(value);
    } else if (name === "code") {
      setTeamCode(value);
    } else if (name === "description") {
      setTeamDescription(value);
    }
  };

  const createNewTeam = () => {
    const data = {
      teamName: teamName,
      teamCode: teamCode,
      teamDescription: teamDescription,
      teamUID: uuidv4(),
      createdAt: dayjs().format(""),
      teamOwner: user.user.uid,
      teamOwnerKRname: user.user.displayName,
      teamMembers: [user.user.uid],
      teamAdminMembers: [user.user.uid],
    };
    addDocument("team", data)
      .then((data) => {
        console.log(data);
        router.replace("/team");
      })
      .catch((error) => console.log(error));
  };

  const createRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let index = 0; index < 6; index++) {
      const idx = Math.floor(Math.random() * characters.length);
      code += characters.charAt(idx);
    }
    setTeamCode(code);
  };

  return (
    <MainContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopHeaderText>새로운 팀을 생성하세요</TopHeaderText>
      <InputContainer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            createNewTeam();
          }}
        >
          <SmallHeaderText>팀 이름</SmallHeaderText>
          <Input
            type="text"
            name="teamname"
            onChange={onChange}
            value={teamName}
            placeholder="팀 이름"
            required
          />
          <div style={{ position: "relative" }}>
            <SmallHeaderText>팀 코드</SmallHeaderText>
            <Input
              type="text"
              name="code"
              value={teamCode}
              placeholder="팀 코드"
              readOnly
              required
              style={{ position: "relative" }}
            />
            <button
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                border: "none",
                background: "none",
              }}
              type="button"
              onClick={(e) => {
                createRandomCode();
              }}
            >
              <Refresh width={18} height={18} fill={colors.font.darkgray} />
            </button>
          </div>
          <SmallHeaderText>팀 설명</SmallHeaderText>
          <Input
            type="text"
            name="description"
            onChange={onChange}
            value={teamDescription}
            placeholder="팀 설명"
            required
          />
          <LoginButton
            whileHover={{
              backgroundColor: "#1A73E8",
              transitionDuration: "0.3s",
            }}
            type="submit"
            value="생성"
          />
        </form>
      </InputContainer>
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
  width: 460px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

// 요소
const SmallHeaderText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: ${colors.font.darkgray};
`;

const TopHeaderText = styled.p`
  margin-top: 100px;
  text-align: center;
  font-weight: 700;
  font-size: 60px;
  color: ${colors.font.black};
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  max-width: 700px;
  padding: 10px 15px;
  border: none;
  background-color: white;
  color: ${colors.font.black};
  border: 2px solid ${colors.border.deepgray};
  border-radius: 7px;
  outline: none;
  font-size: 20px;
  margin-bottom: 10px;
`;

const LoginButton = styled(motion.input)`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #17191d;
  color: white;
  border-radius: 7px;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 30px;
`;
