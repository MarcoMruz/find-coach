import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

const CoachesList = () => import('./pages/coaches/CoachesList.vue');
const CoachesDetail = () => import('./pages/coaches/CoachesDetail.vue');
const CoachesRegister = () => import('./pages/coaches/CoachesRegister.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');

const RequestsList = () => import('./pages/requests/RequestsList.vue');
const AuthForm = () => import('./pages/auth/AuthForm.vue');
const NotFound = () => import('./pages/NotFound.vue');

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
