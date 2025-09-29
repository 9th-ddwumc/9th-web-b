// src/router/Route.tsx
import React from "react";

export interface RouteProps {
  path: string;
  component: React.ComponentType<any>;
}

export const Route: React.FC<RouteProps> = ({ component: Component }) => {
  return <Component />;
};
