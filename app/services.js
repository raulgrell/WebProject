import io from "socket.io-client";
import axios from "axios";
import feathers from "@feathersjs/client";

import { CookieStorage } from 'cookie-storage';
const cookieStorage = new CookieStorage();

import store from "./store";

const socket = io();

const client = feathers();
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({
  header: 'Authorization',
  path: '/authentication',
  jwtStrategy: 'jwt',
  entity: 'player',
  service: '/api/player',
  storageKey: 'accessToken',
  storage: cookieStorage
}));

client.authenticate().then(user => {
  console.log("Authenticated: ", user);
}).catch(err => {
  console.log("Authentication error:", err);
});

// Collections
const playerService = client.service('/api/player');
const locationService = client.service('/api/location');
const cardService = client.service('/api/card');
const eventService = client.service('/api/event');
const groupService = client.service('/api/group');

// Player

const discoveredService = client.service('/api/discovered');
discoveredService.on('created', (item) => {
  store.playerState.locations.push(item);
});

const encounterService = client.service('/api/encounter');
encounterService.on('created', (item) => {
  store.playerState.encounters.data.push(item);
});

const lfgService = client.service('/api/lfg');

const services = {
  playerService,
  locationService,
  discoveredService,
  cardService,
  groupService,
  eventService,
  lfgService
}

export default {
  install: function (Vue, store) {
    Vue.mixin({
      beforeCreate: function () {
        Vue.util.defineReactive(this, '$store', store);
      },
      created: function () {
        if (!this.$options || !this.$options.feathers) return;
        // Add Listeners
        Object.keys(this.$options.feathers).forEach(serviceKey => {
          const service = this.$options.feathers[serviceKey];
          Object.keys(service).forEach(handlerKey => {
            client.service(serviceKey).on(handlerKey, service[handlerKey].bind(this));
          })
        })
      },
      beforeDestroy: function () {
        if (!this.$options || !this.$options.feathers) return;
        // Remove Listeners
        Object.keys(this.$options.feathers).forEach(serviceKey => {
          const service = this.$options.feathers[serviceKey];
          Object.keys(service).forEach(handlerKey => {
            client.service(serviceKey).removeListener(handlerKey, service[handlerKey].bind(this))
          });
        });
      }
    });
    Vue.prototype.$axios = axios;
    Vue.prototype.$client = client;
    Vue.prototype.$services = services;
    Vue.prototype.$alertLog = function (error) {
      console.log('Error: ', ...arguments);
      alert(error.message);
    }
  }
}
