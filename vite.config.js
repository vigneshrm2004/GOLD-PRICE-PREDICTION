import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// vite.config.js
export default {
  server: {
    host: '0.0.0.0', // Expose to all network interfaces
    port: 5173,       // Ensure it's on port 5173
  },
};
