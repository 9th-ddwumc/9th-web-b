import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import type { RequestSigninDto, UserInfo } from "../types/auth.dto";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/key";
import { postSignin, postLogout } from "../apis/auth";
import axiosInstance from "../apis/axios";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessToken,
    setItem: setAccessToken,
    removeItem: removeAccessToken,
  } = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  const [accessToken, setAccessTokenState] = useState<string | null>(
    getAccessToken()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUserState] = useState<UserInfo | null>(null);

  /** ✅ Context 외부에서도 setUser가 쓸 수 있도록 래핑 */
  const setUser = (newUser: UserInfo | null) => {
    // 객체 복사해서 참조 깨기 — React가 확실히 리렌더하도록
    setUserState(newUser ? { ...newUser } : null);
  };

  /** ✅ 로그인 */
  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);
      if (data) {
        const { accessToken: newAT, refreshToken: newRT } = data;

        setAccessToken(newAT);
        setAccessTokenState(newAT);
        setRefreshToken(newRT);

        // 로그인 직후 사용자 정보 불러오기
        const me = await axiosInstance.get("/v1/users/me", {
          headers: { Authorization: `Bearer ${newAT}` },
        });
        if (me.data?.data) setUser({ ...me.data.data });

        alert("로그인 성공 🎉");
        window.location.href = "/my";
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 실패 ❌");
    }
  };

  /** ✅ accessToken 있을 때 자동 로그인 유지 */
  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      try {
        const me = await axiosInstance.get("/v1/users/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (me.data?.data) setUser({ ...me.data.data });
      } catch (error) {
        console.error("자동 로그인 실패:", error);
        removeAccessToken();
        setAccessTokenState(null);
      }
    })();
  }, [accessToken]);

  /** ✅ 로그아웃 */
  const logout = async () => {
    try {
      await postLogout();
    } finally {
      removeAccessToken();
      setAccessTokenState(null);
      setUser(null);
      alert("로그아웃 완료 👋");
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      key={
        user
          ? `${user.id}-${user.name}-${user.updatedAt ?? Date.now()}`
          : "no-user"
      }
      value={{
        accessToken,
        refreshToken,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext를 찾을 수 없습니다.");
  return ctx;
};
