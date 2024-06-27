import { requestData } from "@/service/api";
import getUpdatedToken from "@/service/api/updateToken";
import { jwtVerify } from "jose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [
    //자체 로그인
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        nickname: { label: "Nickname", type: "nickname" },
        accessToken: { label: "AccessToken", type: "token" },
        refreshToken: { label: "RefreshToken", type: "token" },
        loginType: { label: "LoginType", type: "string" },
      },
      async authorize(credentials: any) {
        if (credentials.loginType === "general") {
          console.log("일반 로그인");

          const tempUserInfo = {
            user: {
              email: "tempEmail(normal)",
              nickname: "tempNickname(normal)",
            },
            jwt: {
              accessToken: "tempAccess(normal)",
              refreshToken: "tempRefresh(normal)",
            },
          };

          if (
            !credentials.accessToken ||
            !credentials.refreshToken ||
            !credentials.nickname
          ) {
            return tempUserInfo;
          }

          const jwt = {
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
          };

          return {
            user: { email: credentials.email, nickname: credentials.nickname },
            jwt,
          } as any;
        } else if ((credentials.loginType = "oauth")) {
          console.log("간편 로그인");
          const tempUserInfo = {
            user: {
              email: "tempEmail(oauth)",
              nickname: "tempNickname(oauth)",
            },
            jwt: {
              accessToken: "tempAccess(oauth)",
              refreshToken: "tempRefresh(oauth)",
            },
          };
          if (
            !credentials.accessToken ||
            !credentials.refreshToken ||
            !credentials.nickname ||
            !credentials.email
          ) {
            return tempUserInfo;
          }
          const jwt = {
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
          };

          return {
            user: { email: credentials.email, nickname: credentials.nickname },
            jwt,
          } as any;
        }
        console.log("잘못된 로그인 타입");
        return null;
      },
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
      // 로그인 시
      if (user) {
        return {
          ...token,
          ...user,
          jwt: user.jwt,
        };
      } else {
        const textEncoder = new TextEncoder();
        const secret = textEncoder.encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token.jwt.accessToken, secret);
        const expireDate = payload.exp! * 1000;

        if (Date.now() < expireDate) {
          // 액세스 토큰 만료 전
          console.log("토큰 만료 전");
          return token;
        } else {
          console.log("토큰 만료 후");
          // 만료 후 리프레시 토큰으로 액세스 토큰 업데이트 요청
          if (!token.jwt.refreshToken) throw new Error("Missing refresh token");
          // 리프레시 토큰도 만료되었을 시, 데이터삭제 및 로그아웃

          // const hello = await getUpdatedToken(token.jwt.refreshToken);
          // console.log(hello);
          return token;
        }
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
    error: "/error/login",
  },
});
