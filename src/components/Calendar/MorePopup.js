import dayjs from "dayjs";

import styled from "styled-components";
import * as colors from "../../styles/colors";
import X from "../../assets/x.svg";
import Check from "../../assets/check.svg";
import { color, motion } from "framer-motion";
import { deleteDocument, removeArrayItem } from "@/utils/firebase/db";
import { useAuth } from "@/utils/context/authProvider";

export default function MorePopup({
  morePopupPositionData,
  setIsMorePopupOpen,
  selectedTodoArr,
}) {
  console.log(morePopupPositionData);
  return (
    <Container
      styledmarginx={morePopupPositionData.left}
      styledmarginy={morePopupPositionData.top}
    >
      <CloseButton onClick={() => setIsMorePopupOpen(false)}>
        <X width={13} height={13} fill={colors.font.darkgray} />
      </CloseButton>
    </Container>
  );
}

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 250px;
  max-width: 90vw;
  height: 150px;
  background-color: white;

  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.05);
  z-index: 100;
  border: 1px solid ${colors.border.deepgray};
  margin-top: ${(props) => `${props.styledmarginy - 130}px`};
  margin-left: ${(props) => `${props.styledmarginx - 450}px`};
`;
// button
const CloseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;

  margin: 2px;

  &:hover {
    background-color: ${colors.background.gray};
  }
`;
