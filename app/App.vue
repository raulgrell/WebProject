<template>
    <div id="app">
        <PageNav></PageNav>
        <hr>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
    </div>
</template>

<script>

import axios from 'axios';
import store from './store';

function populatestore() {
  axios.get('/api/card').then(response => {
    store.collections.cards = Object.assign({}, response.data);
  });

  axios.get('/api/location').then(response => {
    store.collections.locations = Object.assign({}, response.data);
  });

  axios.get('/api/event').then(response => {
    store.collections.events = Object.assign({}, response.data);
  });

  axios.get('/api/player').then(response => {
    store.collections.players = Object.assign({}, response.data);
  });

  axios.get("/friends/" + store.player.id_player).then(response => {
    store.collections.friendships = response;
  });
  
  axios.get('/api/lfg').then(response => {
    store.playerState.invites = response.data;
  });

  axios.get("/player/deck/" + store.player.id_player).then(response => {
    store.playerState.deck = response.data;
  });

  axios.get("/player/locations/" + store.player.id_player).then(response => {
    store.playerState.locations = response.data;
  });

  axios.get("/player/history/" + store.player.id_player).then(response => {
    store.playerState.history = response.data;
  });

  axios.get("/player/hand/" + store.player.id_player).then(response => {
    store.playerState.hand = response.data;
  });

  axios.get("/player/favourites/" + store.player.id_player).then(response => {
    store.playerState.favourites = response.data;
  });
}

import PageNav from './components/PageNav.vue'

export default {
  name: "App",
  components: {
    PageNav
  },
  mounted: function() {
    populatestore();
  }
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
