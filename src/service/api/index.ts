import { RequestProps, GetProps, PostProps } from "@/constants/service/type";

//20초 후 abort
const timeLimit = 20000;

export const requestData = async ({
  option,
  url,
  sessionId,
  data,
  onSuccess, // 성공 후 처리
  onError,
}: RequestProps) => {
  const absoluteUrl = "http://3.37.207.190:8080" + url;

  switch (option) {
    case "GET":
      return getData({ absoluteUrl, sessionId, onSuccess, onError });
    case "POST":
      return postData({ absoluteUrl, data, sessionId, onSuccess, onError });
    // POST로 DELETE를 대체가능
    // case "DELETE":
    //   break;
    default:
      console.log("잘못된 옵션 설정");
  }
};

const getData = ({ absoluteUrl, sessionId, onSuccess, onError }: GetProps) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const contentType = { "Content-Type": "application/json" };
  let headers;

  if (sessionId) {
    headers = { ...contentType, Authorization: `${sessionId}` };
  } else {
    headers = { ...contentType };
  }

  // 특정시간 이상 지날시에러 처리
  const timeout = setTimeout(() => {
    console.log("응답시간이 초과되었습니다. 요청을 종료합니다");
    controller.abort();
  }, timeLimit);

  fetch(absoluteUrl, {
    method: "GET",
    headers: headers,
    signal,
  })
    .then((response) => {
      if (!response.ok) {
        // 404, 500...등의 에러
        throw new Error(`${response.status} 에러`);
      }
      // 실제 데이터 반환
      return response.json();
    })
    .then((result) => {
      clearTimeout(timeout);
      if (onSuccess) {
        return onSuccess(result);
      }
      return result;
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
  absoluteUrl,
  data,
  sessionId,
  onSuccess,
  onError,
}: PostProps) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const contentType = { "Content-Type": "application/json" };
  let headers;

  if (sessionId) {
    headers = { ...contentType, Authorization: `${sessionId}` };
  } else {
    headers = { ...contentType };
  }

  // 특정시간 이상 지날시에러 처리
  const timeout = setTimeout(() => {
    console.log("응답시간이 초과되었습니다. 요청을 종료합니다");
    controller.abort();
  }, timeLimit);

  fetch(absoluteUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
    signal,
  })
    .then((response) => {
      if (!response.ok) {
        // 404, 500...등의 에러
        throw new Error(`${response.status} 에러`);
      }
      return response.json();
    })
    .then((result) => {
      clearTimeout(timeout);
      if (onSuccess) {
        return onSuccess(result);
      }
      return;
    })
    .catch((error) => {
      clearTimeout(timeout);
      console.log("\n주소 : " + absoluteUrl);
      console.log("옵션 : POST");
      console.log(error.stack + "\n");
      if (onError) onError();
    });
};
