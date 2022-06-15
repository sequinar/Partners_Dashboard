import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './assets/styles/element/index.scss'
import App from './App.vue'
import store from "./store/index"
import router from './router';
import Auth0 from './auth0';

const app = createApp(App)

const AuthPlugin = await Auth0.init({
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
  clientId: process.env.VUE_APP_AUTH0_CLIENT_KEY,
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  redirectUri: window.location.origin,
});
app.use(AuthPlugin)
app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
