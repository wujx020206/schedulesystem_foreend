module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost', // 后端接口的域名
    port: 8080, // 前端启动的端口
    https: false,
    hotOnly: false,
    // 接口名前面要有api
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080', // 后端接口地址，和后端保持一致
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      }
    }
  },
};
