import styled from "styled-components";
import { registerWithEamil } from "@/utils/firebase/auth";
import nookies from "nookies";
import { useState } from "react";
import { useRouter } from "next/router";
import { setDocument } from "@/utils/firebase/db";
import { authService } from "@/utils/firebase/firebaseClient";
import { admin } from "@/utils/firebase/firebaseAdmin";
import * as colors from "../../styles/colors";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    if (cookies.token) {
      const token = await admin.auth().verifyIdToken(cookies.token);
      const { uid, email } = token;
      return {
        props: { email: email, uid: uid },
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return { props: {} };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/auth/signup",
        permanent: false,
      },
    };
  }
};

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    } else if (id === "name") {
      setName(value);
    }
  };

  const onSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const signupError = await registerWithEamil(email, password, name);
    if (signupError === null) {
      setDocument("users", authService.currentUser.uid, {
        firstLogin: true,
        myTeam: [],
      });

      setIsLoading(false);
      router.reload();
    } else {
      console.log(signupError);
      setIsLoading(false);
      setErrMsg(signupError);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading text={"회원가입 중이에요"} />
      ) : (
        <Container>
          <Wrapper>
            <FormContainer onSubmit={onSignup}>
              <SmallHeaderText>이름</SmallHeaderText>
              <Input
                type="text"
                onChange={onChange}
                id="name"
                value={name}
                placeholder="이름"
                required
              />
              <SmallHeaderText>이메일 (아이디)</SmallHeaderText>
              <Input
                type="email"
                onChange={onChange}
                id="email"
                value={email}
                placeholder="이메일 (아이디)"
                required
              />
              <SmallHeaderText>비밀번호</SmallHeaderText>
              <Input
                type="password"
                onChange={onChange}
                id="password"
                value={password}
                placeholder="비밀번호"
                required
              />
              <LoginButton
                whileHover={{
                  backgroundColor: "#1A73E8",
                  transitionDuration: "0.3s",
                }}
                type="submit"
                value="회원가입"
              />
            </FormContainer>
            <ErrorContainer>{errorMsg && errorMsg}</ErrorContainer>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

// wrapper
const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ErrorContainer = styled.div`
  height: 30px;
`;

// 그 외 스타일링
const Input = styled.input`
  width: 100%;
  height: 50px;
  max-width: 700px;
  padding: 10px 15px;
  border: none;
  background-color: white;
  color: ${colors.font.black};
  border: 2px solid ${colors.border.deepgray};
  border-radius: 7px;
  outline: none;
  font-size: 20px;
  margin-bottom: 10px;
`;

const LoginButton = styled(motion.input)`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #17191d;
  color: white;
  border-radius: 7px;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 30px;
`;

const SmallHeaderText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: ${colors.font.darkgray};
`;

export default Signup;
