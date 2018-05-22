<template>
    <!-- Locations -->
    <div class="container is-fluid">
        <h1 class="title is-3">Locations</h1>
        <div class="columns is-page">
            <div class="column is-6">
                <h2 class="subtitle">Filter</h2>
                <input class="input" type="text" name="locationFilter" id="locationFilterString">
                <hr>
                <div class="columns is-multiline">
                    <div class="column is-3" v-for="location in playerState.locations" :key="location.id_location">
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">{{ location.display_name }}</p>
                            </header>
                            <div class="card-content">
                                <div class="content">
                                    <p>{{ location.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="has-text-right">{{ playerState.locations.length }} / {{ collections.locations.length }}</p>
            </div>
            <div class="column is-6">
                <h2 class="subtitle">Favourites</h2>
                <div class="columns is-multiline">
                    <div class="column is-6" v-for="location in playerState.favourites" :key="location.id_location">
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">{{ location.display_name }}</p>
                            </header>
                            <div class="card-content">
                                <div class="content">
                                    <p>{{ location.description }}</p>
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
  name: 'Locations',
  data: function() {
      return store;
  },
}

</script>