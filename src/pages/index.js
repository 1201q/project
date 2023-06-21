import styled from "styled-components";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Container>
        <Wrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <LogoText>TEST</LogoText>
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f8f9fa;
  width: 100%;
  min-height: 100vh;
  height: 100%;
`;

const Wrapper = styled(motion.div)`
  width: 100%;
  max-width: 1024px;
  margin-top: 180px;

  @media screen and (max-width: 1023px) {
    padding: 0px 20px;
    padding-bottom: 50px;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  height: 80px;
  background-color: #f8f9fa;
  border-radius: 100px;
  border: 3px solid #1750ff;
  padding: 0px 30px;

  @media screen and (max-width: 650px) {
    height: 55px;
    padding: 0px 20px;

    img {
      width: 25px;
      height: 25px;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 25px;
  font-weight: 500;
  outline: none;
  border: none;
  background: none;
  margin-left: 18px;
  color: #282b31;

  ::placeholder {
    font-weight: 500;
    color: #bdbccc;
  }

  @media screen and (max-width: 650px) {
    font-size: 18px;
    margin-left: 12px;
  }
`;

const LogoText = styled.p`
  color: #282b31;
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 50px;
  text-align: center;

  @media screen and (max-width: 650px) {
    font-size: 40px;
  }
`;
