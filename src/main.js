import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './assets/styles/element/index.scss'
import App from './App.vue'
import store from './store/index'
import router from './router'
import auth0 from 'auth0-js'

const app = createApp(App)

const auth = new auth0.WebAuth({
  clientID: process.env.VUE_APP_AUTH0_CLIENT_KEY,
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  redirectUri: window.location.origin,
  responseType: 'token'
})

app.provide('Auth', auth)

app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
