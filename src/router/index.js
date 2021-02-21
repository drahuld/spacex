import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '@/components/Home.vue'),
  },
  {
    path: '/launches',
    name: 'Launches',
    component: () => import(/* webpackChunkName: "Launches" */ '@/components/launches/Launches.vue'),
  },
  {
    path: '/launchpads',
    name: 'LaunchPads',
    component: () => import(/* webpackChunkName: "LaunchPads" */ '@/components/launchpads/LaunchPads.vue'),
  },
  {
    path: '/rockets',
    name: 'Rockets',
    component: () => import(/* webpackChunkName: "rockets" */ '@/components/rockets/Rockets.vue'),
  },
  {
    path: '/ships',
    name: 'Ships',
    component: () => import(/* webpackChunkName: "ships" */ '@/components/ships/Ships.vue'),
  },
  {
    path: '/capsules',
    name: 'Capsules',
    component: () => import(/* webpackChunkName: "capsules" */ '@/components/capsules/Capsules.vue'),
  },
  {
    path: '/crews',
    name: 'Crews',
    component: () => import(/* webpackChunkName: "crews" */ '@/components/crews/Crews.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
