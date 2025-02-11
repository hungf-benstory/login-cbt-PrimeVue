<template>
  <div class="flex align-items-center justify-content-center h-screen">
    <div class="text-center">
      <i class="pi pi-exclamation-triangle" style="font-size: 4rem; color: #ff6b6b"></i>
      <h1 class="mt-4">404</h1>
      <p class="text-2xl mb-4">Oops! Page Not Found</p>
      <Button label="Go to Home" icon="pi pi-home" class="p-button-rounded p-button-primary" @click="goHome" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

const router = useRouter();

function goHome() {
  router.push('/');
}
</script>

<style scoped>
.h-screen {
  height: 100vh;
}

h1 {
  font-size: 5rem;
  color: #333;
}

p {
  color: #555;
}

.text-2xl {
  font-size: 1.5rem;
}
</style>
