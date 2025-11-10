import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  useEffect(() => {
    console.log("✅ GoogleRedirect 실행됨!");

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      setAccessToken(accessToken);
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }
      // 2초 뒤에 /mypage 이동
      setTimeout(() => {
        window.location.href = "/mypage";
      }, 2000);
    }
  }, [setAccessToken, setRefreshToken]);

  return <div></div>;
};

export default GoogleLoginRedirectPage;