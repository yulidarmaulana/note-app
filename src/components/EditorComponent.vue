<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const form = defineProps({
  title: String,
  content: String,
  category: String,  
  isEditing: Boolean,
});

const emit = defineEmits(['save-note', 'reset-form']);

const newTitle = ref(form.title);
const newContent = ref(form.content);
const newCategory = ref(form.category); 

// Watch for prop changes and update local refs
watch(() => form.title, (newValue) => newTitle.value = newValue);
watch(() => form.content, (newValue) => newContent.value = newValue);
watch(() => form.category, (newValue) => newCategory.value = newValue);  // Watch category

const save = (e) => {
  emit('save-note', newTitle.value, newContent.value, newCategory.value) // Include category in emit
  resetForm();
};

const cancel = () => {
  emit('reset-form');
};

const resetForm = () => {
  newTitle.value = '';
  newContent.value = '';
  newCategory.value = '';
};

</script>

<template>
  <div>
    <input 
      v-model="newTitle" 
      placeholder="Title"
      class="p-2 border border-gray-300 rounded mb-2 w-full" 
    />
    <textarea 
      v-model="newContent" 
      placeholder="Content" 
      class="p-2 border border-gray-300 rounded mb-2 w-full"
    ></textarea>
    <input 
      v-model="newCategory"    
      placeholder="Category"
      class="p-2 border border-gray-300 rounded mb-2 w-full" 
    />

    <div class="text-end">
      <button 
        @click="save" 
        class="px-3 py-2 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        {{ form.isEditing ? 'Update' : 'Save' }}
      </button>
      <button 
        v-if="form.isEditing" 
        @click="cancel" 
        class="ml-2 px-4 py-2 bg-gray-400 text-white rounded"
      >
        Cancel
      </button>
    </div>

  </div>
</template>