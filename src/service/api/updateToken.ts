import { SERVER_ADDRESS } from "@/constants/constants";

const getUpdatedToken = async (refreshToken: string) => {
  const updateToken = await fetch(`${SERVER_ADDRESS}/token/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization-refresh": refreshToken,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} 에러`);
      }
      return res;
    })
    .then((response) => {
      const responseHeaders = response.headers;
      console.log(responseHeaders);
      const responseAccessToken = responseHeaders.get("Authorization");
      const responseRefreshToken = responseHeaders.get("Authorization-refresh");
      if (!(responseHeaders && responseAccessToken && responseRefreshToken)) {
        throw Error("missing header or token");
      }

      return responseAccessToken;
    });

  return updateToken;
};

export default getUpdatedToken;
