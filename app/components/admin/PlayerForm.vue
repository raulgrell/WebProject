<template id="player-form">
  <div class="form">
    <div class="field">
      <label class="label">E-Mail</label>
      <div class="control">
        <input class="input" type="text" placeholder="email" v-model="player.email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="text" placeholder="password" v-model="player.password">
      </div>
    </div>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="display_name" v-model="player.display_name">
      </div>
    </div>
    <div class="field">
      <label class="label">Age</label>
      <div class="control">
        <input class="input" type="number" placeholder="age" v-model="player.age">
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" placeholder="description" v-model="player.description"></textarea>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button @click="create()" class="button is-link">Create</button>
      </div>
      <div class="control">
        <button @click="clear()" class="button is-text">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      player: {
        email: '',
        password: '',
        display_name: '',
        age: '',
        description: ''
      }
    }
  },
  methods: {
    create: function () {
      this.$services.playerService.create(this.player).then(response => {
        console.log('Player created: ', response);
      }).catch(error => {
        console.log('Player failed: ', error)
      });
    }
  },
};

</script>
