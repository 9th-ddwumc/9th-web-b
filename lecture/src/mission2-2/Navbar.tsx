import React, { useContext } from "react";
import { ThemeContext, useTheme } from "./context/ThemeProvider";
import ThemeToggleButton from "./context/ThemeToggleButton";
import clsx from "clsx";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === "LIGHT";

  console.log("Nav context:", theme);
  return (
    <div className={clsx("p-4 w-full flex justify-end", isLightMode ? "bg-white" : "bg-gray-800")}>
      <ThemeToggleButton></ThemeToggleButton>
    </div>
  );
}
