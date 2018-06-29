import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

const routerOptions = [
  { path: '*', component: 'NotFound', ame: 'NotFound' },
  { path: '/', component: 'Landing', name: 'StartPage' },
  { path: '/signin', component: 'SignIn', name: 'SignIn', meta: { backButton: true } },
  { path: '/signup', component: 'SignUp', name: 'SignUp', meta: { backButton: true } },
  { path: '/home', component: 'Home', name: 'Home', meta: { requiresAuth: true, backButton: true } },
];

const routes = routerOptions.map((route) => {
  const routeComponentPath = {
    ...route,
    component: () => import(`@/components/${route.component}.vue`),
  };
  return routeComponentPath;
});

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAutenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAutenticated) {
    next('/signin');
  } else {
    next();
  }
});

export default router;
