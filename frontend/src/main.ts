import { createApp, markRaw } from 'vue'
import i18n from './i18n'
import { createVuestic } from 'vuestic-ui'
import { createGtm } from '@gtm-support/vue-gtm'
import { createPinia } from 'pinia'
import { useAuth } from './stores/auth.js'

import stores from './stores'
import router from './router'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import App from './App.vue'

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

const app = createApp(App)

app.use(pinia)
app.use(stores)
app.use(router)
app.use(i18n)
app.use(createVuestic({ config: vuesticGlobalConfig }))

if (import.meta.env.VITE_APP_GTM_ENABLED) {
  app.use(
    createGtm({
      id: import.meta.env.VITE_APP_GTM_KEY,
      debug: false,
      vueRouter: router,
    }),
  )
}

if (localStorage.getItem('token')) {
  ;(async () => {
    const auth = useAuth()
    try {
      auth.setIsAuth(true)
    } catch (error) {
      auth.clear()
    }
  })()
}

app.mount('#app')
