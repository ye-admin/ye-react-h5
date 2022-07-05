const createProxyMiddleware = require('http-proxy-middleware');

const targetMap = {
  'dev': 'https://zlsy-dev.xiaoxiongyinyue.com'
};

module.exports = function (app) {
  app.use(
    '/music',
    createProxyMiddleware({
      target: targetMap[process.env.REACT_APP_ENV],
      changeOrigin: true,
    })
  );
};
