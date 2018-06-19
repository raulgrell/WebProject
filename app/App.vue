<template>
  <div id="app">
    <PageNav></PageNav>
    <hr>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
      <modal>
        <h3 slot="header"></h3>
      </modal>
  </div>
</template>

<script>

import Vue from 'vue';
import axios from 'axios';
import store from './store';

import PageNav from './components/ui/PageNav.vue';
import Modal from './components/ui/Modal.vue';

function populatestore() {
  axios.get('/player').then(response => {
    this.$set(store, 'player', response.data)
    axios.get('/api/card').then(response => this.$set(store.collections, 'cards', response));
    axios.get('/api/location').then(response => this.$set(store.collections, 'locations', response));
    axios.get('/api/event').then(response => this.$set(store.collections, 'events', response));
    axios.get('/api/player').then(response => this.$set(store.collections, 'players', response));
    axios.get('/api/lfg').then(response => this.$set(store.playerState, 'lfgs', response.data));
    axios.get('/player/friends/').then(response => this.$set(store.playerState, 'friends', response.data));
    axios.get('/player/deck/').then(response => this.$set(store.playerState, 'deck', response.data));
    axios.get('/player/locations/').then(response => this.$set(store.playerState, 'locations', response.data));
    axios.get('/player/history/').then(response => this.$set(store.playerState, 'history', response.data));
    axios.get('/player/played/').then(response => this.$set(store.playerState, 'played', response.data));
    axios.get('/player/hand/').then(response => this.$set(store.playerState, 'hand', response.data));
    axios.get('/player/favourites/').then(response => this.$set(store.playerState, 'favourites', response.data));
    this.$services.lfgService.get(response.data.id_player).then(response => {
      console.log(response);
      return this.$set(store.playerState, 'group', response)
    });
  })
};

export default {
  name: "App",
  components: {
    Modal
  },
  feathers: {
    "/api/lfg/": {
      created: function (item) {
        const invite = this.playerState.lfgs.find(i => i.id_lfg === item.id_lfg);
        if (!invite) {
          this.playerState.lfgs.push(item);
        }
      },
      patched: function (item) {
        debugger;
        if (this.player.group && this.player.group.id_lfg == item.id_lfg) {
          this.player.group = item;
        }
        console.log('invite accepted:', item);
      }
    }
  },
  data: function () {
    return store;
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
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
