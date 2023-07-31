import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { setupStore } from '@/store'

async function appInit() {
    const app = createApp(App)
  
    // // 注册全局自定义组件
    // setupCustomComponents(app)
  
    app.use(ElementPlus)

    // 挂载状态管理
    setupStore(app)
  
    // 挂载路由
    setupRouter(app)
  
    // 路由准备就绪后挂载APP实例
    await router.isReady()
  
    // // 语言注册
    // app.use(i18n)
  
    // 挂载到页面
    app.mount('#app', true)
  
    // 挂载到 window
    window['$vue'] = app
  }
  
  appInit().then(() => {
    //
  })
