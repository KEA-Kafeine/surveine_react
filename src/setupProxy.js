const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
      // target: "https://dedc-210-119-237-45.ngrok-free.app",
      // changeOrigin: true,
    })
  );
};
