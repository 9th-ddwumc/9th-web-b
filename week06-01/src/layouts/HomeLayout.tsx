import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col bg-black relative">
      <Navbar />
      <div className="flex flex-row flex-1">
        <Sidebar />
        <main className="flex-1 mt-10 relative">
          <Outlet />
          <Link
            to={"/my"}
            className="fixed bottom-10 right-10 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-2xl"
          >
            +
          </Link>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
