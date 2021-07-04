import { useEffect, useState } from "react";

import HomeStyles from "../styles/home.module.css";
import { NextPageContext } from "next";
import SignInWidget from "../components/SignInWidget";
import SignUpWidget from "../components/SignUpWidget";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/client";

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {},
  };
};

const IndexPage = () => {
  type Mode = "LOADING" | "SIGN_IN" | "SIGN_UP";

  const [mode, setMode] = useState<Mode>("SIGN_IN");
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      setMode("LOADING");
    } else if (!session) {
      setMode("SIGN_IN");
    } else if (!session.user?.accessToken) {
      setMode("SIGN_UP");
    } else {
      router.push("/home");
    }
  }, [session, loading, router]);

  if (loading) {
    return <>loading...</>;
  }

  const getContent = (mode: Mode) => {
    switch (mode) {
      case "LOADING":
        return <>loading...</>;
      case "SIGN_IN":
        return <SignInWidget />;
      case "SIGN_UP":
        return <SignUpWidget />;
    }
  };

  return (
    <>
      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <div className={HomeStyles.panel}>{getContent(mode)}</div>
        </main>
      </div>
    </>
  );
};

export default IndexPage;
