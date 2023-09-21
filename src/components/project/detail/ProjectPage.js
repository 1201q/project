import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../../styles/colors";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTeam } from "@/utils/context/TeamContext";
import { useProject } from "@/utils/context/ProjectContext";
import { Ring } from "@uiball/loaders";
import ProjectPageHeader from "./ProjectPageHeader";
import WorkPage from "./work/WorkPage";

export default function ProjectPage() {
  const router = useRouter();
  const { selectedTeamUid, selectedTeamMembersData } = useTeam();
  const {
    selectedProjectUid,
    setSelectedProjectUid,
    projectListData,
    selectedProjectData,
    setSelectedProjectData,
    setSelectedProjectMembersData,
    selectedProjectMembersData,
    joinedProjectList,
    isOptionPopupVisible,
  } = useProject();

  const menuArr = ["work", "feed", "gantt", "schedule", "setting"];
  const [tab, setTab] = useState("work");
  const [isAddGroupMode, setIsAddGroupMode] = useState(false);
  const contentsContainerRef = useRef();
  const renderContents = () => {
    const menu = {
      work: WorkPage,
    };

    const RenderComponents = menu[tab];

    if (RenderComponents) {
      return (
        <RenderComponents
          isAddGroupMode={isAddGroupMode}
          setIsAddGroupMode={setIsAddGroupMode}
        />
      );
    }
  };

  useEffect(() => {
    if (router.query?.projectid) {
      const projectid = router.query?.projectid;
      const selectprojectData = projectListData.filter(
        (p) => p.projectUID === projectid
      )[0];
      const projectMemberUidList = selectprojectData?.projectMembers;
      let members = selectedTeamMembersData.filter((memberData) => {
        return (
          projectMemberUidList?.findIndex((uid) => uid === memberData.uid) !==
          -1
        );
      });

      //
      setSelectedProjectUid(projectid);
      setSelectedProjectData(selectprojectData);
      setSelectedProjectMembersData(members);
    }
  }, [router.query, joinedProjectList]);

  useEffect(() => {
    if (isAddGroupMode) {
      contentsContainerRef.current.scrollTop = 0;
    }
  }, [isAddGroupMode]);

  return selectedProjectData ? (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ProjectPageHeader menuArr={menuArr} setTab={setTab} />
      <ContentsContainer ref={contentsContainerRef}>
        {renderContents()}
      </ContentsContainer>
    </Container>
  ) : (
    <LoadingContainer>
      <Ring />
    </LoadingContainer>
  );
}

const Container = styled(motion.div)`
  width: 100%;
  max-height: 100vh;
  background-color: ${colors.background.gray2};
  overflow-y: hidden;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ContentsContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
`;
