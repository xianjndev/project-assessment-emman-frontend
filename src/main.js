import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/input.css'
import swalPlugin from '@/plugins/swal'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(swalPlugin)
app.mount('#app')
