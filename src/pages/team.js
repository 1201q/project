import styled from "styled-components";
import nookies from "nookies";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { admin } from "@/utils/firebase/firebaseAdmin";
import Sidebar from "@/components/Sidebar";
import Loading from "@/components/Loading";
import Team from "@/components/Team/Team";

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

    return {
      props: { email: email, uid: uid },
    };
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

export default function TeamFind() {
  const user = useAuth();
  return (
    <>
      {!user.user ? (
        <Loading text="로딩중..." />
      ) : (
        <Container>
          <Sidebar userData={user} />
          <Team />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;
