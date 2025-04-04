import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "nuxt-vuefire",
    "@compodium/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  // css: ['~/assets/css/main.css'],
  ssr: false,
  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: "AIzaSyD86howibg73HY4rJ6t6hxGAWDAm_-GFTE",
      authDomain: "comment-to.firebaseapp.com",
      projectId: "comment-to",
      storageBucket: "comment-to.firebasestorage.app",
      messagingSenderId: "53160670358",
      appId: "1:53160670358:web:62a777354a4f82b6ea7eb7",
      measurementId: "G-QFYX8Y6LS0",
    },
  },
});
