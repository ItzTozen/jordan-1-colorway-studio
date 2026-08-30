import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// port 5174 تا با پروژهٔ اصلی (5173) تداخل نکند و هر دو هم‌زمان بالا باشند
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5174 },
})
