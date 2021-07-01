import styles from "../../styles/Home.module.css";
import { signOut, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPageContext } from "next";
import { PiltoverSession } from "../../types/auth";
import Image from "next/image";

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  return {
    props: { session },
  };
};

export default function SignInPage({ session }: { session: PiltoverSession }) {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth/sign-in");
    }
  }, [session, router]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p>⚠️ 가입 이력이 없습니다. ⚠️</p>
        <div>이름: {session?.user?.name}</div>
        {session?.user?.image ? (
          <Image
            src={session?.user?.image ?? ""}
            alt="profile"
            width="64px"
            height="64px"
          />
        ) : null}
        <input />
        <button>회원가입</button>
        <button onClick={() => signOut()}>회원가입 취소</button>
      </main>
    </div>
  );
}
