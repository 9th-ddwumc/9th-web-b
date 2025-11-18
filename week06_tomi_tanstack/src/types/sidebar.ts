import type { LucideIcon } from "lucide-react";


export interface UseSidebarReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}