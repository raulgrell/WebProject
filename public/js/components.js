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
            cardService.create(this.card).then( response => {
                console.log('Card created: ', response);
            }).catch(error => {
                console.log('Card failed: ', error)
            });
        }
    },
    template: document.getElementById('card-form')
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
            locationService.create(this.location).then( response => {
                console.log('Location created: ', response);
            }).catch(error => {
                console.log('Location failed: ', error)
            });
        }
    },
    template: document.getElementById('location-form')
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
            playerService.create(this.player).then( response => {
                console.log('Player created: ', response);
            }).catch(error => {
                console.log('Player failed: ', error)
            });
        }
    },
    template: document.getElementById('player-form')
});