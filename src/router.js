import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

import CoachesDetail from './pages/coaches/CoachesDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachesRegister from './pages/coaches/CoachesRegister.vue';

import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsList from './pages/requests/RequestsList.vue';

import AuthForm from './pages/auth/AuthForm.vue';

import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachesDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      component: CoachesRegister,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/requests',
      component: RequestsList,
      meta: {
        requiresAuth: true
      }
    },
    { path: '/:notFound(.*)', component: NotFound },
    {
      path: '/auth',
      component: AuthForm,
      meta: {
        requiresUnauth: true
      }
    }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) next('/auth');
  else if (to.meta.requiresUnauth && store.getters.isAuthenticated)
    next('/coaches');
  else next();
});

export default router;
