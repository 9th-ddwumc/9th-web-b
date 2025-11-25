import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(), // ✅ Vite 플러그인은 여기 위치!
    react({
      babel: {
        plugins: [
          "babel-plugin-react-compiler", // 문자열로만 넣어야 함
        ],
      },
    }),
  ],
});
