import { signOut, useSession } from "next-auth/client";

import { DefaultButton } from "@fluentui/react";
import HomeStyles from "../styles/home.module.css";
import { NextPageContext } from "next";
import { handler } from "../lib/api-client";
import { useEffect } from "react";
import { useMe } from "../utils/useMe";
import { useRouter } from "next/dist/client/router";

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {},
  };
};

const HomePage = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const me = useMe();

  useEffect(() => {
    if (!session || !session.user?.accessToken) {
      router.push("/");
    }
  }, [session, loading, router]);

  if (loading) {
    return <>loading...</>;
  }

  return (
    <>
      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <div className={HomeStyles.panel}>
            <p>{JSON.stringify(me.data)}</p>
            <DefaultButton
              iconProps={{ iconName: "AddFriend" }}
              onClick={() => signOut()}
            >
              로그아웃
            </DefaultButton>
            <DefaultButton
              iconProps={{ iconName: "AddFriend" }}
              onClick={async () => {
                await handler({
                  method: "put",
                  url: "/ornn-api/v1/auth/withdrawal",
                });
                return signOut();
              }}
            >
              회원 탈퇴
            </DefaultButton>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
