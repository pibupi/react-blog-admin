const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackExternals
} = require('customize-cra')
const modifyVars = require('./lessThemeVars')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
    pwa: {
      iconPaths: {
        favicon32: 'github.ico',
        favicon16: 'github.ico',
        appleTouchIcon: 'github.ico',
        maskIcon: 'github.ico',
        msTileImage: 'github.ico'
      }
    }
  }),
  addDecoratorsLegacy(),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  }),
  addWebpackExternals({
    //不做打包处理配置，如直接以cdn引入的
    react: 'React',
    redux: 'Redux',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'react-router-dom': 'ReactRouterDOM',
    lodash: {
      commonjs: 'lodash',
      umd: 'lodash',
      root: '_'
    }
  })
)
