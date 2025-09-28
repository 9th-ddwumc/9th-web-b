import type { RouteProps } from './types';

export const Route = ({ path, component: Component }: RouteProps) => {
  // Route 컴포넌트는 실제로는 Routes에서 사용되므로 여기서는 단순히 props를 반환
  // 실제 렌더링은 Routes 컴포넌트에서 처리
  return null;
};