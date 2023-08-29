import styled from "styled-components";
import * as colors from "../../styles/colors";
import { useState, useRef, useEffect } from "react";

import UserModal from "./UserModal";
import { useMain } from "@/utils/context/MainContext";
import SidebarTop from "./sidebar/SidebarTop";
import SidebarBottom from "./sidebar/SidebarBottom";

const Sidebar = () => {
  const { isUserModalOpen, setIsUserModalOpen } = useMain();

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isUserModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsUserModalOpen(false);
      }
    };

    if (isUserModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isUserModalOpen]);

  return (
    <Container>
      <Wrapper>
        <SidebarTop />
        <SidebarBottom />
        {/* 모달 */}
        {isUserModalOpen && (
          <div ref={modalRef}>
            <UserModal />
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 240px;
  min-width: 240px;

  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  background-color: ${colors.background.midnight};
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;

export default Sidebar;
