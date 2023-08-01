import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

/* Layout */
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
//   scrollBehavior: () => ({ y: 0 })
})

export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHistory(),
    routes,
    // scrollBehavior: () => ({ y: 0 })
  })
//   router.matcher = newRouter.matcher // reset router
}
export function setupRouter(app: App) {
  app.use(router);
  console.log("2.routerHasBeenSetted");
}
export default router