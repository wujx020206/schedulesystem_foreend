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
      '/store_url': {
        target: 'http://localhost:8081', // 后端接口地址
        changeOrigin: true,
        pathRewrite: {
          "^/store_url": ''
        }
      },
      '/staff_url': {
        target: 'http://localhost:8082', // 后端接口地址
        changeOrigin: true,
        pathRewrite: {
          "^/staff_url": ''
        }
      },
    }
  },
};
