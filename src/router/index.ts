import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/picker',
      name: 'picker',
      component: () => import('../views/PickerView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
      children: [
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import('../components/FavoritesCalendar.vue')
        },
        {
          path: ':season',
          name: 'fullCalendar',
          component: () => import('../components/FullCalendar.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
