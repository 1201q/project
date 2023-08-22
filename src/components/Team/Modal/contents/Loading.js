import { Ring } from "@uiball/loaders";
import styled from "styled-components";
import * as colors from "../../../../styles/colors";

export default function Loading({ text = "로딩중" }) {
  return (
    <Container>
      <LoadingContainer>
        <Ring size={60} speed={2} />
        <LoadingText>{text}</LoadingText>
      </LoadingContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.p`
  color: ${colors.font.black};
  margin-top: 30px;
  font-size: 17px;
  font-weight: 800;
`;
