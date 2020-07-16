// 移除把scss当做入口而产生的js文件
class RemoveThemeJsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('RemoveThemeJsPlugin', compilation => {
      Object.keys(compilation.assets)
        .filter(file => /^theme\/.+\.js/.test(file))
        .forEach(file => {
          console.log(file)
          delete compilation.assets[file]
        })
    })
  }
}

module.exports = RemoveThemeJsPlugin
