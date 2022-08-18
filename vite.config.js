import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EnvironmentPlugin from 'vite-plugin-environment'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'esnext'
  },
  plugins: [vue(), EnvironmentPlugin([
    'VUE_APP_AUTH0_DOMAIN',
    'VUE_APP_AUTH0_CLIENT_KEY',
    'VUE_APP_AUTH0_AUDIENCE',
    'API_ENDPOINT',
    'UEAPP_DOWNLOAD_LINK_MAC',
    'UEAPP_DOWNLOAD_LINK_WINDOWS',
    'CAMELOT_UEAPP_DOWNLOAD_LINK_MAC',
    'CAMELOT_UEAPP_DOWNLOAD_LINK_WINDOWS'])]
})
