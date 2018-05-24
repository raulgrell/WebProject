<template>
    <div class="container is-fluid">
        <div class="columns">
            <!-- Left -->
            <div id="player-hand" class="column is-8">
                <h1 class="title is-3">Current Cards</h1>
                <div class="columns is-multiline">
                    <div class="column is-4" v-for="(card, card_index) in playerState.hand" :key="card.id_playercard" >
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">{{ card.display_name }}</p>
                            </header>
                            <div class="card-image image is-square">
                                <img src="../assets/css/bg.jpg" alt="">
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
                </div>
                <hr>
                <button class="button" @click="dealCard()">Get Card</button>
            </div>

            <!-- Right -->
            <div class="column is-4">
                <h1 class="title is-3">Friends</h1>
                <div v-for="friend in playerState.friends" :key="friend.id_player" class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/48x48.png" alt="img">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p>{{ friend.friend_name }}</p>
                        <button @click="requestGroup(friend)" class="is-pulled-right">Add To Group</button>
                    </div>
                </div>
                <hr>
                <h1 class="title is-3">Group</h1>
                <div v-if="lookingForGroup()">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">{{ playerState.group.card.display_name }}</p>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                <p>{{ playerState.group.card.description }}</p>
                                <div class="field">
                                    <label class="label">Group Name</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Group Name" v-model="playerState.group.name">
                                    </div>
                                </div>
                                <p class="has-text-weight-bold">Group Members</p>
                                <ul>
                                    <li v-for="member in playerState.group.members" :key="member.id_member">
                                        {{ member.display_name }} - {{ member.accepted ? "Ready!" : "Waiting..." }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <div @click="playGroupCard()" class="card-footer-item">Play</div>
                            <div @click="playerState.group.card = {}" class="card-footer-item">Cancel</div>
                        </footer>
                    </div>
                </div>
                <hr>
                <div v-for="item in playerState.invites" :key="item.id_friendship" class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/48x48.png" alt="img">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p>{{ item.player.display_name }} has invited you to join him!</p>
                        <p>Would you like to <strong>{{ item.card.display_name }}</strong>?</p>
                        <button @click="acceptGroup(item)" class="is-pulled-right">Accept</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import store from "../store";

function alert_log(error) {
  console.log("Error: ", ...arguments);
  alert(error.message);
}

export default {
  name: "Hand",
  data: function() {
    return store;
  },
  methods: {
    lookingForGroup: function() {
      return this.playerState.group.card.id_card !== undefined;
    },
    playCard: function(card, card_index) {
      axios
        .post("/state/playCard", {
          id_playercard: card.id_playercard
        })
        .then(response => {
          this.playerState.history.push(card);
          this.playerState.hand.splice(card_index, 1);
        })
        .catch(alert_log);
    },
    playGroupCard: function() {
      const index = this.playerState.hand.indexOf(this.playerState.group.card);
      this.playerState.history.push(this.playerState.group.card);
      this.playerState.hand.splice(index, 1);
      this.playerState.group.card = {};
    },
    dropCard: function(index) {
        axios
          .post("/state/dropCard/", {
            id_player: this.player.id_player
          })
          .then(response => {
            this.playerState.hand.splice(index, 1);
          })
          .catch(alert_log);
    },
    dealCard: function() {
      if (this.playerState.hand.length >= 6) return;
      axios
        .post("/state/dealCard/", {
          id_player: this.player.id_player
        })
        .then(response => {
            axios.get('/state/')
          this.playerState.hand.push(response.data);
        })
        .catch(alert_log);
    },
    requestGroup: function(friend) {
      lfgService
        .create(this.playerState.group)
        .then(response => {
          console.log("Created LFG: ", response);
        })
        .catch(err => {
          console.log("LFG Failed: ", error);
        });
      friend.accepted = false;
      this.playerState.group.members.push(friend);
    },
    acceptGroup: function(invite) {
      lfgService
        .patch(invite.id, { accepted: true })
        .then(response => {
          console.log("Updated LFG: ", response);
        })
        .catch(err => {
          console.log("Accept failed: ", err);
        });
      const index = this.playerState.invites.indexOf(invite);
      this.playerState.invites[index].accepted = true;
    },
    findGroup: function(card) {
      this.playerState.group.card = card;
      this.playerState.group.player = this.player;
      this.playerState.group.members = [];
    }
  }
};
</script>

<style>


</style>
