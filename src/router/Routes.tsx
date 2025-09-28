import { useState, useEffect, Children, isValidElement } from 'react';
import type { RoutesProps, RouteProps } from './types';
import { getCurrentPath } from './utils';

export const Routes = ({ children }: RoutesProps) => {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    // 브라우저의 뒤로/앞으로 버튼 및 프로그래밍적 네비게이션 처리
    const handlePopState = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // children에서 Route 컴포넌트들을 찾아서 현재 경로에 맞는 컴포넌트 렌더링
  const routes = Children.toArray(children).filter(isValidElement);
  
  for (const route of routes) {
    const { path, component: Component } = route.props as RouteProps;
    if (path === currentPath) {
      return <Component />;
    }
  }

  // 매칭되는 라우트가 없으면 404 처리 또는 첫 번째 라우트의 컴포넌트 렌더링
  return <div>404 - 페이지를 찾을 수 없습니다</div>;
};