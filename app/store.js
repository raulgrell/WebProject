export default {
  player: {
    id_player: 1,
    display_name: 'Raul',
    description: 'I like steak'
  },
  playerState: {
    hand: [],
    deck: [],
    played: [],
    locations: [],
    visited: [],
    completed: [],
    favourites: [],
    friends: [],
    invites: [],
    group: {
      id_lfg: 0,
      player: {},
      invited: [],
      members: [],
      card: {},
    },
    history: [],
    encounters: []
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
}
