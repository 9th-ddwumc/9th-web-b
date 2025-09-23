import clsx from "clsx";
import { THEME, useTheme } from "./ThemeProvider.tsx";

export default function ThemeContent() {
      const {theme, toggleTheme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;
  return (
    <div className={clsx(
        'p-4 h-dvh w-full', 
        isLightMode ? "bg-white" : "bg-gray-800"
    )}
    >
        <h1 className={clsx(
        'text-wxl font-bold', 
        isLightMode ? "text-black" : "text-white"
    )}
        >
            Theme Contnent
        </h1>
        <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores placeat dolorum magnam magni facere vel sequi itaque obcaecati, at, minus perspiciatis error sint iste quas quam lavoriosam recusandae esse provident. 
        </p>
        </div>
  );
}