import { loginWithEmail } from "@/utils/firebase/auth";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";
import * as colors from "../../styles/colors";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { admin } from "@/utils/firebase/firebaseAdmin";
import Image from "next/image";

import Exclamation from "../../assets/exclamation (3).svg";
import { Ring } from "@uiball/loaders";

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
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};

const Login = () => {
  const router = useRouter();
  const user = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [errorMsg, setErrMsg] = useState(null);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loginError = await loginWithEmail(email, password);
    if (loginError === null) {
      setIsLoading(false);
      setIsLoginSuccess(true);
      setErrorCode(null);
      router.reload();
    } else {
      setIsLoading(false);
      setErrorCode(loginError);
      getErrorMsg(loginError);
    }
  };

  const getErrorMsg = (code) => {
    if (code === "auth/user-not-found") {
      setErrMsg("해당 유저는 없는 유저에요.");
    } else if (code === "auth/wrong-password") {
      setErrMsg("비밀번호가 틀렸어요.");
    } else if (code === "auth/too-many-requests") {
      setErrMsg("잠시 후 다시 시도해주세요.");
    } else {
      setErrMsg("로그인할 수 없어요.");
    }
  };

  useEffect(() => {
    if (user.user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (errorCode) {
      setTimeout(() => {
        setErrorCode(null);
      }, 3000);
    }
  }, [errorCode]);

  return (
    <Container>
      <BgContainer>
        <Bg></Bg>
        <Image
          src={require(`../../assets/background/login2.jpg`)}
          alt="loginBg"
        />
      </BgContainer>
      <LoginContainer>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <LoginText>로그인</LoginText>
          <FormContainer
            onSubmit={(e) => {
              if (!errorCode) {
                onLogin(e);
              } else {
                e.preventDefault();
              }
            }}
          >
            <SmallHeaderText>이메일</SmallHeaderText>
            <Input
              type="email"
              onChange={onChange}
              id="email"
              value={email}
              placeholder="Email"
              required
            />
            <SmallHeaderText>비밀번호</SmallHeaderText>
            <Input
              type="password"
              onChange={onChange}
              id="password"
              value={password}
              placeholder="Password"
              required
            />

            <LoginButton type="submit" value="로그인" />
          </FormContainer>
          <SignUpContainer>
            <p>혹시 회원이 아니신가요?</p>
            <StyledLink href={"/auth/signup"}>
              <p>회원가입</p>
            </StyledLink>
          </SignUpContainer>
          <LoadingContainer>{isLoading && <Ring />}</LoadingContainer>
        </motion.div>
      </LoginContainer>
      <AnimatePresence>
        {errorCode && (
          <StatusModal
            initial={{ opacity: 0, scale: 0, x: "-50%", y: 90 }} // 초기 상태 설정
            animate={{ opacity: 1, scale: 1, x: "-50%", y: 0 }} // 애니메이션 진행 중 상태
            exit={{ opacity: 0, x: "-50%", y: 50 }} // 나가는 애니메이션 설정
            styledbgColor={colors.calendar.red}
          >
            <Exclamation
              width={20}
              height={20}
              fill={"white"}
              style={{ marginRight: "10px" }}
            />
            {errorMsg}
          </StatusModal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isLoginSuccess && (
          <StatusModal
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: 150 }} // 초기 상태 설정
            animate={{ opacity: 1, scale: 1, x: "-50%", y: 0 }} // 애니메이션 진행 중 상태
            exit={{ opacity: 0, x: "-50%" }} // 나가는 애니메이션 설정
            styledbgColor={colors.calendar.mint}
          >
            <Exclamation
              width={20}
              height={20}
              fill={"white"}
              style={{ marginRight: "10px" }}
            />
            로그인에 성공했어요. 잠시만 기다려주세요.
          </StatusModal>
        )}
      </AnimatePresence>
    </Container>
  );
};

// 컨테이너
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

const LoginContainer = styled(motion.div)`
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

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

const StyledLink = styled(Link)`
  margin-left: 10px;
  color: ${colors.calendar.mint};
  font-weight: 600;
  :hover {
    text-decoration: underline;
  }
`;

const SmallHeaderText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: 700;
  color: ${colors.font.black};
`;
const StatusModal = styled(motion.div)`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 800;
  top: 40px;
  left: 50%;
  background-color: ${(props) => props.styledbgColor};
  color: white;
  border-radius: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 18px;
  font-weight: 300;
  padding: 10px 15px;
`;

export default Login;
