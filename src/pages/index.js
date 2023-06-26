import { logout } from "@/utils/firebase/auth";

import nookies from "nookies";
import { admin } from "@/utils/firebase/firebaseAdmin";
import { useAuth } from "@/utils/context/authProvider";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
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

export default function Home({ email, uid }) {
  const router = useRouter();
  const user = useAuth();
  console.log(user.user);
  return (
    <div>
      <button
        onClick={() => {
          logout();
          router.push("/auth/login");
        }}
      >
        로그아웃
      </button>
      {email}
    </div>
  );
}
