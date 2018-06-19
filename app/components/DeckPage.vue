<template>
  <div class="container is-fluid">
    <h1 class="title is-3">Deck</h1>
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label"> Filter by location </p>
          <ul class="menu-list">
            <li v-for="location in $store.playerState.locations" :key="location.id_location">
              <a>{{ location.display_name }} </a>
            </li>
          </ul>
          <p class="menu-label"> Filter by status </p>
          <ul class="menu-list">
            <li>
              <a>Collected ({{ $store.playerState.played.length }}/{{ $store.playerState.deck.length }})</a>
            </li>
            <li>
              <a>Discovered ({{ $store.playerState.deck.length }}/{{ $store.collections.cards.data.length }})</a>
            </li>
          </ul>
        </aside>
      </div>

      <div class="column is-9">
        <h2 class="subtitle">Played</h2>
        <div class="columns is-multiline">
          <div class="column is-3" v-for="card in $store.playerState.played" :key="card.id_card">
            <player-card :card="card">
              <p>{{ card.description }}</p>
            </player-card>
          </div>
        </div>
        <h2 class="subtitle">Discovered</h2>
        <div class="columns is-multiline">
          <div class="column is-3" v-for="card in $store.playerState.deck" :key="card.id_card">
            <player-card :card="card">
              <p>{{ card.description }}</p>
            </player-card>
          </div>
        </div>
        <h2 class="subtitle">History</h2>
        <div class="columns is-multiline">
          <div class="column is-3" v-for="card in $store.playerState.history" :key="card.id_playercard">
            <player-card :card="card"></player-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import store from '../store';
import PlayerCard from './ui/PlayerCard.vue';

export default {
  name: 'DeckPage',
  components: {
    PlayerCard
  }
}

</script>
