import Header from "@/components/setting/Header";
import styled from "styled-components";
import * as colors from "../../styles/colors";
import AngleRight from "../../assets/angle-small-right.svg";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useEffect } from "react";
import nookies from "nookies";
import { admin } from "@/utils/firebase/firebaseAdmin";

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    if (!cookies.token) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    const token = await admin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    return { props: { uid: uid, email: email } };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};

export default function Setting() {
  const router = useRouter();
  const user = useAuth();
  return (
    <>
      {user.user && (
        <Container>
          <Header headerText={"설정"} />
          <Main>
            <Padding>
              <Menu
                onClick={() => {
                  router.push("/setting/team");
                }}
              >
                팀 설정
                <AngleRight
                  fill={colors.font.gray}
                  width={23}
                  height={23}
                  style={{ position: "absolute", right: 15 }}
                />
              </Menu>
              <Menu
                onClick={() => {
                  router.push("/setting/team");
                }}
              >
                계정 설정
                <AngleRight
                  fill={colors.font.gray}
                  width={23}
                  height={23}
                  style={{ position: "absolute", right: 15 }}
                />
              </Menu>
            </Padding>
          </Main>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 60px;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Padding = styled.div`
  width: 1080px;
  height: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1080px) {
    width: 800px;
  }
`;

const Menu = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  padding: 0px 20px;
  font-size: 25px;
  font-weight: 600;
  border-radius: 10px;
  border: 2px solid ${colors.border.gray};
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.03);
  color: ${colors.font.gray};
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
`;
