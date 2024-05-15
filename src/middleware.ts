import { withAuth } from "next-auth/middleware";
import { jwtVerify } from "jose";

export default withAuth({
  callbacks: {
    authorized: async ({ token }) => {
      if (!token) return false;
      const textEncoder = new TextEncoder();
      const secret = textEncoder.encode(process.env.JWT_SECRET);
      try {
        const { payload } = await jwtVerify(token.jwt.accessToken, secret);
        return true; // 아직 ROLE_MANAGER 롤을 자동으로 부여받을 수 없기 때문에 로그인만 하면 true를 반환하도록 설정
        // ROLE_MANAGER 계정으로 테스트할 수 있게 되면 윗줄을 삭제하고 아래 로직대로 적용할 예정입니다
        if (payload.role === "ROLE_MANAGER") return true;
      } catch (error) {
        console.log(error);
      }
      return false;
    },
  },
});

export const config = { matcher: ["/manage/:path*"] };
