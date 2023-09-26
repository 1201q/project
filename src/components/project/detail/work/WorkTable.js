import { useEffect, useState, useRef } from "react";
import { useProject } from "@/utils/context/ProjectContext";
import Group from "./Group";
import OptionPopup from "./OptionPopup";
import styled from "styled-components";
import * as colors from "../../../../styles/colors";
import { motion } from "framer-motion";

export default function WorkTable({ work }) {
  const optionPopupRef = useRef();

  const { selectedProjectData, isOptionPopupVisible, setIsOptionPopupVisible } =
    useProject();
  const [popupPosition, setPopupPosition] = useState(null);
  const [workId, setWorkId] = useState(null);
  const [clickedWorkData, setClickedWorkData] = useState(null);

  const groupData = selectedProjectData?.projectGroup;
  const workData = work;
  const sortedWorkArr = groupData?.map((group) =>
    workData?.filter((work) => work.group === group)
  );
  const ungroupedWorkArr = workData?.filter(
    (work) => !groupData.includes(work.group)
  );

  console.log(popupPosition);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOptionPopupVisible &&
        optionPopupRef.current &&
        !optionPopupRef.current.contains(e.target)
      ) {
        setIsOptionPopupVisible(false);
      }
    };
    if (isOptionPopupVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOptionPopupVisible]);

  return (
    <>
      {groupData?.map((groupName, gidx) => (
        <Group
          groupName={groupName}
          workArray={sortedWorkArr[gidx]}
          key={gidx}
          setPopupPosition={setPopupPosition}
          setWorkId={setWorkId}
          setClickedWorkData={setClickedWorkData}
        />
      ))}
      <Group
        groupName={"분류없음"}
        workArray={ungroupedWorkArr}
        setPopupPosition={setPopupPosition}
        setWorkId={setWorkId}
        setClickedWorkData={setClickedWorkData}
      />
      {isOptionPopupVisible && workId !== "date" && (
        <Popup
          ref={optionPopupRef}
          styledtop={
            popupPosition?.top > 449
              ? popupPosition?.top - 210
              : popupPosition?.top
          }
          styledleft={popupPosition?.x}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <OptionPopup id={workId} workData={clickedWorkData} />
        </Popup>
      )}
      {isOptionPopupVisible && workId === "date" && (
        <Popup
          ref={optionPopupRef}
          styledtop={
            popupPosition?.top > 350
              ? popupPosition?.top - 370
              : popupPosition?.top
          }
          styledleft={popupPosition?.x - 250}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <OptionPopup id={workId} workData={clickedWorkData} />
        </Popup>
      )}
    </>
  );
}

const Popup = styled(motion.div)`
  position: absolute;
  top: ${(props) => `${props.styledtop + 40}px`};
  left: ${(props) => `${props.styledleft + 25}px`};
  min-width: 100px;
  height: min-content;
  background-color: white;
  border: 1px solid ${colors.font.black};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 3px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 5px;
  padding: 5px;
  z-index: 10;
  overflow-y: scroll;
`;
