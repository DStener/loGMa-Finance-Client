import '../css/style.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import auth from './components/auth.vue';
import welcome from './components/welcome.vue';
import notfound from './components/notfound.vue';
import analytics from './components/analytics.vue';

const router = createRouter({
  mode: "history",
  routes: [
    { path: '/', component: welcome },
    { path: '/auth', component: auth},
    { path: '/:pathMatch(.*)*', component: notfound},
    { path: '/analytics', component: analytics},
  ],
  history: createWebHistory()
})


const app = createApp(App)
app.use(router)
app.mount('#app')

