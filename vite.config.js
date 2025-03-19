import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  root: './src/renderer', // 设置渲染进程为根目录
  base: './',
  build: {
    outDir: '../../dist', // 编译输出到 dist 目录
  },
});