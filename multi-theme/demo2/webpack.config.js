const RemoveThemeJsPlugin = require('./remove-theme-js-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const fs = require('fs')
const path = require('path')
const themePath = path.resolve(__dirname, 'src/themes')
const styleCorePath = path.join('src', 'styles', 'core.scss')

const getFilename = filepath => path.parse(filepath).name

// 获取主题入口
const getThemeEntry = () => {
  const files = fs.readdirSync(themePath)
  entries = {}
  files.forEach(name => {
    const filename = getFilename(name)
    entries['theme/' + filename] = path.join(themePath, name)
  })
  return entries
}
const themeEntry = getThemeEntry()

module.exports = {
  mode: 'production',
  entry: { main: path.resolve(__dirname, 'src/entry.js'), ...themeEntry },
  output: { path: path.resolve(__dirname, 'dist') },
  plugins: [
    // 打包时清理输出文件夹
    new CleanWebpackPlugin(),
    // 样式提取到 .css 文件中
    new MiniCssExtractPlugin(),
    // 创建 HTML 文件，使用excludeChunks排除入口
    new HtmlWebpackPlugin({
      title: '主题风格',
      excludeChunks: Object.keys(themeEntry)
    }),
    new RemoveThemeJsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: (content, loaderContext) => {
                const { resourcePath, rootContext } = loaderContext
                const relativePath = path.relative(rootContext, resourcePath)
                if (relativePath.includes(path.join('src', 'themes'))) {
                  // 在尾部引入样式
                  content += '@import "../styles/core.scss";'
                }
                return content
              }
            }
          }
        ]
      }
    ]
  }
}
