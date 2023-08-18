import styled from "styled-components";
import * as colors from "../../../../styles/colors";
import { motion } from "framer-motion";

export const TeamDescription = ({
  teamDescription,
  setTeamDescription,
  onUpdateTeamData,
}) => {
  return (
    <>
      <Header>팀 소개 변경</Header>
      <Description>팀 소개 문장을 변경할 수 있습니다.</Description>
      <InputArea
        placeholder={
          !teamDescription ? "팀 이름을 입력해주세요." : teamDescription
        }
        value={teamDescription}
        onChange={(e) => {
          setTeamDescription(e.target.value);
        }}
      />
      <SaveBtn
        whileHover={{ opacity: 0.8 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          onUpdateTeamData("teamDescription", teamDescription);
        }}
      >
        저장
      </SaveBtn>
    </>
  );
};

const Header = styled.div`
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 2px solid ${colors.border.deepgray};
  font-size: 20px;
  color: ${colors.font.darkgray};
`;
const Description = styled.p`
  margin-bottom: 15px;
  font-size: 17px;
`;

const InputArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border-radius: 7px;
  outline: none;
  font-size: 15px;
  background-color: ${colors.background.gray};
  border: 1px solid ${colors.background.gray};
  resize: none;
`;
const SaveBtn = styled(motion.button)`
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: fit-content;

  background-color: ${(props) =>
    props.styledbg ? props.styledbg : colors.calendar.mint};
  color: white;
  border-radius: 7px;
  padding: 8px 23px;
  border: none;
  font-size: 15px;
`;
