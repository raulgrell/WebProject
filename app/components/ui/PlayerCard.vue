<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ card.display_name }}</p>
    </header>
    <div class="player-card-image card-image image is-4by3">
      <img :src=" 'https://picsum.photos/400/300?image=' + (card.id_card * 5)" alt="">
    </div>
    <div v-if="!!$slots.default" class="card-content">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',
  props: ['card']
}
</script>

<style>
.player-card-image img {
  padding: 0.5em;
  background-color: #333;
}
</style>


