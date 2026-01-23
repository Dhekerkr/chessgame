<script setup>
const props = defineProps({
  history: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <aside class="move-history">
    <h2>Move History</h2>
    <ol v-if="history.length" class="history-list">
      <li v-for="(entry, index) in history" :key="`move-${index}`">
        {{ entry }}
      </li>
    </ol>
    <p v-else class="history-empty">No moves yet.</p>
  </aside>
</template>
