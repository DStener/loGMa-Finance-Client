import '../css/style.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import auth from './components/auth.vue';
import welcome from './components/welcome.vue';


const router = createRouter({
  routes: [{
    path: '/',
    component: welcome
  },
  {
    path: '/auth',
    component: auth
  },],
  history: createWebHistory()
})


const app = createApp(App)
app.use(router)
app.mount('#app')

