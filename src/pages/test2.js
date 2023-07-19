import { logout } from "@/utils/firebase/auth";

import nookies from "nookies";
import { admin } from "@/utils/firebase/firebaseAdmin";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useRouter } from "next/router";
import { authService, dbService } from "@/utils/firebase/firebaseClient";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { addDocument, setDocument } from "@/utils/firebase/db";

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
  const [allTeams, setAllTeams] = useState([]);
  const [joinTeams, setJoinTeams] = useState([]);
  const [team, setTeam] = useState("");

  useEffect(() => {
    getTeamList("teams");
  }, []);

  function getTeamList(collectionId) {
    const collectionRef = collection(dbService, collectionId);

    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      let arr = [];
      let joinArr = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (
          data.members &&
          Array.isArray(data.members) &&
          data.members.includes(uid)
        ) {
          joinArr.push({ id: doc.id, ...data });
        }
        arr.push({ id: doc.id, ...data });
      });
      setAllTeams([...arr]);
      setJoinTeams([...joinArr]);
    });
  }

  async function joinTeam(team) {
    try {
      const updatedArr = [...team.members, uid];
      const teamData = { ...team, members: updatedArr };

      await setDocument("teams", team.id, teamData);
    } catch (error) {
      console.log(error);
    }
  }

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

      <Team>
        <Header>팀 목록</Header>
        {allTeams.map((item, index) => (
          <Flex key={index}>
            {item.teamName}
            <button
              onClick={() => {
                joinTeam(item);
              }}
            >
              가입하기
            </button>
          </Flex>
        ))}
        <Header>내가 참여중인 팀</Header>
        {joinTeams.map((item, index) => (
          <Flex key={index}>{item.teamName}</Flex>
        ))}
        <Header>팀 생성</Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = { teamName: team, members: [uid] };
            addDocument("teams", data);
          }}
        >
          <input
            type="text"
            onChange={(e) => setTeam(e.target.value)}
            value={team}
          />
          <input type="submit" />
        </form>
      </Team>
    </div>
  );
}

const Team = styled.div`
  background-color: yellow;
  height: 100%;
  padding: 20px;
`;

const Flex = styled.div`
  width: 200px;
  display: flex;
  margin-bottom: 5px;
  cursor: pointer;
`;

const Header = styled.p`
  font-size: 30px;
  margin-bottom: 10px;
`;
