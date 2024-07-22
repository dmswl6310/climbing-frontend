import { SERVER_ADDRESS } from "@/constants/constants";
import { requestData } from "@/service/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

// api 테스트를 위한 컴포넌트
// 전체페이지에서 't' 클릭시 작동
const Test = () => {
  const { data: session, status } = useSession();
  // 테스트할 함수
  const testFunc = () => {
    alert("테스트 키 입력됨");

    console.log(status);
    console.log(session);
  };

  const keyDown = (event: { key: string; preventDefault: () => void }) => {
    // if (event.key === "t") {
    //   event.preventDefault();
    //   testFunc();
    // }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  });

  // 필요시 사용
  return <></>;
};

const S = {};

export default Test;
