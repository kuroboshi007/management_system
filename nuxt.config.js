var FileConfigPath = require('./aliasConfig/index')
module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',
  head: {
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { 'http-equiv': 'cache-control', content: 'no-cache' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'learn ssr' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      // { innerHTML: '{var userInfo = "[[${userInfo}]]" }' }
    ]
  },
  /* common css */
  css: [
    './assets/normalize.css',
    './assets/animation.less',
    './assets/common.less'
  ],
  /*
  ** Customize the progress bar color
  */
 loading: { color: '#3B8070', height: '3px' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    // publicPath: 'http://xiaobustatic.bind.ai/manage-web-server/',
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      /* 为了支持object.assign用法（并非绝对，因为项目为pc端可以忽略打包后85k的大小，能更加有效的支持es6） */
      config.entry['polyfill'] = ['babel-polyfill']
      /* add alias 配置 */
      Object.assign(config.resolve.alias, FileConfigPath)
    },
    /* 为了避免axios被重复打包 （在多个页面使用了import axios的情况下） */
    vendor: ['axios', './plugins/iview.js']
  },
  router: {
    // Run the middleware/authentication.js on every pages
    middleware: ['authentication']
  },
  modules: [
    '@nuxtjs/axios'
  ],
  /* ssr default true */
  plugins: [
    { src: '~plugins/iview.js', ssr: true},
    { src: '~plugins/viser.js', ssr: true}
  ],
  axios: {
    proxy: true
    // 这里的true也可以是一个包含默认配置的对象
  },
  proxy: {
    '/api': {
      target: '',
      pathRewrite: { '^/api': '/api' },
      // changeOrigin: true
    },
  }
}