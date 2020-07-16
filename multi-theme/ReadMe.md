# 多主题页面实现思路

### 打包
```sh
npm run build:[:demoName]   # example: npm run build:demo1
yarn build:[:demoName]      # example: yarn build:demo1
```

### 查看
直接使用浏览器打开`dist/index.html`或`index.html`查看效果。

**demo1**

使用样式作用域 `:root[data-theme=*]`或`html[data-theme=*]`。
在html节点上添加data-theme属性。
css使用属性选择器。
通过webpack打包自动将theme的样式添加到对应主题的作用域中。

**demo2**

使用webpack将主题设为入口，
将每个主题单独进行打包，
自定义`remove-theme-js-plugin`插件，删除生成主题外额外生成的无用文件。
最后采用`link`标签外部引用样式，切换主题就是切换`link`的引用地址。

**demo3**

采用Css Variables方法进行主题切换，该方法可能存在兼容性问题。