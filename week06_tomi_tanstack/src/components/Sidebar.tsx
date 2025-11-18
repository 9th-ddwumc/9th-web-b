import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* 오버레이 (배경) */}
      <div
        className={`
          fixed inset-0 bg-black/40
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* 사이드바 */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-64 bg-white shadow-xl
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose} aria-label="닫기">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-3">
            <li className="text-gray-700 hover:text-indigo-600 cursor-pointer">
              Dashboard
            </li>
            <li className="text-gray-700 hover:text-indigo-600 cursor-pointer">
              Profile
            </li>
            <li className="text-gray-700 hover:text-indigo-600 cursor-pointer">
              Settings
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
