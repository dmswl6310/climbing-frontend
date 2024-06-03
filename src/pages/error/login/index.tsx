// nextauth 백단의 노드 에러를 출력하기 위한 페이지
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      setLoginError(router.query.stack as string);
    }
  }, [router]);

  return <>${loginError}</>;
}
