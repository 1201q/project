import { loginWithEmail } from "@/utils/firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const loginError = await loginWithEmail(email, password);
    if (loginError === null) {
      router.push("/");
    } else {
      console.log(loginError);
    }
  };

  return (
    <div>
      <form onSubmit={onLogin}>
        <input type="email" onChange={onChange} id="email" value={email} />
        <input
          type="password"
          onChange={onChange}
          id="password"
          value={password}
        />
        <input type="submit" />
      </form>
      <button
        onClick={() => {
          router.push("/auth/signup");
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default Login;
