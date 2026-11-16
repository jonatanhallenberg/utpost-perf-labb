import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuidesView from '../views/GuidesView.vue'
import GuideDetailView from '../views/GuideDetailView.vue'
import ToursView from '../views/ToursView.vue'
import TourDetailView from '../views/TourDetailView.vue'
import PhotoUploadView from '../views/PhotoUploadView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/guider', name: 'guides', component: GuidesView },
    { path: '/guider/:slug', name: 'guide', component: GuideDetailView },
    { path: '/turer', name: 'tours', component: ToursView },
    { path: '/turer/:id', name: 'tour', component: TourDetailView },
    {
      path: '/turer/:id/bild',
      name: 'upload',
      component: PhotoUploadView,
      meta: { requiresAuth: true }, // M8: skyddad route – se guarden nedan
    },
    { path: '/logga-in', name: 'login', component: LoginView },
  ],
})

// M8: route guard. Det här är UX – utloggade slipper se en vy som ändå inte fungerar – inte
// säkerhet. Skyddet är API:ets 401: den som kringgår guarden får ändå ingen data.
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !useAuthStore().isLoggedIn) {
    return { name: 'login', query: { till: to.fullPath } }
  }
})

export default router
