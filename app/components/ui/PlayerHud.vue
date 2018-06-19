<template>
  <div>
      <h1 class="title is-4">Acheivements</h1>
      <p class="title is-6 is-blue">Cards: {{ cards }}</p>
      <p class="title is-6 is-red">Locations: {{ locations }}</p>
      <p class="title is-6 is-green">Experience: {{ experience }}</p>
  </div>
</template>

<script>
export default {
  name: "PlayerHud",
  props: [
    'experience',
    'locations',
    'cards',
  ]
};
</script>

<style>
.page-nav {
  text-align: center;
}
</style>

