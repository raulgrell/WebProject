<template>
    <div class="page-nav">
        <div class="columns">
            <router-link class="column has-size-5 has-text-light shadowed" :to="{ name: 'hand' }">Hand</router-link>
            <router-link class="column has-size-5 has-text-light shadowed" :to="{ name: 'deck' }">Deck</router-link>
            <router-link class="column has-size-5 has-text-light shadowed" :to="{ name: 'locations' }">Location</router-link>
            <router-link class="column has-size-5 has-text-light shadowed" :to="{ name: 'friends' }">Friend</router-link>
            <router-link class="column has-size-5 has-text-light shadowed" :to="{ name: 'admin' }">Admin</router-link>
            <a class="column  has-size-5 has-text-light shadowed" href="/logout">Logout</a>
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

