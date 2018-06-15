import io from "socket.io-client";
import feathers from "@feathersjs/client";

import store from "./store";

const socket = io();

const client = feathers();
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({
  header: 'Authorization',
  path: '/authentication',
  jwtStrategy: 'jwt',
  entity: 'player',
  service: 'api/player',
  storageKey: 'jwt',
  storage: window.localStorage
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
lfgService.on('created', (item) => {
    const invite = store.playerState.lfgs.find(i => i.id_lfg === item.id_lfg);
    if (!invite) {
      store.playerState.lfgs.push(item);
    }
});

lfgService.on('patched', (item) => {
  const group = store.playerState.lfgs.find(i => i.id_lfg === item.id_lfg);
  if (group) {
    Object.assign(group, item);
  }
  console.log('invite accepted:', item);
});

const services = {
  playerService,
  locationService,
  discoveredService,
  cardService,
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
    Vue.prototype.$client = client;
    Vue.prototype.$services = services;
  }
}
