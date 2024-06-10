import { SERVER_ADDRESS } from "@/constants/constants";

const getLoginInfos = async (email: string, password: string) => {
  const sendInfo = { email: email, password: password };

  const userInfo = await fetch(`${SERVER_ADDRESS}/members/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendInfo),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} 에러`);
      }
      return res;
    })
    .then(async (response) => {
      const responseHeaders = response.headers;
      const responseAccessToken = responseHeaders.get("Authorization");
      const responseRefreshToken = responseHeaders.get("Authorization-refresh");
      if (!(responseHeaders && responseAccessToken && responseRefreshToken)) {
        throw Error("missing header or token");
      }
      // console.log(responseHeaders);
      // 받은 토큰
      const jwt = {
        accessToken: responseAccessToken || "tempAccess",
        refreshToken: responseRefreshToken || "tempRefresh",
      };

      const body = await response.json();

      const email = body.email || "tempEmail";
      const nickname = body.nickname || "tempNickname";

      return { user: { email, nickname }, jwt };
    });
  // console.log(userInfo);
  return userInfo;
};

export default getLoginInfos;
