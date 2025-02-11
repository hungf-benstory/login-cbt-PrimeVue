# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).




There are quite a few points of feedback:
File Directory Structure: The file directory structure is not well-organized. This can be critical in a team development environment. Please refer to other team members' file structures. If none are available, request them or ask for guidance.
CSS/SCSS/SASS Management: CSS/SCSS/SASS files should be managed within the assets directory. This means these files are considered part of the assets.
Vue File Naming Rules: You have correctly used StudlyCase for component files. However, components inside the pages directory represent the smallest layout units and should be named using camelCase.
Tailwind Version Update:
Our team plans to transition from Tailwind 3 to Tailwind 4.
Tailwind 3 builds fine in the development environment, but it causes structural errors with Vite during production builds.
CSS Best Practices: Only :root, body, html, and loading should be declared in CSS. Your CSS file contains incorrect declarations like h1, h4, etc. These should be moved to the SCSS file.
App Declaration in src/main.js: Writing the app declaration in a horizontal style reduces readability. Please add line breaks when using the use function and improve readability by breaking lines in import and declaration statements.
nextTick Usage in src/router.js: You've used nextTick inside beforeEach, which is a critical mistake. nextTick executes after a full lifecycle, and while this might not cause issues with Vue CLI, it can expose sensitive information if migrated to Nuxt. This needs to be corrected.
presets Folder in src: There should be no presets folder inside src (as it can be confused with Vite presets). Instead, applying the Noir theme should be handled through the plugins folder in Vue.
GSAP Declaration in FormLogin.vue: You correctly declared GSAP inside onMounted. However, since GSAP uses dynamic imports, it may cause issues with the parent component's scope. Please adjust your code to declare GSAP like this:
onMounted(() => {
  nextTick(() => {
    // declare gsap here
  });
});
Layouts Folder Structure: The layouts folder currently exists under src/components. It should be moved directly under src/, as per Vue.js best practices.
UI/UX Dark Theme Consideration: DarkTheme support needs to be considered. The issue is not the lack of DarkTheme support, but that PrimeVue themes have DarkTheme settings enabled by default. You should add 'none' to theme.options.darkModeSelector in the PrimeVue declaration options.