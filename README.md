# Litten
![GitHub](https://img.shields.io/github/license/liuxian496/litten)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/liuxian496/litten/litten.yml)
[![Coverage Status](https://coveralls.io/repos/github/liuxian496/litten/badge.svg?branch=main)](https://coveralls.io/github/liuxian496/litten?branch=main)
![GitHub Repo stars](https://img.shields.io/github/stars/liuxian496/litten)


<p>Litten是一个React UI控件库，样式风格参考Google's Material Design，并做了适当取舍。键盘操作、读屏等可访问性，依据W3C「ARIA Authoring Practices Guide（APG）」进行开发。</p>

## 主页
[github.io主页](https://liuxian496.github.io/litten/)

[chromatic主页](https://main--650fa3c0e5326b2081708310.chromatic.com/)

## 使用

### 1. 安装litten
npm i litten

### 2. litten依赖的库
litten，依赖下面的库。
<code>classnames</code>
<code>cyndi</code>
<code>litten-hooks</code>
<code>lodash</code>
<code>number-precision</code>
<code>react</code>
<code>react-dom</code>

### 3. 引入样式
控件的样式，在打包好的dist/assets下，请按需引用
<code>import "litten/dist/assets/button.css";</code>

### 3. form
可以使用litten-form进行表单数据的收集和控制
[litten-form](https://liuxian496.github.io/litten/)

## 开发与测试
<p>使用Storybook进行litten的开发和测试。使用TypeScript作为主要的开发语言。</p>

### 1. 安装依赖
打开终端，运行：yarn install

### 2. 启动调试工程
打开终端，运行：yarn storybook

### 3. 测试覆盖率
调式工程启动后，打开另一个终端，
运行：yarn test-storybook --coverage 

### 4. 生成 lcov report
1. 运行：npx nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/storybook
2. 使用浏览器打开 coverage/storybook/lcov-report/index.html 文件，即可查看报告

## 如果你想请我喝一杯蜜雪冰城（Buy Me a Mixue Ice Cream & Tea）
<img src=".\\public\\wechat.jpg" height="360">
<img src=".\\public\\alipay.jpg" height="360">
