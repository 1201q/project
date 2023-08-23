import styled from "styled-components";
import * as colors from "../../../../../styles/colors";
import { motion } from "framer-motion";

export const TeamDelete = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {" "}
      <Header>팀 삭제</Header>
      <ControlContainer>
        <WarningText>
          팀을 삭제합니다. 팀을 삭제하게 되면 복구할 수 없습니다. 신중히 결정해
          주세요.
        </WarningText>
      </ControlContainer>
      <DescriptionContainer>
        <p>팀을 삭제하기 위해서는 몇가지 절차가 필요합니다.</p>
        <ol>
          <li>모든 관리자들의 권한을 회수합니다.</li>
          <li>소유자를 제외한 모든 팀원을 내보냅니다.</li>
          <li>
            혹시, 팀 삭제가 아니라 팀을 양도할 계획이라면 팀 양도 기능을
            사용해주세요.
          </li>
          <li>전부 이해하셨다면 삭제 버튼을 눌러 삭제해주세요.</li>
        </ol>
      </DescriptionContainer>
      <DeleteBtn whileHover={{ opacity: 0.8 }} whileTap={{ scale: 0.95 }}>
        삭제
      </DeleteBtn>
    </motion.div>
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

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const DescriptionContainer = styled.div`
  margin-top: 50px;

  p {
    font-size: 15px;
  }

  ol {
    margin: 15px;
  }

  li {
    margin-bottom: 5px;
    font-size: 15px;
    font-weight: 400;
  }
`;

const WarningText = styled.p`
  color: #d32f2f;
  font-weight: 700;
  font-size: 25px;
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
