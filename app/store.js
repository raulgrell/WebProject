export default {
  player: {
    id_player: 1,
    display_name: 'Raul',
    description: 'I like steak'
  },
  playerState: {
    cards: [],
    played: [],
    deck: [],
    locations: [],
    visited: [],
    completed: [],
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