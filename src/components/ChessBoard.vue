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
const legalTargets = computed(() => {
  if (!selected.value) {
    return new Set();
  }

  return new Set(
    props.game
      .getLegalMoves(selected.value)
      .map((position) => `${position.row}-${position.col}`),
  );
});

function isSelected(row, col) {
  return selected.value && selected.value.row === row && selected.value.col === col;
}

function isLegalTarget(row, col) {
  return legalTargets.value.has(`${row}-${col}`);
}

function selectSquare(row, col) {
  const piece = props.game.getPiece(row, col);

  if (!selected.value) {
    if (piece && props.game.getLegalMoves({ row, col }).length > 0) {
      selected.value = { row, col };
    }
    return;
  }

  if (isSelected(row, col)) {
    selected.value = null;
    return;
  }

  const moved = props.game.movePiece(selected.value, { row, col });

  if (moved) {
    selected.value = null;
    return;
  }

  if (piece && props.game.getLegalMoves({ row, col }).length > 0) {
    selected.value = { row, col };
    return;
  }

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
          isLegalTarget(rowIndex, colIndex) ? 'legal-target' : '',
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
