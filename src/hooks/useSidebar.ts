import { useState, useEffect, useCallback } from 'react';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Sidebar 열기
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Sidebar 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Sidebar 토글
  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // ESC 키로 Sidebar 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        close();
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);

    // 클린업 함수: 메모리 누수 방지
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  
  // --- [수정/추가된 부분] ---
  // 배경 스크롤 방지 로직
  useEffect(() => {
    // isOpen 상태가 true일 때
    if (isOpen) {
      // body의 스크롤을 막습니다.
      document.body.style.overflow = 'hidden';
    } else {
      // body의 스크롤을 다시 허용합니다.
      document.body.style.overflow = 'unset';
    }

    // 클린업 함수:
    // 컴포넌트가 사라지거나, useEffect가 다시 실행되기 직전에 호출됩니다.
    // 어떤 상황에서든 스크롤을 다시 풀어주기 위해 필요합니다.
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]); // isOpen 상태가 변경될 때마다 이 effect가 실행됩니다.
  // --- [수정 끝] ---


  return {
    isOpen,
    open,
    close,
    toggle,
  };
};