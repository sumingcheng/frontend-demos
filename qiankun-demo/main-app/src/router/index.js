import {createRouter, createWebHistory} from 'vue-router'
import {loadMicroApp, start, registerMicroApps} from 'qiankun'
import microApps from './microApps'

const routes = [
  {path: '/', component: () => import('@/view/index.vue')},
  {path: '/vue2', component: () => import('@/view/vue2App.vue')},
  {path: '/jq', component: () => import('@/view/jqApp.vue')}
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

let microAppRef = null

router.beforeEach((to, from, next) => {
  const matchedApp = microApps.find(app => to.path.startsWith(app.routePath))

  if (matchedApp && !microAppRef) {
    microAppRef = loadMicroApp(matchedApp)
  } else if (!matchedApp && microAppRef) {
    microAppRef.unmount()
    microAppRef = null
  }

  next()
})

registerMicroApps(microApps.map(app => {
  return {
    name: app.name,
    entry: app.entry,
    container: app.container,
    activeRule: () => false
  }
}))

start()

export default router
