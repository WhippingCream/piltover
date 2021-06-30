import styles from "../styles/Home.module.css";
import { signOut, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPageContext } from "next";
import { PiltoverSession } from "../types/auth";

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (session) {
    console.log(session);
  }

  // try {
  //   const result = await client.get<string>("/ornn-api/v1");
  //   if (result.data) {
  //     data = result.data;
  //   }
  //   console.log(context);
  // } catch (e) {
  //   data = "fetch failed";
  // }

  return {
    props: { session },
  };
};

function HomePage({ session }: { session: PiltoverSession }) {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth/sign-in");
    } else if (!session.ornnUser) {
      router.push("/auth/sign-up");
    }
  }, [session]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p>대충 컨텐츠</p>
        <button onClick={() => signOut()}>로그아웃</button>
      </main>
    </div>
  );
}

export default HomePage;
