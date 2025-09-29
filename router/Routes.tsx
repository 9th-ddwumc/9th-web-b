import React, { Children, cloneElement, useMemo } from "react";
import type { ReactElement } from "react";   // ✅ 타입은 type import
import { useCurrentPath } from "./useCurrentPath";
import type { RouteProps } from "./Route";   // ✅ 타입은 type import

interface RoutesProps {
  children: React.ReactNode;
}

export const Routes: React.FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children) as ReactElement<RouteProps>[];
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;

  return cloneElement(activeRoute);
};
