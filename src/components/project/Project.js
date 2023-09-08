import styled from "styled-components";
import * as colors from "../../styles/colors";
import { useAuth } from "@/utils/context/auth/AuthProvider";

export default function Project({
  idx,
  color,
  title,
  ownerName,
  description,
  members,
}) {
  const user = useAuth();

  return (
    <Container>
      <Box maxwidth={"70px"}>{idx}</Box>

      <Box maxwidth={"400px"}>
        <div>
          <Color color={color && colors.calendar[color]}></Color>
        </div>
        {title}
      </Box>
      <Box maxwidth={"100px"}>{ownerName}</Box>
      <Box maxwidth={""}>{description}</Box>
      <Box maxwidth={"90px"}>{members && members.length}</Box>
    </Container>
  );
}

// todo
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Color = styled.div`
  width: 15px;
  height: 15px;
  max-height: 100%;
  /* margin-right: 10px; */
  background-color: ${(props) =>
    props.color ? props.color : colors.calendar.green};
  border-radius: 7px;
  margin-right: 10px;
`;
const Box = styled.div`
  display: flex;

  align-items: center;
  width: 100%;
  height: 100%;
  max-width: ${(props) => props.maxwidth};
  border-bottom: 1px solid ${colors.border.deepgray};
  border-right: 1px solid ${colors.border.deepgray};

  padding: 10px 10px;
  font-size: 16px;
  font-weight: 500;
`;
