export const getCurrentPath = (): string => {
  return window.location.pathname;
};

export const navigateTo = (path: string): void => {
  if (getCurrentPath() === path) return;
  
  // History API의 pushState 사용
  window.history.pushState({}, '', path);
  
  // 커스텀 이벤트 발생시켜서 라우터에게 경로 변경 알림
  window.dispatchEvent(new PopStateEvent('popstate'));
};