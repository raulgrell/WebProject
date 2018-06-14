<template>
  <div id="app">
    <PageNav></PageNav>
    <hr>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">custom header</h3>
    </modal>
  </div>
</template>

<script>

import axios from 'axios';
import store from './store';

function populatestore() {
  axios.get('/player').then(response => {
    this.$set(store, 'player', response.data)
    axios.get('/api/card').then(response => this.$set(store.collections, 'cards', response));
    axios.get('/api/location').then(response => this.$set(store.collections, 'locations', response));
    axios.get('/api/event').then(response => this.$set(store.collections, 'events', response));
    axios.get('/api/player').then(response => this.$set(store.collections, 'players', response));
    axios.get('/api/lfg').then(response => this.$set(store.playerState, 'invites', response.data));
    axios.get('/player/friends/').then(response => this.$set(store.playerState, 'friends', response.data));
    axios.get('/player/deck/').then(response => this.$set(store.playerState, 'deck', response.data));
    axios.get('/player/locations/').then(response => this.$set(store.playerState, 'locations', response.data));
    axios.get('/player/history/').then(response => this.$set(store.playerState, 'history', response.data));
    axios.get('/player/played/').then(response => this.$set(store.playerState, 'played', response.data));
    axios.get('/player/hand/').then(response => this.$set(store.playerState, 'hand', response.data));
    axios.get('/player/favourites/').then(response => this.$set(store.playerState, 'favourites', response.data));
  })
};

import PageNav from './components/PageNav.vue'

export default {
  name: "App",
  data: function() {
    return {
      showModal: false
    }
  },
  components: {
    PageNav
  },
  created: populatestore
};

</script>

<style>
#app {
  font-size: 0.8em;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 2em;
}

/* Transitions */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
