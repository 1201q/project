import styled from "styled-components";
import { registerWithEamil } from "@/utils/firebase/auth";
import nookies from "nookies";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setDocument } from "@/utils/firebase/db";
import { authService } from "@/utils/firebase/firebaseClient";
import { admin } from "@/utils/firebase/firebaseAdmin";
import * as colors from "../../styles/colors";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import Image from "next/image";
import { Ring } from "@uiball/loaders";
import Exclamation from "../../assets/exclamation (3).svg";

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
  const [errorCode, setErrorCode] = useState(null);
  const [errorMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

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
      setIsSignUpSuccess(true);
      setErrorCode(null);
      if (!complete) {
        router.reload();
      }
    } else {
      console.log(signupError);
      setIsLoading(false);
      setErrorCode(signupError);
      console.log(signupError);
      getErrorMsg(signupError);
    }
  };

  const getErrorMsg = (code) => {
    if (code === "auth/weak-password") {
      setErrMsg("비밀번호를 6자리 이상으로 설정해주세요.");
    } else if (code === "auth/email-already-in-use") {
      setErrMsg("이미 사용 중인 이메일이에요.");
    } else if (code === "auth/too-many-requests") {
      setErrMsg("잠시 후 다시 시도해주세요.");
    } else {
      setErrMsg("회원가입할 수 없어요.");
    }
  };

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
          src={require(`../../assets/background/login3.jpg`)}
          alt="loginBg"
        />
      </BgContainer>
      <SignUpContainer>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <LoginText>회원가입</LoginText>
          <FormContainer
            onSubmit={(e) => {
              if (!errorCode) {
                onSignup(e);
              } else {
                e.preventDefault();
              }
            }}
          >
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
        </motion.div>
        <LoadingContainer>{isLoading && <Ring />}</LoadingContainer>
      </SignUpContainer>
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
        {isSignUpSuccess && (
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
            회원가입에 성공했어요. 잠시 후 자동으로 로그인될 거예요.
          </StatusModal>
        )}
      </AnimatePresence>
    </Container>
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

const SignUpContainer = styled.div`
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
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
