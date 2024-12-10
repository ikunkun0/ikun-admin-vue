import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
import '@/styles/index.less'
import 'uno.css'

const app = createApp(App)
console.log("test3")
console.log("test3")
console.log("test3")
console.log("-test3-")
async function setupApp() {
  // 初始化store
  setupStore(app)
  // 初始化路由
  await setupRouter(app)
  app.mount('#app')
}

setupApp()
console.log("test3")
