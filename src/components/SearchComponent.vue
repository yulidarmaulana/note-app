<template>
  <div class="mb-4">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search..."
      class="w-full px-4 py-2 m-0 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Props
const props = defineProps({
  notes: {
    type: Array,
    required: true,
  },
});

// Emits
const emit = defineEmits(['filtered-notes']);

// State
const searchTerm = ref('');

// Watch for changes in the search term and emit the filtered notes
watch(searchTerm, (newTerm) => {
  const filtered = props.notes.filter(note => {
    return (
      note.title.toLowerCase().includes(newTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(newTerm.toLowerCase()) ||
      note.category.toLowerCase().includes(newTerm.toLowerCase())
    );
  });
  emit('filtered-notes', filtered);
});
</script>

<style scoped>
/* Optional: Add any additional styles here */
</style>
