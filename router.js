import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomeView.vue';
import ShopDetail from './views/ShopDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop/:id',
    name: 'ShopDetail',
    component: ShopDetail
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
