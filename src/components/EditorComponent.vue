<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  title: String,
  content: String,
  isEditing: Boolean,
});

const emit = defineEmits(['save-note', 'resetForm']);

const newTitle = ref(props.title);
const newContent = ref(props.content);

// Watch for prop changes and update local refs
watch(() => props.title, (newValue) => newTitle.value = newValue);
watch(() => props.content, (newValue) => newContent.value = newValue);



const save = () => {
  emit('save-note', newTitle.value, newContent.value);
  this.$refs['refFormName'].resetFields();
};

const cancel = () => {
  emit('resetForm');
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
    <div class="text-end">
      <button 
        @click="save" 
        class="px-3 py-2 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        {{ props.isEditing ? 'Update' : 'Save' }}
      </button>
      <button 
        v-if="props.isEditing" 
        @click="cancel" 
        class="ml-2 px-4 py-2 bg-gray-400 text-white rounded"
      >
        Cancel
      </button>
    </div>
  </div>
</template>