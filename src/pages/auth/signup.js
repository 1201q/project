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
import dayjs from "dayjs";
import Image from "next/image";

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
      const complete = await setDocument("users", authService.currentUser.uid, {
        uid: authService.currentUser.uid,
        name: authService.currentUser.displayName,
        email: authService.currentUser.email,
        createdAt: dayjs(authService.currentUser.metadata.creationTime).format(
          ""
        ),
        lastLoginAt: dayjs(
          authService.currentUser.metadata.lastSignInTime
        ).format(""),
      });
      setIsLoading(false);
      if (!complete) {
        router.reload();
      }
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
          <BgContainer>
            <Bg></Bg>
            <Image
              src={require(`../../assets/background/login2.jpg`)}
              alt="loginBg"
            />
          </BgContainer>
          <LoginContainer>
            <LoginText>회원가입</LoginText>
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
            {/* <ErrorContainer>{errorMsg && errorMsg}</ErrorContainer> */}
          </LoginContainer>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const BgContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: hidden;

  img {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: cover;
    z-index: 10;
  }
`;

const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.5);
`;

const LoginContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 450px;
  height: 100%;
  z-index: 18;
  background-color: white;
  padding: 50px;
`;

const FormContainer = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const ErrorContainer = styled.div``;

// 그 외 스타일링
const LoginText = styled.p`
  font-size: 40px;
  margin-bottom: 80px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  max-width: 700px;
  padding: 15px 25px;
  border: none;
  background-color: ${colors.background.gray2};
  color: ${colors.font.black};
  border-radius: 30px;
  outline: none;
  font-size: 17px;
  margin-bottom: 10px;
`;

const LoginButton = styled(motion.input)`
  width: 100%;
  height: 50px;
  padding: 15px 25px;
  border: none;
  background-color: #1a73e8;
  color: white;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  margin-top: 40px;
`;

const SmallHeaderText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: 700;
  color: ${colors.font.black};
`;

export default Signup;
