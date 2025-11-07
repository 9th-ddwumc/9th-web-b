import { useState } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";

interface UserData {
  id: number;
  name: string;
  email: string;
}

// ✅ export 키워드 추가!
export const UserDataDisplay = () => {
  const [userId, setUserId] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleChangeUser = () => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    setUserId(randomId);
  };

  const handleTestRetry = () => {
    setUserId(999999);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={handleChangeUser}>다른 사용자 불러오기</button>
        <button onClick={() => setIsVisible(!isVisible)}>
          컴포넌트 토글 (언마운트 테스트)
        </button>
        <button
          onClick={handleTestRetry}
          style={{ background: "#ff9800", color: "white" }}
        >
          재시도 테스트 (404 에러)
        </button>
      </div>
      {isVisible && <UserDisplay userId={userId} />}
    </div>
  );
};

// 내부 컴포넌트 (export 안 함)
const UserDisplay = ({ userId }: { userId: number }) => {
  const { data, isPending, isError } = useCustomFetch<UserData>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (isPending) return <div>Loading... (User ID: {userId})</div>;
  if (isError) return <div>Error Occurred</div>;

  return (
    <div
      style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}
    >
      <h2>{data?.name}</h2>
      <p>{data?.email}</p>
      <p style={{ fontSize: "12px", color: "#666" }}>User ID: {data?.id}</p>
    </div>
  );
};