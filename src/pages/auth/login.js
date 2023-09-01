import { loginWithEmail } from "@/utils/firebase/auth";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";
import * as colors from "../../styles/colors";
import { motion } from "framer-motion";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { admin } from "@/utils/firebase/firebaseAdmin";
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
  const [errorMsg, setErrMsg] = useState(null);
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
      router.reload();
    } else {
      setIsLoading(false);
      console.log(loginError);
      setErrMsg(loginError);
    }
  };

  useEffect(() => {
    if (user.user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loading text={"로그인중..."} />
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
            <LoginText>로그인</LoginText>
            <FormContainer onSubmit={onLogin}>
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
            <ErrorContainer>{errorMsg && errorMsg}</ErrorContainer>
          </LoginContainer>
        </Container>
      )}
    </>
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

export default Login;
