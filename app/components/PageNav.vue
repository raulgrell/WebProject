<template>
    <div class="page-nav">
        <div class="columns">
            <router-link class="column" to="/">Hand</router-link>
            <router-link class="column" to="/deck-page">Deck</router-link>
            <router-link class="column" to="/location-page">Location</router-link>
            <router-link class="column" to="/friend-page">Friend</router-link>
            <router-link class="column" to="/admin-page">Admin</router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: "PageNav"
};
</script>

<style>
.page-nav {
  text-align: center;
}
</style>

