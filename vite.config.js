import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path"; // 引入path模块

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      global: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 添加路径别名配置
    },
  },
  define: {
    "process.env": {},
  },
  base: "./",
});
