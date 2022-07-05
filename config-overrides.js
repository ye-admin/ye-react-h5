var {
  override,
  addLessLoader,
  addWebpackAlias,
  fixBabelImports,
  addPostcssPlugins,
  addWebpackPlugin,
} = require('customize-cra');
var path = require('path');
var defaultSettings = require('./config/defaultSettings');
const { DefinePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");


const addCompression = () => config => {
  if (process.env.REACT_APP_ENV === 'live') {
    config.plugins.push(
      // gzip压缩
      new CompressionWebpackPlugin({
        test: /\.(css|js)$/,
        // 只处理比1kb大的资源
        threshold: 1024,
        // 只处理压缩率低于90%的文件
        minRatio: 0.9
      })
    );
  }

  return config;
};
// 查看打包后各包大小
const addAnalyzer = () => config => {
  if (process.env.REACT_APP_ENV === 'analyzer') {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};


module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@hd": "2px",
        "@primary-color": "#1DA57A", // Ant Design更改主题颜色
      },
      cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
      cssModules: {
        localIdentName: "[path][name]__[local]--[hash:base64:5]", // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      },
    },
  }),
  addPostcssPlugins([
    require('postcss-px-to-viewport')({
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 3,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    })
  ]),
  addWebpackPlugin(new DefinePlugin({
    VERSION: JSON.stringify(defaultSettings.version),
  })),
  addCompression(),
  addAnalyzer()
)