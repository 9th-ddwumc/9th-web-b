import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-60 h-[calc(100vh-64px)] bg-[#212121] text-white p-4 shadow-lg flex flex-col items-start">
      <button className="mb-4 hover:text-gray-500 hover:cursor-pointer">
        <img
          src="https://www.citypng.com/public/uploads/preview/white-search-icon-button-png-img-735811696240431a0p3ex0i2v.png"
          alt="검색"
          className="w-5 h-5 inline-block mr-2"
        />
        찾기
      </button>

      <button
        onClick={() => navigate("mypage")}
        className="mb-4 hover:text-gray-500 hover:cursor-pointer"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="검색"
          className="w-5 h-5 inline-block mr-2"
        />
        마이페이지
      </button>
    </div>
  );
};

export default Sidebar;