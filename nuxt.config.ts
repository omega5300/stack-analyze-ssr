export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      bitlyToken: process.env.BITLY_TOKEN,
      movieToken: process.env.MOVIE_TOKEN,
      twitchClient: process.env.TWITCH_CLIENT,
      twitchToken: process.env.TWITCH_TOKEN,
    }
  },
  app: {
    head: {
      title: 'stack-analyze',
      charset: 'utf-8',
      htmlAttrs: { lang: 'en' }
    }
  },
  modules: ['@nuxtjs/ionic'],
  css: ['~/assets/css/ionic.css', '~/assets/css/globals.css'],
  ionic: {
    config: {
      mode: "md"
    },
    integrations: {
      meta: true,
    }
  }
})
