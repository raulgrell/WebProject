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
}).then( () => {

});

var playerService = client.service('/player');
playerService.on('created', (item) => {
    appData.collections.players.push(item);
});

var locationService = client.service('/location');
locationService.on('created', (item) => {
    appData.collections.locations.push(item);
});

var lfgService = client.service('/lfg');
lfgService.on('created', (item) => {
    appData.playerState.invites.push(item);
});

var cardService = client.service('/card');
cardService.on('created', (item) => {
    appData.collections.cards.push(item);
});

var friendshipService = client.service('/friendship');
var discoveredService = client.service('/discovered');
var groupService = client.service('/group');

Vue.component('card-form', {
    props: ['locations'],
    data: function() {
        return {
            card: {
                id_location: '',
                display_name: '',
                action: '',
                description: ''
            }
        }
    },
    methods: {
        create: function() {
            cardService.create(this.card).then( r => {
                console.log("Card created: ", r);
            }).catch(err => {
                console.log("Card failed: ", err)
            });
        }
    },
    template: document.getElementById("card-form")
});

Vue.component('location-form', {
    props: ['locations'],
    data: function() {
        return {
            location: {
                display_name: '',
                id_parent: '',
                description: ''
            }
        }
    },
    methods: {
        create: function() {
            locationService.create(this.location).then( r => {
                console.log("Location created: ", r);
            }).catch(err => {
                console.log("Location failed: ", err)
            });
        }
    },
    template: document.getElementById("location-form")
});

Vue.component('player-form', {
    data: function() {
        return {
            player: {
                display_name: '',
                age: '',
                description: ''
            }
        }
    },
    methods: {
        create: function() {
            playerService.create(this.player).then( r => {
                console.log("Player created: ", r);
            }).catch(err => {
                console.log("Player failed: ", err)
            });
        }
    },
    template: document.getElementById("player-form")
});

var appData = {
    user: {
        email: '',
        pass: '',
    },
    player: {
        id_player: 1,
        display_name: 'Raul',
        description: 'I like steak'
    },
    playerState: {
        cards: [],
        deck: [1, 2],
        locations: [1, 2],
        favourites: [1],
        friends: [],
        invites: [],
        group: {
            id_lfg: 0,
            host: {},
            invited: [],
            members: [],
            host: {},
            card: {},
        },
        groups: [],
        history: []
    },
    errors: [],
    collections: {
        cards: {
            data: []
        },
        friendships: {
            data: []
        },
        players: {
            data: []
        },
        locations: {
            data: []
        },
        events: {
            data: []
        },
    }
}

function populateAppData() {
    axios.get("/card").then(response => {
        appData.collections.cards = Object.assign({}, response.data);
    });

    axios.get("/location").then(response => {
        appData.collections.locations = Object.assign({}, response.data);
    });

    axios.get("/event").then(response => {
        appData.collections.events = Object.assign({}, response.data);
    });

    axios.get("/player").then(response => {
        appData.collections.players = Object.assign({}, response.data);
    });

    axios.get("/friends/" + appData.player.id_player).then(response => {
        appData.collections.friendships = response;
    });

    axios.get("/lfg").then(response => {
        appData.playerState.invites = response.data;
    });
}

var app = new Vue({
    el: '#app-root',
    data: appData,
    mounted: function () {
        populateAppData();
    },
    methods: {
        playCard: function (index) {
            this.playerState.history.push(this.playerState.cards[index]);
            this.playerState.cards.splice(index, 1);
        },
        playGroupCard: function () {
            const index = this.playerState.cards.indexOf(this.playerState.group.card);
            this.playerState.history.push(this.playerState.group.card);
            this.playerState.cards.splice(index, 1);
            this.playerState.group.card = {};
        },
        dropCard: function (index) {
            this.playerState.cards.splice(index, 1);
        },
        dealCard: function () {
            if (this.playerState.cards.length >= 6) return;
            let index = getRandomInt(this.playerState.deck.length);
            this.playerState.cards.push(this.playerState.deck[index]);
        },
        addFriend: function (id_friend) {
            axios.post("/friends/" + appData.player.id_player + "/" + id_friend).then(response => {
                appData.collections.friendships = response;
            });

            this.playerState.friends.push(id_friend);
        },
        isFriend: function (id_friend) {
            return (this.player.id_player == id_friend) || (this.playerState.friends.indexOf(id_friend) != -1);
        },
        requestGroup: function (friend) {
            lfgService.create(this.playerState.group).then(response => {
                console.log("Created LFG: ", response);
            }).catch(err => {
                console.log("LFG Failed: ", error);
            });
            this.playerState.group.members.push({ ...friend, accepted: false });
        },
        acceptGroup: function (invite) {
            lfgService.patch(invite.id, { accepted: true }).then(response => {
                console.log("Updated LFG: ", response);
            }).catch(err => {
                console.log("Accept failed: ", err);
            });
            const index = this.playerState.invites.indexOf(invite);
            this.playerState.invites[index].accepted = true;
        },
        findGroup: function (id_card) {
            this.playerState.group.card = this.collections.cards.data.find(c => c.id_card == id_card) || {};
            this.playerState.group.player = this.player;
            this.playerState.group.members = [];
        },
        lookingForGroup: function () {
            return this.playerState.group.card.id_card !== undefined;
        },
        setInactive: function (id_element) {
            document.getElementById(id_element).classList.remove('is-active');
        }
    },
    computed: {
        pendingInvites: function () {
            return this.playerState.invites.filter(i => !i.accepted);
        },
        playerHistory: function () {
            return this.playerState.history.map(c => this.collections.cards.data.find(x => c == x.id_card));
        },
        playerCards: function () {
            return this.playerState.cards.map(c => this.collections.cards.data.find(x => c == x.id_card));
        },
        deckCards: function () {
            return this.collections.cards.data.filter(c => this.playerState.deck.includes(c.id_card));
        },
        historyCards: function () {
            return this.collections.cards.data.filter(c => this.playerState.history.includes(c.id_card));
        },
        playerLocations: function () {
            return this.collections.locations.data.filter(l => this.playerState.locations.includes(l.id_location));
        },
        favouriteLocations: function () {
            return this.collections.locations.data.filter(l =>
                this.playerState.locations.includes(l.id_location) &&
                this.playerState.favourites.includes(l.id_location));
        },
        locationCards: function () {
            return this.collections.cards.data.filter(c => this.playerState.locations.includes(c.id_location));
        },
        playerEvents: function () {
            return this.collections.events.data.filter(e => this.playerState.locations.includes(e.id_location));
        },

        refresh: function(){

            location.reload();
        },

        allCards: () => appData.collections.cards.data,
        allEvents: () => appData.collections.events.data,
        allLocations: () => appData.collections.locations.data,
        allPlayers: () => appData.collections.players.data,
        allFriends: () => appData.collections.friendships.data,
    }
});


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}