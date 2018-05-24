const socket = io();

const client = feathers();
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({
  header: 'Authorization',
  path: '/authentication',
  jwtStrategy: 'jwt',
  entity: 'player',
  service: 'api/players',
  storageKey: 'feathers-jwt',
  storage: window.localStorage
}));

client.authenticate({
  strategy: 'local',
  email: window.localStorage.getItem("email"),
  password: window.localStorage.getItem("password")
}).then(user => {
  console.log("Authenticated: ", user);
}).catch(err => {
  console.log("Authentication error:", err);
});

// Players
const playerService = client.service('/api/player');
playerService.on('created', (item) => {
  appData.collections.players.data.push(item);
});

const locationService = client.service('/api/location');
locationService.on('created', (item) => {
  appData.collections.locations.data.push(item);
});

const cardService = client.service('/api/card');
cardService.on('created', (item) => {
  appData.collections.cards.data.push(item);
});

const lfgService = client.service('/api/lfg');
lfgService.on('created', (item) => {
  appData.playerState.invites.push(item);
});

const friendshipService = client.service('/api/friendship');
const discoveredService = client.service('/api/discovered');
const groupService = client.service('/api/group');

export default {
  socket,
  client,
}
