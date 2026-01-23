<script setup>
import { computed } from 'vue';
import ChessBoard from './components/ChessBoard.vue';
import MoveHistory from './components/MoveHistory.vue';
import ChessGameService from './services/ChessGameService.js';

const game = new ChessGameService();
const history = computed(() => game.getHistory());
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div>
        <p class="eyebrow">Free Play Chess</p>
        <h1>Move any piece anywhere.</h1>
        <p class="subtitle">Select a piece, pick a square, and keep a log of every move.</p>
      </div>
    </header>
    <main class="app-layout">
      <section class="board-panel">
        <ChessBoard :game="game" />
      </section>
      <MoveHistory :history="history" />
    </main>
  </div>
</template>
