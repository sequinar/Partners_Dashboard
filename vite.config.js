import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [vue(),EnvironmentPlugin(['VUE_APP_AUTH0_DOMAIN', 'VUE_APP_AUTH0_CLIENT_KEY', 'VUE_APP_AUTH0_AUDIENCE', 'API_ENDPOINT', 'UEAPP_DOWNLOAD_LINK']),]
})
