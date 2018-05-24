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
  storageKey: 'feathers-jwt',
  storage: window.localStorage
}));

client.authenticate({
  strategy: 'local',
  email: 'asd@gmail.com',
  password: 'asd'
}).then(user => {
  console.log("Authenticated: ", user);
}).catch(err => {
  console.log("Authentication error:", err);
});

// Players
const playerService = client.service('/api/player');
playerService.on('created', (item) => {
  store.collections.players.data.push(item);
});

const locationService = client.service('/api/location');
locationService.on('created', (item) => {
  store.collections.locations.data.push(item);
});

const cardService = client.service('/api/card');
cardService.on('created', (item) => {
  store.collections.cards.data.push(item);
});

const lfgService = client.service('/api/lfg');
lfgService.on('created', (item) => {
  store.playerState.invites.push(item);
});

const services = {
  playerService,
  locationService,
  cardService,
  lfgService
}

export default {
  install: function (Vue, store) {
    Vue.mixin({
      beforeCreate: function () {
        Vue.util.defineReactive(this, '$store', store);
      },
      created: function () {
      },
      beforeDestroyed: function () {
      }
    })
    Vue.prototype.$client = client;
    Vue.prototype.$services = services;
  }
}
