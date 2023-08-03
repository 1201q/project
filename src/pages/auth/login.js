import { loginWithEmail } from "@/utils/firebase/auth";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import styled from "styled-components";
import * as colors from "../../styles/colors";
import { motion } from "framer-motion";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useAuth } from "@/utils/context/auth/AuthProvider";

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
      router.push("/");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log(loginError);
      setErrMsg(loginError);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loading text={"로그인중..."} />
      ) : (
        <Container>
          <Wrapper>
            <FormContainer onSubmit={onLogin}>
              <Input
                type="email"
                onChange={onChange}
                id="email"
                value={email}
                placeholder="이메일"
                required
              />

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
                value="로그인"
              />
            </FormContainer>
            <ButtonContainer>
              <Link href={"/auth/signup"}>
                <SubmitLink>회원가입</SubmitLink>
              </Link>
            </ButtonContainer>
            <ErrorContainer>{errorMsg && errorMsg}</ErrorContainer>
            {user.user && (
              <button onClick={() => router.push("/")}>로그인</button>
            )}
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

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  align-items: flex-end;
  padding: 0px 20px;
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

const SubmitLink = styled.p`
  color: ${colors.font.darkgray};
  font-size: 14px;
`;

export default Login;
