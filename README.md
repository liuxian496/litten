# Litten
![GitHub](https://img.shields.io/github/license/liuxian496/litten)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/liuxian496/litten/litten.yml)
[![Coverage Status](https://coveralls.io/repos/github/liuxian496/litten/badge.svg?branch=main)](https://coveralls.io/github/liuxian496/litten?branch=main)
![GitHub Repo stars](https://img.shields.io/github/stars/liuxian496/litten)



<p>Litten是一个React UI控件库，样式风格参考Google's Material Design，并做了适当取舍。</p>

## 使用

### 1. 引入Litten
npm i litten

### 2. Litten的依赖
使用Litten，需要引入下列两个库。
1. <p>classnames</p>：npm i classnames
2. <p>lodash</p>：npm i lodash

## 开发与测试
<p>使用Storybook进行Litten的开发和单元测试。语义选择TypeScript。</p>

### 1. 安装依赖
打开终端，运行：yarn install

### 2. 启动调试工程
打开终端，运行：yarn storybook

### 3. 测试覆盖率
调式工程启动后，打开另一个终端，
运行：yarn test-storybook --coverage 
再运行 yarn test-storybook

### 4. 生成 lcov report
1. 运行：npx nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/storybook
2. 使用浏览器打开 coverage/storybook/lcov-report/index.html 文件，即可查看报告

## Buy Me a Mixue Ice Cream & Tea
<img src=".\\public\\wechat.jpg" height="360">
<img src=".\\public\\alipay.jpg" height="360">
 