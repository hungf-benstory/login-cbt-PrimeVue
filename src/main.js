import "primeicons/primeicons.css";
import "./style.css";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import Noir from './presets/Noir.js';
import { createPinia } from "pinia";
import router from './router'
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
const app = createApp(App);
const pinia = createPinia()
app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            prefix: 'p',
            darkModeSelector: '.p-dark',
            cssLayer: false,
        }
    }
}).use(router).use(ToastService).use(pinia).mount('#app')
