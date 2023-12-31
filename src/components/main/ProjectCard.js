import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../styles/colors";

import User from "../../assets/users-alt.svg";
import { useRouter } from "next/router";
import { useMain } from "@/utils/context/MainContext";

export default function ProjectCard({ title, color, members, projectuid }) {
  const router = useRouter();
  const { setCurrentTab } = useMain();
  return (
    <Card
      onClick={() => {
        setCurrentTab("project");
        router.push({ query: { page: "project", projectid: projectuid } });
      }}
    >
      <CardColor styledcolor={colors.calendar[color]}></CardColor>
      <Contents>
        <CardTitle>{title}</CardTitle>
        <MemberSum>
          <User
            width={13}
            height={13}
            fill={colors.font.gray}
            style={{ marginRight: "10px", marginTop: "1px" }}
          />
          {members && <p>{members.length}명</p>}
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
  min-width: 280px;
  max-width: 280px;
  height: 140px;
  border-radius: 7px;
  background-color: white;
  display: flex;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.1) 0px 1px 1px -1px;
`;

const CardColor = styled.div`
  width: 10px;
  min-width: 10px;
  height: 100%;
  background-color: ${(props) =>
    props.styledcolor ? props.styledcolor : colors.calendar.green};
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
