import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://TeasSty.github.io/algrand72/
export default defineConfig({
  plugins: [react()],
  base: '/algrand72/',
})
