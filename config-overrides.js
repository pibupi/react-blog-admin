const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy
} = require('customize-cra');
const modifyVars = require('./lessThemeVars');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
    pwa: {
      iconPaths: {
        favicon32: "github.ico",
        favicon16: "github.ico",
        appleTouchIcon: "github.ico",
        maskIcon: "github.ico",
        msTileImage: "github.ico"
      }
    }
  }),
  addDecoratorsLegacy(),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  })
);
