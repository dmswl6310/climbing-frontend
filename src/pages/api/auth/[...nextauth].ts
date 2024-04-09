import { requestData } from "@/service/api";
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
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        let email = "tempEmail";
        let nickname = "tempNickname";
        let token = "tempToken";

        requestData({
          option: "POST",
          url: `/members/login`,
          data: credentials,
          onSuccess: (data: any) => {
            email = data.email;
            nickname = data.nickname;
            token = data.token;
          },
        });
        const user = { email, nickname, token };
        return user as any;
      },
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
  // jwt 설정
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 로그인 유지 기간 (=3일)
  },

  //  jwt나 세션 쓸때
  callbacks: {
    // 로그인 시 return한 값이 user로 들어옴
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    // jwt에서 return한 값이 token으로 들어옴
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "error",
  },
  secret: process.env.AUTH_SECRET,
});
