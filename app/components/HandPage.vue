<template>
  <div class="container is-fluid">
    <div class="columns">
      <!-- Right -->
      <div class="column is-6">
        <player-hud :experience="$store.playerState.history.length * 12" :locations="$store.playerState.locations.length" :cards="$store.playerState.deck.length"></player-hud>
        <h1 v-if="incomingLfgs.length > 0" class="title is-5">Looking For Group!</h1>
        <div v-for="(group, group_index) in incomingLfgs" :key="group.id_friendship" class="media">
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
      <div class="column is-6 is-4-fullhd is-offset-2-fullhd">
        <div v-if="playerState.group.id_lfg">
          <div class="columns">
            <div class="column">
              <h3 class="title is-4">Group Card</h3>
              <h4 v-if="playerState.group.members.length > 0" class="title is-6">Members:</h4>
              <p v-for="member in playerState.group.members" :key="member.id_player">{{ member.display_name }}</p>
              <br>
              <div class="card-actions">
                <a @click="playGroupCard(playerState.group.card)" class="card-action">Play</a>
                <a v-if="this.playerState.group.player.id_player == this.player.id_player" @click="dropCard(playerState.group.card)" class="card-action">Discard</a>
              </div>
            </div>
            <div class="column">
              <player-card :card="playerState.group.card">
                <p>{{ playerState.group.card.description }}</p>
              </player-card>
            </div>
          </div>
        </div>
        <div v-else class="box">
          Choose a card from your hand and call some friends!
        </div>
      </div>
    </div>
    <player-hand id="player-hand"></player-hand>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store';

import PlayerHud from './ui/PlayerHud.vue';
import PlayerHand from './ui/PlayerHand.vue';
import PlayerCard from './ui/PlayerCard.vue';

export default {
  name: 'HandPage',
  components: {
    PlayerHand,
    PlayerCard,
    PlayerHud
  },
  data: function () {
    return store;
  },
  computed: {
    incomingLfgs: function () {
      return this.playerState.lfgs.filter(lfg =>
        lfg.player.id_player !== this.player.id_player &&
        !lfg.members.find(m => m.id_player === this.player.id_player));
    }
  },
  methods: {
    playGroupCard: function (card, card_index) {
      axios.post('/player/playGroupCard', {
        id_playercard: card.id_playercard
      }).then(response => {
        this.playerState.history.push(card);
        this.playerState.group = {};
      }).catch(this.$alertLog);
    },
    cancelGroupCard: function (card, card_index) {
      axios.post('/player/disbandGroup', {
        id_playercard: card.id_playercard
      }).then(response => {
        this.playerState.history.push(card);
        this.playerState.group = {};
      }).catch(this.$alertLog);
    },
    joinGroup: function (group, index) {
      const self = group.members.find(m => m.id_player === this.player.id_player)
      if (!self) {
        group.members.push(this.player);
        this.$services.lfgService.patch(group.id_lfg, {
          members: group.members
        }).then(response => {
          this.playerState.group = response;
          this.playerState.lfgs.splice(index, 1);
        }).catch(this.$alertLog);
      }
    }
  }
};
</script>

<style>
#player-hand {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
</style>
