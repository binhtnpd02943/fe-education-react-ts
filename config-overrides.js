const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(

  // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    ['@']: path.resolve(__dirname, './src'),
  }),

  
  // addLessLoader({
  //   lessOptions: {
  //     javascriptEnabled: true,
  //     modifyVars: {
  //       "@primary-color": "#216FED", // customize as needed
  //       "@layout-header-background" : '#216fed'
  //       // "@link-color": "#e6a07c", // customize as needed
  //       // "@font-size-base": "18px", // customize as needed
  //     },
  //   },
  // })

);