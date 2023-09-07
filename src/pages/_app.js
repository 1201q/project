import { AuthProvider } from "@/utils/context/auth/AuthProvider";
import {
  CalendarProvider,
  CalendarModalProvider,
} from "@/utils/context/CalendarContext";
import "../styles/globals.css";
import Head from "next/head";
import { TeamProvider } from "@/utils/context/TeamContext";
import { MainProvider } from "@/utils/context/MainContext";
import { ProjectProvider } from "@/utils/context/ProjectContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>Ideas | 아이디어스</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <AuthProvider>
        <ProjectProvider>
          <TeamProvider>
            <CalendarModalProvider>
              <CalendarProvider>
                <MainProvider>
                  <Component {...pageProps} />
                </MainProvider>
              </CalendarProvider>
            </CalendarModalProvider>
          </TeamProvider>
        </ProjectProvider>
      </AuthProvider>
    </>
  );
}
