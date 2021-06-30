import styles from "../../styles/Home.module.css";
import { signIn, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PiltoverSession } from "../../types/auth";
import { NextPageContext } from "next";

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  return {
    props: { session },
  };
};

export default function SignInPage({ session }: { session: PiltoverSession }) {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p>필트오버 - 휘핑크림 통합 포탈</p>
        <button
          onClick={() =>
            signIn("kakao", { callbackUrl: process.env.OAUTH_CALLBACK_URL })
          }
        >
          카카오 계정으로 로그인
        </button>
      </main>
    </div>
  );
}
