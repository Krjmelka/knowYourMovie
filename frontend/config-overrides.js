 const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
   style: true
  }),
 addLessLoader({
   javascriptEnabled: true,
   modifyVars: { 
       '@primary-color': '#7424ad',
       '@border-radius-base': '0px',
       '@btn-disable-bg' : '@btn-primary-bg',
       '@btn-disable-color' : 'white',
       '@btn-disable-border' : '@btn-disable-bg'
       
       

    },
 }),
);