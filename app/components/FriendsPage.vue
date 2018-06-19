<template>
  <!-- Friends -->
  <div class="container is-fluid">
    <h1 class="title is-3">Friends</h1>
    <div class="columns">
      <div class="column is-3">
        <h2 class="title is-3">Player List</h2>
        <div v-for="item in collections.players.data" :key="item.id_player">
          <p>{{ item.display_name }}
            <a v-if="!isFriendOrSelf(item.id_player)" @click="addFriend(item.id_player)" class="is-pulled-right">Add friend </a>
          </p>
        </div>
      </div>
      <div class="column is-9">
        <h2 class="title is-3">Friend List</h2>
        <div class="columns is-multiline">
          <div class="column is-4 is-3-fullhd" v-for="friend in playerState.friends" :key="friend.id_friend">
            <div class="has-text-centered">
              <div class="image is-square">
                <img class="is-round" :src=" 'https://picsum.photos/300/300?image=' + (friend.id_friend + 50)" alt="">
              </div>
              <p class="friend-name title is-6 is-bold">{{ friend.friend_name }}</p>
              <p>{{ friend.description }}</p>
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
  name: "FriendsPage",
  data: function () {
    return store;
  },
  methods: {
    addFriend: function (id_friend) {
      axios.post("/player/addFriend/" + id_friend).then(response => {
        this.playerState.friends.push(id_friend);
      });
    },
    acceptInvite: function (id_friendship) {
      axios.post("/player/acceptFriend/" + id_friendship).then(response => {
        this.playerState.friends.push(id_friend);
      });
    },
    isFriendOrSelf: function (id_player) {
      return (
        this.playerState.friends.find(f => f.id_friend == id_player) !== undefined ||
        this.player.id_player == id_player
      );
    }
  }
};
</script>

<style>
.friend-name {
  padding: 1em 0;
}
</style>

