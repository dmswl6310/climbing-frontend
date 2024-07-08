import { SERVER_ADDRESS } from "@/constants/constants";

// 매 api 호출시 토큰이 업데이트 되는 형식으로 바귐 => 아래코드 현재안씀
const getUpdatedToken = async (refreshToken: string, accessToken: string) => {
  const updateToken = await fetch(`${SERVER_ADDRESS}/members/token/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization-refresh": `Bearer ${refreshToken}`,
      Authorization: `Bearer ${accessToken}`,
    },
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

      // if (!(responseHeaders && responseAccessToken)) {
      //   throw Error("missing header or token");
      // }
      return responseAccessToken || "tempAccessToken";
    });

  return updateToken;
};

export default getUpdatedToken;
