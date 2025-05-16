import '../css/style.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import auth from './components/auth.vue';
import welcome from './components/welcome.vue';
import notfound from './components/notfound.vue';
import analytics from './components/analytics.vue';
import profile from './view/profile.vue';
import wall from './view/wall.vue'
import history from './components/history.vue';
import groupwall from './view/groupwall.vue';
import historyGroup from './components/history-group.vue';
import mwinLS from './components/mwinLS.vue';
import mwinMS from './components/mwinMS.vue';


const router = createRouter({
  mode: "history",
  routes: [
    { path: '/', component: welcome },
    { path: '/auth', component: auth },
    { path: '/me', component: profile },
    { path: '/my', component: wall },
    { path: '/wall/:pathMatch(.*)*', component: wall },
    { path: '/:pathMatch(.*)*', component: notfound },
    { path: '/analytics', component: analytics },
    { path: '/history', component: history },
    { path: '/group', component: groupwall },
    { path: '/stats', component: analytics },
    { path: '/history-group', component: historyGroup },
    { path: '/ls', component: mwinLS },
    { path: '/ms', component: mwinMS },

  ],
  history: createWebHistory()
})


const app = createApp(App)
app.use(router)
app.mount('#app')

