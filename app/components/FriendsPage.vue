<template>
  <!-- Friends -->
  <div class="container is-fluid">
    <h1 class="title is-3 has-text-light shadowed">Friends</h1>
    <div class="columns is-page">
      <div class="column is-3">
        <h2 class="title is-3 has-text-light shadowed">Player List</h2>
        <div v-for="item in collections.players.data" :key="item.id_player">
          <p>{{ item.display_name }}
            <a v-if="!isFriend(item.id_player)" @click="addFriend(item.id_player)" class="is-pulled-right">Add friend </a>
          </p>
        </div>
      </div>
      <div class="column is-9">
        <h2 class="title is-3 has-text-light shadowed">Friend List</h2>
        <div class="columns is-multiline">
          <div class="column is-4" v-for="friend in playerState.friends" :key="friend.id_friend">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title has-text-light shadowed">{{ friend.friend_name }}</p>
              </header>
              <div class="card-image image is-square">
                <img :src=" 'https://picsum.photos/300/300?image=' + (friend.id_player + 50)"  alt="">
              </div>
              <div class="card-content">
                <div class="content">
                  {{ friend.description }}
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
import axios from "axios";
import store from "../store";

export default {
  name: "Friends",
  data: function () {
    return store;
  },
  methods: {
    addFriend: function (id_friend) {
      axios.post("/friends/" + this.player.id_player + "/" + id_friend).then(response => {
        this.playerState.friends.push(id_friend);
      });
    },
    isFriend: function (id_friend) {
      return (
        this.playerState.friends.find(f => f.id_player == id_friend) !== undefined
      );
    }
  }
};
</script>
