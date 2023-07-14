import { authService } from "./firebaseClient";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";

// 회원가입
export async function registerWithEamil(email, password, displayName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      authService,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);

    await updateProfile(user, { displayName: displayName });
    return null;
  } catch (error) {
    return error.message.replace("Firebase: Error ", "");
  }
}

// 로그인 함수
export async function loginWithEmail(email, password) {
  try {
    await signInWithEmailAndPassword(authService, email, password);
    return null;
  } catch (error) {
    return error.message.replace("Firebase: Error ", "");
  }
}

export async function loginWithSocial(provider) {
  if (provider === "google") {
    try {
      const provider = new GoogleAuthProvider();
      await new signInWithRedirect(authService, provider);
      const result = await getRedirectResult(authService);
      if (result) {
        // const user = result.user;
      }
      return;
    } catch (error) {
      return error;
    }
  } else if (provider === "github") {
    try {
      const provider = new GithubAuthProvider();
      await new signInWithRedirect(authService, provider);
      const result = await getRedirectResult(authService);
      if (result) {
        const user = result.user;
      }
      return uesr;
    } catch (error) {
      return error;
    }
  }
}

// 로그아웃
export async function logout() {
  await signOut(authService);
  console.log("로그아웃");
  return null;
}
