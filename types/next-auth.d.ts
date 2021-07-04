import NextAuth from 'next-auth';

declare module "next-auth" {
  interface User {
    oauth?: {
      provider: "kakao";
      userId: string;
    };
    username?: string;
    birth?: Date;
    gender?: "male" | "female";
    accessToken?: string;
  }

  interface Session {
    user?: User;
  }
}
