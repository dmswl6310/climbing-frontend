import { SERVER_ADDRESS } from "@/constants/constants";
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
        let jwt = { accessToken: "tempAccess", refreshToken: "tempRefresh" };

        requestData({
          option: "POST",
          url: `/members/login`,
          data: { email: credentials.email, password: credentials.password },
          onSuccess: (response: any) => {
            const responseHeaders = response.headers;
            const responseAccessToken = responseHeaders.get("Authorization");
            const responseRefreshToken = responseHeaders.get(
              "Authorization-refresh"
            );
            if (
              !(responseHeaders && responseAccessToken && responseRefreshToken)
            ) {
              throw Error("missing header or token");
            }

            // 받은 토큰
            jwt = {
              accessToken: responseHeaders.get("Authorization"),
              refreshToken: responseHeaders.get("Authorization-refresh"),
            };

            // 받은 유저정보
            // const data = response.json();
            // email = data.email;
            // nickname = data.nickname;
          },
          hasBody: false,
        });
        return { user: { email, nickname }, jwt } as any;
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
      if (user) {
        return {
          ...token,
          ...user,
          jwt: user.jwt,
        };
      }
      return token;
    },
    // jwt에서 return한 값이 token으로 들어옴
    async session({ session, token }) {
      if (token) {
        session.jwt = token.jwt as any;
        session.user = token.user as any;
      }
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log("url", url);
    //   console.log("baseUrl", baseUrl);

    //   return url.startsWith(SERVER_ADDRESS) ? url : baseUrl;
    // },
    // async redirect({ url, baseUrl }) {
    // if (url.startsWith(SERVER_ADDRESS)) {
    //   console.log("이상하네");
    //   return Promise.resolve(
    //     "http://3.37.207.190:8080/login/oauth2/code/kakao"
    //   );
    //   return;
    // }

    // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
  },

  pages: {
    signIn: "/login",
    error: "error",
  },
  // async redirect({ url, baseUrl }) { const redirectUrl = url.startsWith('/') ? new URL(url, baseUrl).toString() : url console.log([next-auth] Redirecting to "${redirectUrl}" (resolved from url "${url}" and baseUrl "${baseUrl}")) return '/start' },
});
