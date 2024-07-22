import getExpireDate from "@/service/api/getExpireDate";
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
              accessExpireDate: 0,
              refreshExpireDate: 0,
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
            accessExpireDate: await getExpireDate(credentials.accessToken),
            refreshExpireDate: await getExpireDate(credentials.refreshToken),
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
              accessExpireDate: 0,
              refreshExpireDate: 0,
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
            accessExpireDate: await getExpireDate(credentials.accessToken),
            refreshExpireDate: await getExpireDate(credentials.refreshToken),
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
    // maxAge: 3 * 24 * 60 * 60, // 로그인 유지 기간 (=3일)
  },

  //  jwt나 세션 쓸때
  callbacks: {
    // 로그인 시 return한 값이 user로 들어옴
    async jwt({ token, trigger, user, session }) {
      // 로그인 시
      if (user) {
        return {
          ...token,
          ...user,
          jwt: user.jwt,
        };
      } else {
        if (trigger == "update" && session) {
          console.log("토큰 업데이트");
          token.jwt = { ...token.jwt, ...session };
        }
        return token;
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
