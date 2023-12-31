import styled from "styled-components";
import * as colors from "../../../../styles/colors";
import { motion } from "framer-motion";
import { useTeam } from "@/utils/context/TeamContext";

export const TeamInvite = () => {
  const { selectedTeamData } = useTeam();
  return (
    <motion.div
      style={{ marginLeft: "-25px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Code>{selectedTeamData.teamCode}</Code>
      <Description>위의 6자리 팀 코드를 팀원에게 알려주세요</Description>
    </motion.div>
  );
};

const Code = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 80px;
  margin-top: 80px;
  margin-bottom: 30px;
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 300;
  font-size: 20px;
`;
