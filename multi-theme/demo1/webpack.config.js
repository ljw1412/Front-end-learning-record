const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')
const themePath = path.resolve(__dirname, 'src/themes')
const styleCorePath = path.join('src', 'styles', 'core.scss')

const getFilename = (filepath) => path.parse(filepath).name

module.exports = {
  mode: 'production',
  entry: { main: path.resolve(__dirname, 'src/entry.js') },
  output: { path: path.resolve(__dirname, 'dist') },
  plugins: [
    // 打包时清理输出文件夹
    new CleanWebpackPlugin(),
    // 样式提取到 .css 文件中
    new MiniCssExtractPlugin(),
    // 创建 HTML 文件
    new HtmlWebpackPlugin({ title: '主题风格' }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // 'style-loader',
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: (content, loaderContext) => {
                const { resourcePath, rootContext } = loaderContext
                const relativePath = path.relative(rootContext, resourcePath)
                if (relativePath.includes(path.join('src', 'themes'))) {
                  const importText = '@import "../styles/core.scss";'
                  // 在尾部引入使用变量的页面样式
                  if (relativePath.includes('default.scss')) {
                    content += importText
                  } else {
                    const name = getFilename(relativePath)
                    content += `:root[data-theme=${name}]{${importText}}`
                  }
                }
                return content
              },
            },
          },
        ],
      },
    ],
  },
}
