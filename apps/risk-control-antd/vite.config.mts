import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
          '/rg_api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/rg_api/, ''),
            // mock代理目标地址
            target: 'http://lw-local-ugc-gm.rivergame.net:8080',
            ws: true,
          },
        },
      },
    },
  };
});
