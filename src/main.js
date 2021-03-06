import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.css"
import "./assets/css/styles.css"
import { BootstrapIconsPlugin } from "bootstrap-icons-vue"


createApp(App).use(BootstrapIconsPlugin).use(store).use(router).mount('#app')
