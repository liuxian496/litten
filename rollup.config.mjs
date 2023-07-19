import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-minification";
import less from 'less';
import { readFileSync } from 'node:fs';

// 使用 import.meta.url 可以使路径相对于当前源文件而不是 process.cwd()。
// 更多信息参见：
// https://nodejs.org/docs/latest-v16.x/api/esm.html#importmetaurl
const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url))
);

const isProd = process.env.NODE_ENV === "production";

console.log("isProd: " + isProd);

const babelOptions = {
  babelrc: false,
  presets: ["@babel/preset-env"],
  extensions: ['.ts', '.tsx', '.less'],
  babelHelpers: 'bundled',
  exclude: '**/node_modules/**'
};

function getTerser(isProd) {
  return isProd ? terser() : undefined;
}

const processLess = function (context, payload) {
  return new Promise((resolve, reject) => {
    less.render(
      {
        file: context
      },
      function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
    less.render(context, {}).then(
      function (output) {
        if (output && output.css) {
          resolve(output.css);
        } else {
          reject({});
        }
      },
      function (err) {
        reject(err);
      }
    );
  });
};

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: !isProd
    },
    {
      file: packageJson.module,
      format: "es",
      sourcemap: !isProd
    }
  ],
  plugins: [
    peerDepsExternal({ includeDependencies: true }),
    resolve(),
    commonjs({ sourceMap: !isProd }),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    getTerser(isProd),
    postcss({
      extract: true,
      process: processLess
    }),
    babel(babelOptions),
    json()
  ],
};