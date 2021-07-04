import NextAuth, { Session, User } from "next-auth";

import { OrnnUser } from "../../../types/auth";
import { handler } from "../../../lib/api-client";

export default NextAuth({
  providers: [
    {
      id: "kakao",
      name: "Kakao",
      type: "oauth",
      version: "2.0",
      scope: "",
      params: { grant_type: "authorization_code" },
      accessTokenUrl: "https://kauth.kakao.com/oauth/token",
      authorizationUrl:
        "https://kauth.kakao.com/oauth/authorize?response_type=code",
      profileUrl: "https://kapi.kakao.com/v2/user/me",
      profile(profile) {
        const user: User = {
          oauth: {
            provider: "kakao",
            userId: profile.id as string,
          },
        };

        return { user, id: profile.id as string };
      },
      clientId: process.env.KAKAO_REST_KEY as string,
      clientSecret: "",
    },
  ],
  callbacks: {
    session: async (session, token) => {
      const user: User = {
        oauth: {
          provider: "kakao",
          userId: token.sub as string,
        },
      };

      try {
        const result = await handler<OrnnUser>({
          method: "put",
          url: "/ornn-api/v1/auth/sign-in",
          data: {
            memberId: token.sub,
            provider: "kakao",
          },
        });

        user.username = result?.username;
        user.accessToken = result?.accessToken;
        user.birth = result?.birth;
        user.gender = result?.gender;
      } catch (e) {
        return null;
      }

      const newSession: Session = {
        user,
        expires: session.expires,
      };

      return newSession;
    },
  },
});
