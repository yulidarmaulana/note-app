<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import "primeicons/primeicons.css";

const isDarkMode = ref(false);

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    const root = document.documentElement; // Access the root element
    root.classList.toggle('p-dark', isDarkMode.value); // Toggle the dark class
};
</script>

<template>
  <nav class="px-36 py-4">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold">Noty.</RouterLink>
      <button @click="toggleDarkMode" class="">
        <i :class="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"></i>
      </button>
    </div>
  </nav>
</template>

<style>
/* You can add styles for light and dark mode here if needed */
.p-dark {
  background-color: #1f2937;
  color: #fff;
}
</style>
