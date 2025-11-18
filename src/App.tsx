import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useSidebar } from './hooks/useSidebar';

function App() {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Hamburger Menu */}
      <Header onMenuClick={toggle} />

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={close} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Sidebar Demo
          </h2>
          <p className="text-gray-600 mb-4">
            Click the hamburger menu in the header to open the sidebar.
          </p>
          <p className="text-gray-600 mb-4">
            You can also press the <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">ESC</kbd> key to close the sidebar.
          </p>
          
          <div className="mt-8 space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">✅ Features Implemented</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Sidebar UI with smooth animations</li>
                <li>• useSidebar custom hook with open/close/toggle functions</li>
                <li>• ESC key to close sidebar</li>
                <li>• Overlay click to close sidebar</li>
                <li>• Tailwind CSS transition utilities</li>
                <li>• Proper event listener cleanup</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">🎨 Animations Used</h3>
              <ul className="text-green-800 space-y-1 text-sm">
                <li>• <code>transition-transform duration-300</code> - Sidebar slide animation</li>
                <li>• <code>transition-opacity duration-300</code> - Overlay fade animation</li>
                <li>• <code>transition-colors</code> - Button hover effects</li>
              </ul>
            </div>
          </div>
        </div>
      </main>


      {/* --- [수정된 부분] --- */}
      {/* 메인 콘텐츠 영역을 길게 만듭니다. */}
      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            환영합니다! 👋
          </h1>
          <p className="text-gray-600">
            왼쪽 상단의 햄버거 메뉴를 클릭해보세요!
          </p>
        </div>

        {/* 스크롤을 만들기 위해 100개의 더미 단락을 추가합니다.
          Array.from({ length: 100 })을 사용해 100개짜리 배열을 만듭니다.
        */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">
          <h2 className="text-xl font-bold">스크롤 테스트용 긴 콘텐츠</h2>
          {Array.from({ length: 100 }).map((_, index) => (
            <p key={index} className="text-gray-700 border-b pb-2">
              이것은 {index + 1}번째 단락입니다. 
              사이드바가 열렸을 때 이 배경이 스크롤되는지 확인하기 위한 
              더미 텍스트입니다. Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.
            </p>
          ))}
        </div>
      </main>
      {/* --- [수정 끝] --- */}


    </div>
  );
}

export default App;