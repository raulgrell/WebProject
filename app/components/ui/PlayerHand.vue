<template>
  <div class="player-hand">
    <h1 class="title is-3">Hand</h1>
    <transition-group name="list" tag="div" class="columns" id="player-hand-cards" v-on:click.prevent="stop">
      <div class="list-item column is-2" v-for="(card, card_index) in $store.playerState.hand" :key="card.id_playercard">
        <player-card :card="card">
          <p>{{ card.description }}</p>
          <div class="card-actions">
            <a @click="playCard(card, card_index)" class="card-action">Play</a>
            <a @click="dropCard(card, card_index)" class="card-action">Discard</a>
            <a @click="findGroup(card, card_index)" class="card-action">Find Group</a>
          </div>
        </player-card>
      </div>
    </transition-group>
    <hr>
    <button class="button" @click="dealCard()">Get Card</button>
  </div>
</template>

<script>
import PlayerCard from './PlayerCard.vue'

export default {
  name: "PlayerHand",
  components: {
    PlayerCard
  },
  methods: {
    stop: function (e) {
      console.log("scroll");
    },
    dealCard: function () {
      if (this.$store.playerState.hand.length >= 6) return;
      this.$axios.post('/player/dealCard/', {
        id_player: this.$store.player.id_player
      }).then(response => {
        this.$store.playerState.hand.push(response.data);
        var objDiv = document.getElementById("player-hand-cards");
        objDiv.scrollLeft = objDiv.scrollWidth;
      }).catch(this.$alertLog);
    },
    playCard: function (card, card_index) {
      this.$axios.post('/player/playCard', {
        id_playercard: card.id_playercard
      }).then(response => {
        this.$store.playerState.history.push(card);
        this.$store.playerState.hand.splice(card_index, 1);
      }).catch(this.$alertLog);
    },
    dropCard: function (card, index) {
      this.$axios.post('/player/dropCard/', {
        id_playercard: card.id_playercard
      }).then(response => {
        this.$store.playerState.hand.splice(index, 1);
      }).catch(this.$alertLog);
    },
    findGroup: function (card) {
      const group = {
        id_lfg: this.$store.player.id_player,
        card: card,
        player: this.$store.player,
        members: [this.$store.player]
      };
      this.$services.lfgService.create(group).then(response => {
        this.$store.playerState.group = response;
      }).catch(this.$alertLog);
    }
  }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.card-action {
  text-align: center;
  display: block;
  background-color: #FAFAFA;
  padding: 0.2em;
}

.card-action:hover {
  display: block;
  background-color: #EAEAEA;
}

#player-hand-cards {
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>
