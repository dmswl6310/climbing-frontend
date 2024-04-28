import { SERVER_ADDRESS } from "@/constants/constants";
import { RequestProps, GetProps, PostProps } from "@/constants/service/type";

//20초 후 abort
const timeLimit = 20000;

export const requestData = async ({
  option,
  url,
  token,
  data,
  onSuccess, // 성공 후 처리
  onError,
  hasBody, // json화하지않고 통째로 response받을때 false로 하면됨
}: RequestProps) => {
  const absoluteUrl = SERVER_ADDRESS + url;

  switch (option) {
    case "GET":
      return getData({ absoluteUrl, token, onSuccess, onError, hasBody });

    case "POST":
    case "PUT":
    case "DELETE":
      return postData({
        option,
        absoluteUrl,
        data,
        token,
        onSuccess,
        onError,
        hasBody,
      });

    default:
      console.log("잘못된 옵션 설정");
  }
};

const getData = ({
  absoluteUrl,
  token,
  onSuccess,
  onError,
  hasBody = false,
}: GetProps) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const contentType = { "Content-Type": "application/json" };
  let headers;

  if (token) {
    headers = { ...contentType, Authorization: `Bearer ${token}` };
  } else {
    headers = { ...contentType };
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
    .then((response) => {
      if (!response.ok) {
        // 404, 500...등의 에러
        throw new Error(`${response.status} 에러`);
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
      if (onError) onError();
    });
};

const postData = ({
  option,
  absoluteUrl,
  data,
  token,
  onSuccess,
  onError,
  hasBody = true,
}: PostProps) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const contentType = { "Content-Type": "application/json" };
  let headers;

  if (token) {
    headers = { ...contentType, Authorization: `${token}` };
  } else {
    headers = { ...contentType };
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
    .then((response) => {
      if (!response.ok) {
        // 404, 500...등의 에러
        throw new Error(`${response.status} 에러`);
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
      if (onError) onError();
    });
};
