import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { UserInfo } from "../types/auth.dto";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        //응답 데이터에서 실제 유저 정보 추출
        setUserInfo(response.data);
      } catch (error) {
        console.log("내 정보 조회 실패: ", error);
      }
    };
    getData();
  }, []);

  return <div>MyPage</div>;
};

export default MyPage;
