import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 개발 서버에서 API를 동일 출처로 프록시 — 백엔드 refreshToken 쿠키의
      // SameSite=None(+Secure) 요구를 크로스 사이트 취급 없이 우회하기 위함
      "/api": {
        target: "http://43.202.11.175:8080",
        changeOrigin: true,
      },
    },
  },
})
