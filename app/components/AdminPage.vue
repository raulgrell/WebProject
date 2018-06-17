<template>
  <!-- Admin -->
  <div class="container is-fluid">
    <h1 class="title is-3 has-text-light shadowed">Admin</h1>
    <div class="columns is-page">
      <!-- Players -->
      <div class="column is-4">
        <h2 class="subtitle has-text-light shadowed">Player</h2>
        <div v-for="player in collections.players.data" :key="player.id_player" class="is-item has-admin-buttons">
          <p class="is-item-title">{{ player.display_name }}</p>
          <p>{{ player.description }}</p>
          <div class="buttons has-addons is-admin-buttons">
            <div class="button is-small" @click="loginPlayer(player)">Login</div>
            <div class="button is-small" @click="editPlayer(player)">Edit</div>
            <div class="button is-small" @click="friendPlayer(player)">Friend</div>
          </div>
        </div>
        <hr>
        <player-form></player-form>
      </div>

      <!-- Locations -->
      <div class="column is-4">
        <h2 class="subtitle has-text-light shadowed">Locations</h2>
        <div v-for="location in collections.locations.data" :key="location.id_location" class="is-item has-admin-buttons">
          <p class="is-item-title">{{ location.display_name }}</p>
          <p>{{ location.description }}</p>
          <div class="buttons has-addons is-admin-buttons">
            <div class="button is-small" @click="editLocation(location)">Edit</div>
            <div class="button is-small" @click="discoverLocation(location)">Discover</div>
            <div class="button is-small" @click="exploreLocation(location)">Explore</div>
            <div class="button is-small" @click="exploreWholeLocation(location)">Explore All</div>
          </div>
        </div>
        <hr>
        <location-form :locations="collections.locations.data"></location-form>
      </div>

      <!-- Cards -->
      <div class="column is-4">
        <h2 class="subtitle has-text-light shadowed">Cards</h2>
        <div v-for="card in collections.cards.data" :key="card.id_card" class="is-item has-admin-buttons">
          <p class="is-item-title">{{ card.display_name }}</p>
          <p>{{ card.description }}</p>
          <div class="buttons has-addons is-admin-buttons">
            <div class="button is-small" @click="editCard(card)">Edit</div>
            <div class="button is-small" @click="discoverCard(card)">Discover</div>
            <div class="button is-small" @click="unlockCard(card)">Unlock</div>
          </div>
        </div>
        <hr>
        <card-form :locations="collections.locations.data"></card-form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";

import PlayerForm from "./admin/PlayerForm.vue";
import CardForm from "./admin/CardForm.vue";
import LocationForm from "./admin/LocationForm.vue";

export default {
  name: "Admin",
  components: {
    CardForm,
    LocationForm,
    PlayerForm
  },
  data: function () {
    return store;
  },
  methods: {
    discoverLocation: function (location) {
      this.$services.discoveredService.create({
        id_player: this.player.id_player,
        id_location: location.id_location,
        is_favourite: false,
        is_visited: false
      });
    },
    exploreLocation: function (location) {
      this.$services.discoveredService.create({
        id_player: this.player.id_player,
        id_location: location.id_location,
        is_favourite: false,
        is_visited: false
      });
    },
    exploreWholeLocation: function (location) {
      this.$services.discoveredService.create({
        id_player: this.player.id_player,
        id_location: location.id_location,
        is_favourite: false,
        is_visited: false
      });
    }
  }
};
</script>

<style>
.has-admin-buttons {
  position: relative;
  min-height: 3em;
}

.is-item {
  margin-bottom: 1em;
}

.is-item-title {
  font-weight: bold;
  padding: 0.5em 0 0.25em 0;
}

.is-admin-buttons {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
