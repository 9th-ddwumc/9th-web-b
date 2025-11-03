import { useEffect } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
  const { data, isPending, isError } = useGetLpList({});
  useEffect(() => {
    console.log("LP 응답 데이터:", data);
  }, [data]);
  if (isPending) {
    return <div className="mt-20 text-gray-400 text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20 text-red-400 text-center">Error</div>;
  }

  // LP 데이터
  const lpList = data?.data.data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">LP 목록</h1>

      {/* ✅ 그리드 레이아웃 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <img
          src={"/images/default-thumbnail.jpg"}
          className="w-full h-full object-cover"
        />
        <img
          src={"/images/default-thumbnail.jpg"}
          className="w-full h-full object-cover"
        />
        <img
          src={"/images/default-thumbnail.jpg"}
          className="w-full h-full object-cover"
        />
        <img
          src={"/images/default-thumbnail.jpg"}
          className="w-full h-full object-cover"
        />
        <img
          src={"/images/default-thumbnail.jpg"}
          className="w-full h-full object-cover"
        />
        <img
          src={"/images/default-thumbnail.jpg"}
          className="w-full h-full object-cover"
        />
        <img
          src={"/images/default-thumbnail.jpg"}
          className="w-full h-full object-cover"
        />
        <img
          src={"/images/default-thumbnail.jpg"}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HomePage;
