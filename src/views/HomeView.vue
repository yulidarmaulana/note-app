<script setup>
import { ref, onMounted } from 'vue';
import NavbarComponent from '../components/NavbarComponent.vue';
import EditorComponent from '../components/EditorComponent.vue';
import supabase from '../services/supabase';

const title = ref('');
const content = ref('');
const category = ref('');
const notesList = ref([]);
const isEditing = ref(false); 
const currentNoteId = ref(null);
const sortAscending = ref(true);  // State for sorting order

const saveNote = async (newTitle, newContent, newCategory) => {
  if (newTitle && newContent) {
    if (isEditing.value) {
      const { data, error } = await supabase
        .from('notes')
        .update({ title: newTitle, content: newContent, category: newCategory })
        .eq('id', currentNoteId.value);

      if (error) {
        console.error('Error updating note:', error.message);
      } else {
        await loadNotes();
        resetForm();
      }
    } else {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ title: newTitle, content: newContent, category: newCategory }]);

      if (error) {
        console.error('Error inserting note:', error.message);
      } else {
        await loadNotes();
        resetForm();
      }
    }
  } else {
    console.warn('Title and Content cannot be empty!');
  }
};

const loadNotes = async () => {
  const { data, error } = await supabase.from('notes').select('*');
  if (error) {
    console.error('Error loading notes:', error.message);
  } else {
    notesList.value = data;
    sortNotes(); // Sort notes after loading
  }
};

// Sort function based on date
const sortNotes = () => {
  notesList.value.sort((a, b) => {
    return sortAscending.value 
      ? new Date(a.created_at) - new Date(b.created_at) // Ascending
      : new Date(b.created_at) - new Date(a.created_at); // Descending
  });
};

const toggleSortOrder = () => {
  sortAscending.value = !sortAscending.value; // Toggle the order
  sortNotes(); // Resort after toggling
};

const deleteNote = async (id) => {
  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting note:', error.message);
  } else {
    console.log('Note deleted:', data);
    await loadNotes();
  }
};

const editNote = (note) => {
  title.value = note.title;
  content.value = note.content;
  category.value = note.category; 
  currentNoteId.value = note.id;
  isEditing.value = true;
};

const resetForm = () => {
  title.value = '';
  content.value = '';
  category.value = ''; 
  isEditing.value = false;
  currentNoteId.value = null;
};

onMounted(loadNotes);
</script>

<template>
  <NavbarComponent />
  
  <div class="md:px-24">
    <EditorComponent 
      :title="title" 
      :content="content" 
      :category="category"  
      :isEditing="isEditing" 
      @save-note="saveNote"  
      @reset-form="resetForm" 
    />

    <div class="mt-4">
      <div class="flex justify-between">
        <h2 class="text-lg font-medium">Notes List</h2>
      <div class="flex items-center mb-2">
        <button 
          @click="toggleSortOrder" 
          class="flex items-center rounded-md p-1 bg-gray-100 hover:bg-gray-300 text-gray-800">
          <i :class="sortAscending ? 'pi pi-arrow-up' : 'pi pi-arrow-down'" style="font-size: 0.6rem; font-weight: 800;"></i>
          <span class="ml-1" style="font-size: 0.8rem;">{{ sortAscending ? 'Oldest' : 'Newest' }}</span>
        </button>
      </div>
      </div>
      
      <ul>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-1 lg:gap-2">
          <li v-for="note in notesList" :key="note.id" class="border p-2 my-2 rounded bg-slate-50">
            <h3 class="font-bold text-gray-700">{{ note.title }}</h3>
            <p class="text-gray-600">{{ note.content }}</p>
            <p class="text-gray-400 text-xs">Category: {{ note.category }}</p>
            <div class="flex justify-between my-2">
              <span class="text-gray-400 text-xs">
                Created: {{ new Date(note.created_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false }) }} 
                <br />
                Updated: {{ new Date(note.updated_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false }) }}
              </span>

              <div>
                <button @click="editNote(note)" class="px-2 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 mr-2">
                  <i class="pi pi-pencil"></i>
                </button>
                <button @click="deleteNote(note.id)" class="px-2 py-1 bg-rose-500 text-white rounded-md hover:bg-rose-800">
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
    
  </div>
</template>