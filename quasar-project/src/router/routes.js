
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/register.vue') },
      { path: 'login', component: () => import('pages/login.vue') },
      { path: '/dashboard', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
