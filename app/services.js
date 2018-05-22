var socket = io();

var client = feathers();
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({
  header: 'Authorization',
  path: '/authentication',
  jwtStrategy: 'jwt',
  entity: 'user',
  service: 'users',
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

var playerService = client.service('/api/player');
playerService.on('created', (item) => {
  appData.collections.players.data.push(item);
});

var locationService = client.service('/api/location');
locationService.on('created', (item) => {
  appData.collections.locations.data.push(item);
});

var cardService = client.service('/api/card');
cardService.on('created', (item) => {
  appData.collections.cards.data.push(item);
});

var lfgService = client.service('/api/lfg');
lfgService.on('created', (item) => {
  appData.playerState.invites.push(item);
});

var friendshipService = client.service('/api/friendship');
var discoveredService = client.service('/api/discovered');
var groupService = client.service('/api/group');

export default {
  playerService,
  locationService,
  cardService,
  lfgService,
  friendshipService,
  discoveredService,
  groupService,
}