<template>
  <div class="container is-fluid">
    <h1 class="title is-3 has-text-light shadowed">Deck</h1>
    <div class="columns is-page">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label has-text-light shadowed"> Filter by location </p>
          <ul class="menu-list">
            <li v-for="location in $store.playerState.locations" :key="location.id_location">
              <a>{{ location.display_name }} </a>
            </li>
          </ul>
          <p class="menu-label has-text-light shadowed"> Filter by status </p>
          <ul class="menu-list">
            <li>
              <a class="has-size-5 has-text-light shadowed">Played ({{ $store.playerState.history.length }}/{{ $store.collections.cards.data.length }})</a>
            </li>
            <li>
              <a class="has-size-5 has-text-light shadowed">Collected ({{ $store.playerState.played.length }}/{{ $store.collections.cards.data.length }})</a>
            </li>
            <li>
              <a class="has-size-5 has-text-light shadowed">Discovered ({{ $store.playerState.deck.length }}/{{ $store.collections.cards.data.length }})</a>
            </li>
          </ul>
        </aside>
      </div>

      <div class="column is-9">
        <h2 class="subtitle has-text-light shadowed">Played</h2>
        <div class="columns is-multiline">
          <div class="column is-3" v-for="card in $store.playerState.played" :key="card.id_card">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">{{ card.display_name }}</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <p>{{ card.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 class="subtitle has-text-light shadowed">Discovered</h2>
        <div class="columns is-multiline">
          <div class="column is-3" v-for="card in $store.playerState.deck" :key="card.id_card">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">{{ card.display_name }}</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <p>{{ card.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 class="subtitle has-text-light shadowed">History</h2>
        <div class="columns is-multiline">
          <div class="column is-3" v-for="card in $store.playerState.history" :key="card.id_playercard">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">{{ card.display_name }}</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <p>{{ card.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import store from '../store';

export default {
  name: 'Deck',
}

</script>
