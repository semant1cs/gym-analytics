export default defineNuxtConfig({
  devtools: { enabled: false },
  extends: ['./components/admin'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-gtag',
    'nuxt-quasar-ui',
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  quasar: {
    sassVariables: './assets/css/quasar.variables.scss',
    plugins: [
      'Notify',
      'LoadingBar'
    ],
    extras: {
      font: 'roboto-font',
      animations: 'all',
      fontIcons: ['mdi-v7']
    },
    config: {
      notify: {
        position: 'top',
        actions: [{ icon: 'close', color: 'white' }]
      },
      loadingBar: {
        color: 'primary'
      }
    }
  },


  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        port: 24678
      }
    }
  },

  compatibilityDate: '2024-10-06',
})