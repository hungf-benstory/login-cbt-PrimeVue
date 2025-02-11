<script setup>
import { ref } from 'vue';
import logo from '@/assets/images/logo.png';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';

const items = ref([
  { label: 'Home', icon: 'pi pi-home', command: () => { window.location = '#'; } },
  { label: 'About', command: () => { window.location = '#'; } },
  { label: 'Services', command: () => { window.location = '#'; } },
  { label: 'Pricing', command: () => { window.location = '#'; } },
  { label: 'Logout', icon: 'pi pi-sign-out', command: () => { handleLogout(); } }
]);
const authStore = useAuthStore();
const handleLogout = () => {
  authStore.logout();
};

const toggleMenu = () => {
};
</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img :src="logo" alt="Logo" class="w-10 h-10" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Benstory</span>
      </a>
      <Button icon="pi pi-bars" @click="toggleMenu" class="p-button-text md:hidden" aria-controls="navbar-default" aria-expanded="false" />
      <Menubar :model="items" class="hidden md:block md:w-auto" />
    </div>
  </nav>
</template>

<style scoped>
</style>
