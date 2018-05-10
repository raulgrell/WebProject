<template>
    <div class="container is-fluid">
        <h1 class="title is-3">Friends</h1>
        <div class="columns is-page">
            <div class="column is-3">
                <h2 class="title is-3">Player List</h2>
                <div v-for="item in allPlayers" :key="item.id_player">
                    <p>{{ item.display_name }}
                        <a v-if="!isFriend(item.id_player)" @click="addFriend(item.id_player)" class="is-pulled-right">Add friend</a>
                    </p>
                </div>
            </div>
            <div class="column is-9">
                <h2 class="title is-3">Player List</h2>
                <div class="columns is-multiline">
                    <div class="column is-3" v-for="item in playerFriends" :key="item.id_friendship">
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">{{ item.display_name }}</p>
                            </header>
                            <div class="card-content">
                                <div class="content">
                                    <p>{{ item.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
