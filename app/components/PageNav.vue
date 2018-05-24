<template>
    <div class="page-nav">
        <div class="columns">
            <router-link class="column" :to="{ name: 'hand' }">Hand</router-link>
            <router-link class="column" :to="{ name: 'deck' }">Deck</router-link>
            <router-link class="column" :to="{ name: 'locations' }">Location</router-link>
            <router-link class="column" :to="{ name: 'friends' }">Friend</router-link>
            <router-link class="column" :to="{ name: 'admin' }">Admin</router-link>
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

