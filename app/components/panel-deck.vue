<template>
  <div class="container is-fluid">
        <h1 class="title is-3">Deck</h1>
        <div class="columns is-page">
            <div class="column is-3">
                <aside class="menu">
                    <p class="menu-label"> Filter by location </p>
                    <ul class="menu-list">
                        <li v-for="item in playerLocations" :key="item.id_location">
                            <a>{{ item.display_name }} </a>
                        </li>
                    </ul>
                    <p class="menu-label"> Filter by status </p>
                    <ul class="menu-list">
                        <li>
                            <a>Played ({{ historyCards.length }}/{{ allCards.length }})</a>
                        </li>
                        <li>
                            <a>Collected ({{ deckCards.length }}/{{ allCards.length }})</a>
                        </li>
                        <li>
                            <a>Discovered ({{ locationCards.length }}/{{ allCards.length }})</a>
                        </li>
                    </ul>
                </aside>
            </div>

            <div class="column is-9">
                <h2 class="subtitle">Played</h2>
                <div class="columns is-multiline">
                    <div class="column is-3" v-for="item in historyCards" :key="item.id_card">
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
                <h2 class="subtitle">Collected</h2>
                <div class="columns is-multiline">
                    <div class="column is-3" v-for="item in deckCards" :key="item.id_card">
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
                <h2 class="subtitle">Discovered</h2>
                <div class="columns is-multiline">
                    <div class="column is-3" v-for="item in locationCards" :key="item.id_card">
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
