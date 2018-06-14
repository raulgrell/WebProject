<template>
  <div class="container is-fluid">
    <div class="columns">
      <!-- Left -->
      <div id="player-hand" class="column is-8">
        <h1 class="title is-3">Current Cards</h1>
        <transition-group name="list" tag="div" class="columns is-multiline">
          <div class="list-item column is-4" v-for="(card, card_index) in playerState.hand" :key="card.id_playercard">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">{{ card.display_name }}</p>
              </header>
              <div class="card-image image is-square">
                <img :src=" 'https://picsum.photos/300/300?image=' + (card.id_card * 5)" alt="">
              </div>
              <div class="card-content">
                <div class="content">
                  <p>{{ card.description }}</p>
                </div>
              </div>
              <footer class="card-footer">
                <div @click="playCard(card, card_index)" class="card-footer-item">Play</div>
                <div @click="dropCard(card, card_index)" class="card-footer-item">Discard</div>
                <div @click="findGroup(card, card_index)" class="card-footer-item">Find Group</div>
              </footer>
            </div>
          </div>
        </transition-group>
        <hr>
        <button class="button" @click="dealCard()">Get Card</button>
      </div>

      <!-- Right -->
      <div class="column is-4">
        <h1 class="title is-3">Friends</h1>
        <div v-for="friend in playerState.friends" :key="friend.id_friend" class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="https://bulma.io/images/placeholders/48x48.png" alt="img">
            </figure>
          </div>
          <div class="media-content">
            <p>{{ friend.friend_name }}</p>
            <!-- <button @click="requestGroup(friend)" class="is-pulled-right">Add To Group</button> -->
          </div>
        </div>
        <hr>
        <h1 class="title is-3">Group</h1>
        <div v-if="isLookingForGroup()">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">{{ playerState.group.card.display_name }}</p>
            </header>
            <div class="card-content">
              <div class="content">
                <p>{{ playerState.group.card.description }}</p>
                <p class="has-text-weight-bold">Group Members</p>
                <ul>
                  <li v-for="member in playerState.group.members" :key="member.id_member">
                    {{ member.display_name }}
                  </li>
                </ul>
              </div>
            </div>
            <footer class="card-footer">
              <div @click="playGroupCard(group)" class="card-footer-item">Play</div>
              <div @click="cancelGroupCard(group)" class="card-footer-item">Cancel</div>
            </footer>
          </div>
        </div>
        <hr>
        <div v-for="(group, group_index) in playerState.invites" v-if="group.player.id_player != player.id_player" :key="group.id_friendship" class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="https://bulma.io/images/placeholders/48x48.png" alt="img">
            </figure>
          </div>
          <div class="media-content">
            <p>{{ group.player.display_name }} wants to make a group!</p>
            <p>Would you like to
              <strong>{{ group.card.display_name }}</strong>?</p>
            <button @click="joinGroup(group, group_index)" class="is-pulled-right">Join</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store';

function alert_log(error) {
  console.log('Error: ', ...arguments);
  alert(error.message);
}

export default {
  name: 'Hand',
  data: function () {
    return store;
  },
  methods: {
    isLookingForGroup: function () {
      return this.playerState.group.card.id_card !== undefined;
    },
    playCard: function (card, index) {
      axios.post('/player/state/playCard', {
        id_playercard: card.id_playercard
      }).then(response => {
        this.playerState.history.push(card);
        this.playerState.hand.splice(index, 1);
      }).catch(alert_log);
    },
    playGroupCard: function (card, card_index) {

    },
    cancelGroupCard: function (card, card_index) {

    },
    dropCard: function (index) {
      axios.post('/player/state/dropCard/', {
        id_player: this.player.id_player
      }).then(response => {
        this.playerState.hand.splice(index, 1);
      }).catch(alert_log);
    },
    holdCard: function (card, index) {
      axios.post('/player/state/holdCard/', {
        id_playercard: card.id_playercard
      }).then(response => {
        this.playerState.hand.splice(index, 1, response);
      }).catch(alert_log);
    },
    dealCard: function () {
      if (this.playerState.hand.length >= 6) return;
      axios.post('/player/state/dealCard/', {
        id_player: this.player.id_player
      }).then(response => {
        this.playerState.hand.push(response.data);
      }).catch(alert_log);
    },
    joinGroup: function (group, index) {
      group.members.push(this.player);
      this.$services.lfgService.patch(group.id_lfg, {
        members: group.members
      }).then(response => {
        this.playerState.group = group;
      }).catch(alert_log);
    },
    findGroup: function (card) {
      this.$services.lfgService.create({
        id_lfg: this.player.id_player,
        card,
        player: this.player,
        members: []
      }).then(response => {
          this.playerState.group = response;
      }).catch(alert_log);
    }
  }
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
