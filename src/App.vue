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
        <p class="eyebrow">Chess Rules Enabled</p>
        <h1>Play legal moves only.</h1>
        <p class="subtitle">Select a piece, then choose one of its legal destination squares.</p>
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
