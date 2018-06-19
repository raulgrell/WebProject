<template id="card-form">
  <div class="form">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="display_name" v-model="event.display_name">
      </div>
    </div>
    <div class="field">
      <label class="label">Card</label>
      <div class="control">
        <div class="select">
          <select v-model="event.id_card">
            <option v-for="c in cards" :value="c.id_card" :key="c.id_card">{{ c.display_name }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" placeholder="description" v-model="card.description"></textarea>
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
  props: ['locations'],
  data: function () {
    return {
      event: {
        id_location: '',
        display_name: '',
        action: '',
        description: ''
      }
    }
  },
  methods: {
    create: function () {
      this.$services.eventService.create(this.card).then(response => {
        console.log('Card created: ', response);
      }).catch(error => {
        console.log('Card failed: ', error)
      });
    }
  }
}

</script>
