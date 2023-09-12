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
import WorkPage from "./WorkPage";

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
  } = useProject();

  const menuArr = ["work", "feed", "gantt", "schedule", "setting"];
  const [tab, setTab] = useState("work");

  const renderContents = () => {
    const menu = {
      work: WorkPage,
    };

    const RenderComponents = menu[tab];

    if (RenderComponents) {
      return <RenderComponents />;
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
          projectMemberUidList.findIndex((uid) => uid === memberData.uid) !== -1
        );
      });

      //
      setSelectedProjectUid(projectid);
      setSelectedProjectData(selectprojectData);
      setSelectedProjectMembersData(members);
    }
  }, [router.query]);

  return selectedProjectData ? (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ProjectPageHeader menuArr={menuArr} setTab={setTab} />
      <ContentsContainer>{renderContents()}</ContentsContainer>
    </Container>
  ) : (
    <LoadingContainer>
      <Ring />
    </LoadingContainer>
  );
}

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled(motion.div)`
  width: 100%;
  max-height: 100vh;
  background-color: ${colors.background.gray2};
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ContentsContainer = styled.div`
  /* height: 100%; */
  overflow-y: scroll;
`;
