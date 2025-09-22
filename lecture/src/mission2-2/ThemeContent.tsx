import React from "react";
import ThemeToggleButton from "./context/ThemeToggleButton";
import clsx from "clsx";
import { useTheme } from "./context/ThemeProvider";

export default function ThemeContent() {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === "LIGHT";

  return <div className={clsx("p-4 h-dvh w-full flex justify-end", isLightMode ? "bg-white" : "bg-gray-800")}>context</div>;
}
