import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import type { ResponseMyInfoDto } from "../types/auth.ts";

export const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
        const response = await getMyInfo();
        console.log(response);

        setData(response);
    };

    getData();
  }, []);

  if (!data) return <div className='text-white'>로딩 중...</div>;

  return <div className='text-white'>{data.data.name} 님 반갑습니다.</div>;
};

export default MyPage;