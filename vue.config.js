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
  css: { extract: false },
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:8083`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    client: {
      overlay: false
    }
  }
})
