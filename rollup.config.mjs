// rollup.config.js
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.ts',
  external: ['vue', 'lodash-es'],
  output: [
    {
      file: 'lib/sxl-ui.esm.js',
      format: 'esm'
    },
    {
      file: 'lib/sxl-ui.umd.js',
      format: 'umd',
      name: 'sxl-ui',
      globals: {
        vue: 'Vue',
        'lodash-es': 'lodashEs'
      }
    }
  ],
  plugins: [
    nodeResolve({
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
    terser(),
    postcss({
      plugins: []
    })
  ]
}
