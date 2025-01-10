// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxtjs/fontaine", "@nuxt/ui"],
  css: ["~/assets/css/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite:{
    css:{
      preprocessorOptions:{
        scss:{
          additionalData:'@use "~/assets/const/index.scss" as *;' 
        }
      }
    }
  }
});