import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";
import type { ReactElement } from "react";

export default function ThemeContent(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-2xl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        Theme Content
      </h1>
      <p className={clsx("mt-4", isLightMode ? "text-black" : "text-white")}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores placeat
        magnam voluptatem fuga saepe quaerat obcaecati, at minus perspiciatis
        error sint iste quos quae laboriosam recusandae esse provident.
      </p>
    </div>
  );
}
