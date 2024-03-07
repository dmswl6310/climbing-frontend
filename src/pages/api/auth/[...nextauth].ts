import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

export default NextAuth({
  providers: [
    //자체 로그인
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any){
        return credentials;
    },
      // async authorize(credentials) {
      //   const response = await fetch(
      //     "https://http://localhost:3000/api/login",
      //     {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify(credentials),
      //     }
      //   );

      //   const data = await response.json();

      //   if (data.ok) {
      //     return {
      //       name: data.name,
      //       email: data.email,
      //       token: data.token,
      //     };
      //   } else {
      //     return null as any;
      //   }
      // },
    }),
    // 다른 경로로 로그인 => 콜백으로 토큰받아서 서버에 넘겨줘야..
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  //  jwt나 세션 쓸때
  callbacks: {
    //   async session(session, token) {
    //     // 세션에 토큰 정보를 추가합니다.
    //     session.token = token.token;
    //     console.log("token*******************" + session.token);
    //     return session;
    //   },
    // },
    // session: {
    //   jwt: true,
    // },

    async jwt({ token, user, account }) {
      // if (account) {
      //   token.accessToken = account.access_token;
      // }
      // token.userId = 123;
      // token.test = "test";
      console.log("token*******************" + token);
      return token;
    },
    async session({ session, token, user }) {
      console.log("session*******************" + session);
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "error",
  },
});
