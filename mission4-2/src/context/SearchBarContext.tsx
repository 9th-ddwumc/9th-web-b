import { createContext, useContext, useState } from "react";

interface SearchBarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SearchBarContext = createContext<SearchBarContextType | null>(null);

export const SearchBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <SearchBarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SearchBarContext.Provider>;
};

export const useSearchBar = () => {
  const ctx = useContext(SearchBarContext);
  if (!ctx) throw new Error("useSearchBar must be used within SearchBarProvider");
  return ctx;
};
