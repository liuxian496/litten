# litten
[![Coverage Status](https://coveralls.io/repos/github/liuxian496/litten/badge.svg?branch=developer)](https://coveralls.io/github/liuxian496/litten?branch=developer)

## 使用yarn安装依赖
打开终端，运行：yarn install

## 启动调试工程
打开终端，运行：yarn storybook

## 测试覆盖率
调式工程启动后，打开另一个终端，
运行：yarn test-storybook --coverage 
再运行 yarn test-storybook

## 生成 lcov report
1. 运行：npx nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/storybook
2. 使用浏览器打开 coverage/storybook/lcov-report/index.html 文件，即可查看报告