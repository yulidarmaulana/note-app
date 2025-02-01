<script setup>

import NavbarComponent from '../components/NavbarComponent.vue'

</script>

<template class="bg-slate-300">
  <NavbarComponent />

  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">About</h1>
    <router-link to="/" class="text-slate-100 bg-slate-500 rounded px-2 py-2">back to home</router-link>
  </div>
</template>

<style scoped>

</style>
