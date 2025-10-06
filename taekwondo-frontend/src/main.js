import './style.css'
import './assets/main.css'
import './assets/taekwondo-theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
