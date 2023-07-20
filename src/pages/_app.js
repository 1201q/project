import { AuthProvider } from "@/utils/context/auth/AuthProvider";
import {
  CalendarProvider,
  CalendarModalProvider,
} from "@/utils/context/CalendarContext";
import "../styles/globals.css";
import Head from "next/head";
import { authService } from "@/utils/firebase/firebaseClient";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>테스트</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <CalendarModalProvider>
        <CalendarProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </CalendarProvider>
      </CalendarModalProvider>
    </>
  );
}
