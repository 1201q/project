import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../../styles/colors";

import User from "../../../assets/users-alt.svg";

export default function ProjectCard() {
  return (
    <Card>
      <CardColor styledcolor={colors.calendar.green}></CardColor>
      <Contents>
        <CardTitle>나의 프로젝트!</CardTitle>
        <MemberSum>
          <User
            width={13}
            height={13}
            fill={colors.font.gray}
            style={{ marginRight: "10px", marginTop: "1px" }}
          />
          <p>10</p>
        </MemberSum>
      </Contents>
    </Card>
  );
}

const Contents = styled.div`
  max-width: 100%;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  min-width: 296.5px;
  max-width: 296.5px;
  height: 140px;
  border-radius: 7px;
  background-color: white;
  display: flex;
  cursor: pointer;
`;

const CardColor = styled.div`
  width: 10px;
  min-width: 10px;
  height: 100%;
  background-color: ${(props) => props.styledcolor};
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  border: 1px solid ${colors.border.gray};
`;

const CardTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  max-width: 100%;
  color: ${colors.font.black};
  word-wrap: break-word;
  margin-right: 10px;
  margin-top: 10px;
`;

const MemberSum = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  left: 30px;
  bottom: 20px;

  p {
    font-size: 17px;
    color: ${colors.font.gray};
  }
`;
