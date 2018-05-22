var appData = {
    player: {
        id_player: '1',
        display_name: 'name',
        description: 'asd'
    },
    playerState: {
        cards: [],
        deck: [],
        locations: [],
        favourites: [],
        friends: [],
        invites: [],
        group: {
            id_lfg: 0,
            host: {},
            invited: [],
            members: [],
            card: {},
        },
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
    axios.get('/api/card').then(response => {
        appData.collections.cards = Object.assign({}, response.data);
    });

    axios.get('/api/location').then(response => {
        appData.collections.locations = Object.assign({}, response.data);
    });

    axios.get('/api/event').then(response => {
        appData.collections.events = Object.assign({}, response.data);
    });

    axios.get('/api/player').then(response => {
        appData.collections.players = Object.assign({}, response.data);
    });

    axios.get("/friends/" + appData.player.id_player).then(response => {
        appData.collections.friendships = response;
    });
    
    axios.get("/friends/" + appData.player.id_player).then(response => {
        appData.collections.friendships = response;
    });

    axios.get('/api/lfg').then(response => {
        appData.playerState.invites = response.data;
    });

    axios.get("/player/available/" + appData.player.id_player).then(response => {
        appData.playerState.deck = response.data;
    });

    axios.get("/player/discovered/" + appData.player.id_player).then(response => {
        appData.playerState.locations = response.data;
    });

    axios.get("/player/played/" + appData.player.id_player).then(response => {
        appData.playerState.history = response.data;
    });

    axios.get("/player/hand/" + appData.player.id_player).then(response => {
        appData.playerState.cards = response.data;
    });

    axios.get("/player/favourites/" + appData.player.id_player).then(response => {
        appData.playerState.favourites = response.data;
    });
}

var app = new Vue({
    el: '#app-root',
    data: appData,
    created: function () {
        populateAppData();
    },
    methods: {
        playCard: function (card, card_index) {
            axios.post('/state/playCard', {
                id_playercard: card.id_playercard
            }).then( response => {
                this.playerState.history.push(response)
                this.playerState.cards.splice(card_index, 1);
            }).catch( error => alert_log(error));
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
            axios.post('/state/dealCard/', {
                user_id: this.playerState.id_player
            }).then( response => {
                this.playerState.cards.push(response);
            }).catch( error => alert_log(error));
        },
        addFriend: function (id_friend) {
            axios.post("/friends/" + appData.player.id_player + "/" + id_friend).then(response => {
                appData.collections.friendships = response;
            });

            this.playerState.friends.push(id_friend);
        },

    register: function () {
          var name = document.getElementById("NameReg").value;
          var email = document.getElementById("EmailReg").value;
          var pass = document.getElementById("PassReg").value;
          var checkPass = document.getElementById("checkPass").value;

          if(checkPass==pass){
            axios.post("/register", {
              name, email, pass
            }).then(response => {
                window.location.href="/";
            });
          }
        },

        login: function(){
          var namelog = document.getElementById("NameLog").value;
          var passlog = document.getElementById("PassLog").value;

          axios.post("/login",{
            name, pass
          })
        }


        isFriend: function (id_friend) {
            return (this.player.id_player == id_friend) || (this.playerState.friends.indexOf(id_friend) != -1);
        },
        requestGroup: function (friend) {
            lfgService.create(this.playerState.group).then(response => {
                console.log('Created LFG: ', response);
            }).catch(err => {
                console.log('LFG Failed: ', error);
            });
            this.playerState.group.members.push({ ...friend, accepted: false });
        },
        acceptGroup: function (invite) {
            lfgService.patch(invite.id, { accepted: true }).then(response => {
                console.log('Updated LFG: ', response);
            }).catch(err => {
                console.log('Accept failed: ', err);
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
        playerEvents: function () {
            return this.collections.events.data.filter(e => this.playerState.locations.includes(e.id_location));
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
