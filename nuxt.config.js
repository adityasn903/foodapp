const pkg = require('./package');
const bodyParser = require('body-parser')
const session = require('express-session')


module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:'stylesheet', href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'},
      {href:'http://fonts.googleapis.com/css?family=Droid+Serif', rel:'stylesheet', type:'text/css'},
      {href:'https://fonts.googleapis.com/css?family=Roboto&display=swap', rel:'stylesheet', type:'text/css'},
      {href:'http://fonts.googleapis.com/css?family=Lobster+Two', rel:'stylesheet', type:'text/css'},
      {href:'http://fonts.googleapis.com/css?family=Oleo+Script', rel:'stylesheet', type:'text/css'},
      {href:"https://fonts.googleapis.com/css?family=Poppins:400,600", rel:"stylesheet", type:'text/css'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/myeventbus.js'
  ],
  serverMiddleware: [
      // body-parser middleware
      bodyParser.json(),
      // session middleware
      session({
        secret: 'super-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
      }),
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
