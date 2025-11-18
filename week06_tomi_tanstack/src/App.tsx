import { Menu } from "lucide-react";
import { useSidebar } from "./hooks/useSidebar";
import { Sidebar } from "./components/Sidebar";

export default function App()  {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              aria-label="메뉴 열기"
            >
              <Menu size={24} className="text-gray-700" />
            </button>

            <h1 className="text-2xl font-bold text-gray-800">
              React Sidebar
            </h1>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isOpen} onClose={close} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            환영합니다 👋
          </h2>
          <p className="text-gray-600">
            왼쪽 상단의 메뉴 버튼을 눌러보세요!
          </p>
        </div>
      </main>
    </div>
  );
}
