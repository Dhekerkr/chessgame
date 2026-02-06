<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
});

const selected = ref(null);

const board = computed(() => props.game.board);

function isSelected(row, col) {
  return selected.value && selected.value.row === row && selected.value.col === col;
}

function selectSquare(row, col) {
  const piece = props.game.getPiece(row, col);

  if (!selected.value) {
    if (piece) {
      selected.value = { row, col };
    }
    return;
  }

  if (selected.value && piece && isSelected(row, col)) {
    selected.value = null;
    return;
  }

  props.game.movePiece(selected.value, { row, col });
  selected.value = null;
}
</script>

<template>
  <div class="chess-board">
    <div
      v-for="(row, rowIndex) in board"
      :key="`row-${rowIndex}`"
      class="board-row"
    >
      <button
        v-for="(cell, colIndex) in row"
        :key="`cell-${rowIndex}-${colIndex}`"
        class="board-cell"
        :class="[
          (rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark',
          isSelected(rowIndex, colIndex) ? 'selected' : '',
        ]"
        :data-testid="`cell-${rowIndex}-${colIndex}`"
        type="button"
        @click="selectSquare(rowIndex, colIndex)"
      >
        <span
          class="piece"
          v-if="cell"
          :data-testid="`piece-${rowIndex}-${colIndex}`"
        >
          {{ cell.symbol }}
        </span>
        <span class="coords">{{ rowIndex }},{{ colIndex }}</span>
      </button>
    </div>
  </div>
</template>
