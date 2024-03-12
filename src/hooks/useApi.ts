import { useEffect, useState } from 'react';

const useApi = (api: string) => {
  // API 로딩 관련 상태
  const [isLoading, setIsLoading] = useState(true);

  // API를 동적으로 로딩 및 적용
  useEffect(() => {
    const script = document.querySelector(
      `script[src='${api}']`,
    ) as HTMLScriptElement;

    if (script) {
      setIsLoading(false);
      return;
    }

    const newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = api;
    document.head.appendChild(newScript);
    newScript.onload = handleLoader;
  }, [api]);

  // API 로딩 상태 핸들러
  const handleLoader = () => {
    setIsLoading(false);
  };

  return { isLoading };
};

export default useApi;
