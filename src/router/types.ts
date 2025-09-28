import type { ReactNode } from 'react';

export interface LinkProps {
  to: string;
  children: ReactNode;
}

export interface RouteProps {
  path: string;
  component: React.ComponentType;
}

export interface RoutesProps {
  children: ReactNode;
}