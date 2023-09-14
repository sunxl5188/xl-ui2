const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    output: {
      libraryExport: 'default'
    }
  },
  css: { extract: false }
})
