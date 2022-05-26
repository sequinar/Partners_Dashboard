import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './assets/styles/element/index.scss'
import App from './App.vue'
import store from "./store/index"
import router from './router';

const app = createApp(App)

app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
