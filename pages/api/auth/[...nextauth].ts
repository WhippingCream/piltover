import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { client } from "../../../lib/api-client";

export default NextAuth({
  providers: [
    Providers.Kakao({
      clientId: process.env.KAKAO_REST_KEY,
    }),
  ],
  callbacks: {
    async session(session, token) {
      let ornnUser;

      try {
        const { data } = await client.put("/ornn-api/v1/auth/sign-in", {
          memberId: token.sub,
          provider: "kakao",
        });

        ornnUser = data;
      } catch (e) {
        ornnUser = null;
      }

      return { ...session, token, ornnUser };
    },
  },
});
