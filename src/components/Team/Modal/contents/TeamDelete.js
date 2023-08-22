import styled from "styled-components";
import * as colors from "../../../../styles/colors";
import { motion } from "framer-motion";

export const TeamDelete = () => {
  return (
    <>
      <WarningText>
        팀을 삭제합니다. 팀을 삭제하게 되면 복구할 수 없습니다. 신중히 결정해
        주세요.
      </WarningText>
      <DeleteBtn whileHover={{ opacity: 0.8 }} whileTap={{ scale: 0.95 }}>
        삭제
      </DeleteBtn>
    </>
  );
};

const WarningText = styled.p`
  color: #d32f2f;
  font-weight: 700;
  font-size: 25px;
  margin-top: 10px;
`;

const DeleteBtn = styled(motion.button)`
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: fit-content;

  background-color: #d32f2f;
  color: white;
  border-radius: 7px;
  padding: 8px 23px;
  border: none;
  font-size: 15px;
`;
