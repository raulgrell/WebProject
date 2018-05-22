import Vue from 'vue';
import Router from 'vue-router';

import HandPage from './components/HandPage';
import DeckPage from './components/DeckPage';
import LocationsPage from './components/LocationPage';
import FriendsPage from './components/FriendsPage';
import AdminPage from './components/AdminPage';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hand',
      component: HandPage
    },
    {
      path: '/deck-page',
      name: 'Deck',
      component: DeckPage
    },
    {
      path: '/location-page',
      name: 'Locations',
      component: LocationsPage
    },
    {
      path: '/friend-page',
      name: 'Friends',
      component: FriendsPage
    },
    {
      path: '/admin-page',
      name: 'Admin',
      component: AdminPage
    }
  ]
})
