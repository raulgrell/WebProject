import Vue from 'vue';
import Router from 'vue-router';

import HandPage from './components/HandPage';
import DeckPage from './components/DeckPage';
import LocationsPage from './components/LocationPage';
import FriendsPage from './components/FriendsPage';
import AdminPage from './components/AdminPage';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/app',
  routes: [
    {
      path: '/',
      name: 'hand',
      component: HandPage
    },
    {
      path: '/deck',
      name: 'deck',
      component: DeckPage
    },
    {
      path: '/locations',
      name: 'locations',
      component: LocationsPage
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  next();
})

export default router;