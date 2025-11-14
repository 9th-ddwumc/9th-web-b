import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/key";

const GooleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEYS.ACCESS_TOKEN
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEYS.REFRESH_TOKEN
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = "/my";
    }
    console.log(urlParams.get("name"));
  }, [setAccessToken, setRefreshToken]);

  return <></>;
};
export default GooleLoginRedirectPage;
