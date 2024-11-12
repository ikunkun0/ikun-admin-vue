import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import '@/styles/index.scss'

const app = createApp(App)

async function setupApp() {
  // 初始化store
  setupStore(app)
  // 初始化路由
  await setupRouter(app)
  app.mount('#app')
}

setupApp()
