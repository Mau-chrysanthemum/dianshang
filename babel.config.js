module.exports = {
  presets: ['@vue/app'],
  plugins: [ // 按需导入element-ui组件必须要配置的地方
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
