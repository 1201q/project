import styled from "styled-components";
import { registerWithEamil } from "@/utils/firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
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

  const onSignup = async (e) => {
    e.preventDefault();
    const signupError = await registerWithEamil(email, password);
    if (signupError === null) {
      router.push("/");
    } else {
      console.log(signupError);
    }
  };
  return (
    <div>
      <form onSubmit={onSignup}>
        <input type="email" onChange={onChange} id="email" value={email} />
        <input
          type="password"
          onChange={onChange}
          id="password"
          value={password}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Signup;
