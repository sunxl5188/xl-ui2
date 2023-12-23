// rollup.config.js
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import scss from 'rollup-plugin-scss'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import CleanCSS from 'clean-css' // 压缩css
import { writeFileSync } from 'fs' // 写文件

export default {
  input: 'src/index.ts',
  external: ['vue', 'lodash-es', 'lodash'],
  output: [
    {
      file: 'lib/index.esm.js',
      format: 'esm'
    },
    {
      file: 'lib/xl-ui.umd.js',
      format: 'umd',
      name: 'xl-ui2',
      globals: {
        vue: 'Vue',
        'lodash-es': 'lodashEs'
      }
    }
  ],
  plugins: [
    nodeResolve({
      browser: true,
      extensions: ['.js', '.ts']
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    typescript(),
    vue(),
    babel({
      extensions: ['.vue', '.ts', '.js', '.tsx', '.jsx'],
      exclude: 'node_modules/**',
      runtimeHelpers: true
      //plugins: ['external-helpers'],
      //externalHelpers: true
    }),
    scss(),
    //terser(),
    postcss({
      //plugins: [autoprefixer(), cssnano()],
      extract: '../dist/index.css'
    }),
    json()
    /* css({
      output(style) {
        // 压缩 css 写入 dist/base-ui.css
        //writeFileSync('dist/xl-ui.css', new CleanCSS().minify(style).styles)
      }
    }) */
  ],
  // 用来指定代码执行环境的参数，解决this执行undefined问题
  context: 'window'
}
