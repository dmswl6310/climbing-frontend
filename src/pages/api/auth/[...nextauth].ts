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
        const data = await requestData({
          option: "POST",
          url: `/members/login`,
          data: {
            email: credentials.email,
            password: credentials.password,
          },
          onSuccess: async (response: Response) => {
            const responseHeaders = response.headers;
            console.log(responseHeaders);
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
            const jwt = {
              accessToken: responseAccessToken || "tempAccess",
              refreshToken: responseRefreshToken || "tempRefresh",
            };

            // 받은 유저정보
            const body = await response.json();
            const email = body.email || "tempEmail";
            const nickname = body.nickname || "tempNickname";

            return { user: { email, nickname }, jwt };
          },
          hasBody: false,
        });
        return data as any;
      },
    }),

    //OAuth 로그인
    CredentialsProvider({
      name: "CredentialsForOAuth",

      credentials: {
        accessToken: { label: "accessToken", type: "string" },
        refreshToken: { label: "refreshToken", type: "string" },
      },
      async authorize(credentials: any) {
        //토큰
        const jwt = {
          accessToken: credentials.accessToken || "tempAccess",
          refreshToken: credentials.refreshToken || "tempRefresh",
        };

        // 유저정보
        const email = "tempEmail";
        const nickname = "tempNickname";

        return { user: { email, nickname }, jwt } as any;
      },
    }),
  ],

  // jwt 설정
  session: {
    strategy: "jwt",
    // maxAge: 3 * 24 * 60 * 60, // 로그인 유지 기간 (=3일)
  },

  //  jwt나 세션 쓸때
  callbacks: {
    // 로그인 시 return한 값이 user로 들어옴
    async jwt({ token, user }) {
      const expireDate = 3000;

      // 로그인 시
      if (user) {
        return {
          ...token,
          ...user,
          jwt: user.jwt,
        };
      } else if (Date.now() < Date.now() + expireDate) {
        // 액세스 토큰 만료 전
        console.log("토큰 만료 전");
        return token;
      } else {
        console.log("토큰 만료 후");
        // 만료 후 리프레시 토큰으로 액세스 토큰 업데이트 요청
        if (!token.jwt.refreshToken) throw new Error("Missing refresh token");
        // 리프레시 토큰도 만료되었을 시, 데이터삭제 및 로그아웃
        return token;
        // return updateAccessToken(token.jwt.refreshToken);
      }
    },

    // jwt에서 return한 값이 token으로 들어옴
    async session({ session, token }) {
      if (token) {
        session.jwt = token.jwt as any;
        session.user = token.user as any;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "error",
  },
});

async function updateAccessToken(refreshToken: string) {
  try {
    const data = await requestData({
      option: "POST",
      url: `/token/update`,
      token: refreshToken,
      onSuccess: async (response: Response) => {
        const responseHeaders = response.headers;
        const responseAccessToken = responseHeaders.get("Authorization");
        const responseRefreshToken = responseHeaders.get(
          "Authorization-refresh"
        );
        if (!(responseHeaders && responseAccessToken && responseRefreshToken)) {
          throw Error("missing header or token");
        }

        // TODO: 토큰형식으로 리턴
      },
      hasBody: false,
    });
    return data as any;
  } catch (error) {
    // 문제있을시
  }
}
