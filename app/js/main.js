function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var lfg_invites = [];

var lfgService = window.client.service('/lfg');

lfgService.on('created', function (item) {
    console.log("LFG Event!")
    lfg_invites.push(item);
});

Vue.component('card-form', {
    props: ['locations'],
    template: document.getElementById("card-form")
});

Vue.component('location-form', {
    props: ['locations'],
    template: document.getElementById("location-form")
});

Vue.component('player-form', {
    template: document.getElementById("player-form")
});

var app_root = new Vue({
    el: '#app_root',
    data: {
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
            deck: [1,2],
            locations: [1,2],
            favourites: [1],
            friends: [],
            invites: lfg_invites,
            group: {
                card: {},
                name: 'Name',
                members: []
            },
            groups: [],
            history: []
        },
        errors: [],
        collections: {
            cards: {
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
    },
    mounted: function() {
        axios.get("/card").then( response => {
            this.collections.cards = Object.assign({}, response.data);
        });

        axios.get("/location").then( response => {
            this.collections.locations = Object.assign({}, response.data);
        });

        axios.get("/event").then( response => {
            this.collections.events = Object.assign({}, response.data);
        });

        axios.get("/player").then( response => {
            this.collections.players = Object.assign({}, response.data);
        });

        axios.get("/lfg").then( response => {
            this.playerState.invites = response.data;
        });
    },
    methods: {
        playCard: function (index) {
            this.playerState.history.push(this.playerState.cards[index]);
            this.playerState.cards.splice(index, 1);
        },
        playGroupCard: function () {
            this.playerState.history.push(this.playerState.group.card);
            const index = this.playerState.cards.indexOf(this.playerState.group.card);
            this.playerState.group.card = {};
            this.playerState.cards.splice(index, 1);
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
            this.playerState.friends.push(id_friend);
        },
        isFriend: function (id_friend) {
            return (this.player.id_player == id_friend) || (this.playerState.friends.indexOf(id_friend) != -1);
        },
        requestGroup: function(friend) {
            client.service('/lfg').create(this.playerState.group).then( response => {
                console.log("Created LFG: ", response);
            }).catch(err => {   
                console.log("LFG Failed: ", error);
            });
            this.playerState.group.members.push({...friend, accepted: false});
        },
        acceptGroup: function(invite) {
            client.service('/lfg').create(this.playerState.group).then( response => {
                console.log("Created LFG: ", response);
            }).catch(err => {   
                console.log("LFG Failed: ", error);
            });
            this.playerState.group.members.push({...friend, accepted: false});
        },
        findGroup: function (id_card) {
            this.playerState.group.card = this.collections.cards.data.find(c => c.id_card == id_card) || {};
            this.playerState.group.player = this.player;
            this.playerState.group.members = [];
        },
        lookingForGroup: function() {
            return this.playerState.group.card.id_card !== undefined;
        },
        setInactive: function(id_element) {
            document.getElementById(id_element).classList.remove('is-active');
        }
    },
    computed: {
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
        playerFriends: function () {
            return this.collections.players.data.filter(p => this.playerState.friends.includes(p.id_player));
        },
        locationCards : function () {
            return this.collections.cards.data.filter(c => this.playerState.locations.includes(c.id_location));
        },
        playerEvents: function () {
            return this.collections.events.data.filter(e => this.playerState.locations.includes(e.id_location));
        },
        allCards: function () {
            return this.collections.cards.data;
        },
        allEvents: function () {
            return this.collections.events.data;
        },
        allLocations: function () {
            return this.collections.locations.data;
        },
        allPlayers: function () {
            return this.collections.players.data;
        }
    }
})