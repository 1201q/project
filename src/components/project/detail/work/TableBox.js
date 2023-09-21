import styled from "styled-components";
import * as colors from "../../../../styles/colors";
import { useRef } from "react";

export default function TableBox({ text, data, id, onClick, width, style }) {
  const boxRef = useRef();
  return (
    <Box
      ref={boxRef}
      maxwidth={width}
      id={`${id}`}
      onClick={(event) => {
        onClick(event, data, boxRef.current);
      }}
      style={style}
    >
      {text}
    </Box>
  );
}

const Box = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: ${(props) => props.maxwidth};
  height: 100%;
  box-sizing: border-box;
  border-left: 1px solid ${colors.border.deepgray};
  border-right: 1px solid ${colors.border.deepgray};
  border-bottom: 1px solid ${colors.border.deepgray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  color: ${colors.font.gray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    border: 2px solid rgba(139, 0, 234, 0.4);
    background-color: #f5f3ff;
  }
`;
