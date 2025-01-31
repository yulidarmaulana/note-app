<script setup>

</script>

<template class="bg-slate-800">
  <div class="not-found gap-2">
    <h1 class="text-slate-900">Not Found</h1>
    <router-link to="/" class="text-slate-100 bg-slate-500 rounded px-2 py-2">back to home</router-link>
  </div>
</template>

<style>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
  text-align: center;
}
</style>