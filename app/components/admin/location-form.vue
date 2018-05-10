<template id="location-form">
    <div class="form">
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="display_name" v-model="location.display_name">
            </div>
        </div>

        <div class="field">
            <label class="label">Parent Location</label>
            <div class="control">
                <div class="select">
                    <select v-model="location.id_parent">
                        <option v-for="l in locations" :value="l.id_location" :key="l.id_location">{{ l.display_name }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <textarea class="textarea" placeholder="description" v-model="location.description"></textarea>
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
    data: function() {
        return {
            location: {
                display_name: '',
                id_parent: '',
                description: ''
            }
        }
    },
    methods: {
        create: function() {
            locationService.create(this.location).then( response => {
                console.log('Location created: ', response);
            }).catch(error => {
                console.log('Location failed: ', error)
            });
        }
    },
}

</script>
