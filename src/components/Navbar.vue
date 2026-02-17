<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
    <div class="container-fluid">
      <span class="navbar-brand fw-bold">📰 Article Dashboard</span>
      <div class="d-flex align-items-center gap-3">
        <i class="bi bi-bell fs-5"></i>
        <router-link :to="{ name: 'profile' }"><img :src="profileStore.user?.avatar" class="rounded-circle" width="32" height="32"/></router-link>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { UseProfile } from '@/stores/profile';
import { onMounted } from 'vue';

let profileStore = UseProfile()
onMounted(async () => {
  await profileStore.fecthProfile()
})
</script>