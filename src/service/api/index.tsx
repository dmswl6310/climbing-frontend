import { SERVER_ADDRESS } from "@/constants/constants";
import { RequestProps, GetProps, PostProps } from "@/constants/service/type";
import { Session } from "next-auth";
import getUpdatedToken from "./updateToken";
import router from "next/router";

//20초 후 abort
const timeLimit = 20000;

export const requestData = async ({
  option,
  url,
  session,
  data,
  onSuccess, // 성공 후 처리
  onError,
  hasBody, // json화하지않고 통째로 response받을때 false로 하면됨
  update,
}: RequestProps) => {
  const absoluteUrl = SERVER_ADDRESS + url;

  switch (option) {
    case "GET":
      return getData({
        absoluteUrl,
        session,
        onSuccess,
        onError,
        hasBody,
        update,
      });

    case "POST":
    case "PUT":
    case "DELETE":
      return postData({
        option,
        absoluteUrl,
        data,
        session,
        onSuccess,
        onError,
        hasBody,
        update,
      });

    default:
      console.log("잘못된 옵션 설정");
  }
};

const getData = ({
  absoluteUrl,
  session,
  onSuccess,
  onError,
  hasBody = true,
  update,
}: GetProps) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const headers = makeHeader(session);
  if (headers == -1) {
    alert("토큰 만료로 재로그인이 필요합니다.");
    return router.push("/login");
  }

  // 특정시간 이상 지날시에러 처리
  const timeout = setTimeout(() => {
    console.log("응답시간이 초과되었습니다. 요청을 종료합니다");
    controller.abort();
  }, timeLimit);

  return fetch(absoluteUrl, {
    method: "GET",
    headers: headers,
    signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        // 404, 500...등의 에러
        throw new Error(`${response.status}`);
      }
      if (update) {
        const responseHeaders = response.headers;
        const responseAccessToken = responseHeaders.get("Authorization");
        const responseRefreshToken = responseHeaders.get(
          "Authorization-refresh"
        );

        const updatedjwt = await getUpdatedToken(
          responseAccessToken,
          responseRefreshToken
        );
        if (responseAccessToken || responseRefreshToken) {
          update(updatedjwt);
        }
      }
      if (hasBody) return response.json();
      return response;
    })
    .then((data) => {
      clearTimeout(timeout);

      if (onSuccess) {
        return onSuccess(data);
      }
      // 실제 데이터 반환
      return data;
    })
    .catch((error) => {
      clearTimeout(timeout);
      console.log("\n주소 : " + absoluteUrl);
      console.log("옵션 : GET");
      console.log(error.stack + "\n");
      if (onError) onError(error);
    });
};

const postData = ({
  option,
  absoluteUrl,
  data,
  session,
  onSuccess,
  onError,
  hasBody = true,
  update,
}: PostProps) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const headers = makeHeader(session);
  if (headers == -1) {
    alert("토큰 만료로 재로그인이 필요합니다.");
    return router.push("/login");
  }

  // 특정시간 이상 지날시에러 처리
  const timeout = setTimeout(() => {
    console.log("응답시간이 초과되었습니다. 요청을 종료합니다");
    controller.abort();
  }, timeLimit);

  return fetch(absoluteUrl, {
    method: option,
    headers: headers,
    body: JSON.stringify(data),
    signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        // 404, 500...등의 에러
        throw new Error(`${response.status}`);
      }
      if (update) {
        const responseHeaders = response.headers;
        const responseAccessToken = responseHeaders.get("Authorization");
        const responseRefreshToken = responseHeaders.get(
          "Authorization-refresh"
        );

        const updatedjwt = await getUpdatedToken(
          responseAccessToken,
          responseRefreshToken
        );
        if (responseAccessToken || responseRefreshToken) {
          update(updatedjwt);
        }
      }

      if (hasBody) return response.json();
      return response;
    })
    .then((data) => {
      clearTimeout(timeout);

      if (onSuccess) {
        return onSuccess(data);
      }
      return data;
    })
    .catch((error) => {
      clearTimeout(timeout);
      console.log("\n주소 : " + absoluteUrl);
      console.log("옵션 : POST");
      console.log(error.stack + "\n");
      if (onError) onError(error);
    });
};

const makeHeader = (session: Session | null | undefined) => {
  const contentType = { "Content-Type": "application/json" };
  const dateNow = Date.now();

  if (session) {
    // 리프레시 만료
    if (dateNow > session.jwt.refreshExpireDate!) return -1;
    // 엑세스 만료
    if (dateNow > session.jwt.accessExpireDate!)
      return {
        ...contentType,
        "Authorization-refresh": `Bearer ${session.jwt.refreshToken}`,
      };
    // 만료된 토큰 없음
    return {
      ...contentType,
      Authorization: `Bearer ${session.jwt.accessToken}`,
    };
  } else {
    return { ...contentType };
  }
};
