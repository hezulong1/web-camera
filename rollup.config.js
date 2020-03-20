import path from 'path';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import liveServer from 'rollup-plugin-live-server';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const isWatch = process.env.ROLLUP_WATCH;
const isProd = mode === 'production';

const plugins = [
  json(),
  eslint(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(mode),
    '__VERSION__'         : JSON.stringify(pkg.version)
  }),
  alias({
    entries: {
      'u': path.resolve(__dirname, 'src/util.js')
    }
  }),
  resolve(),
  babel({
    runtimeHelpers: true,
    exclude       : ['node_modules/**']
  }),
  commonjs(),
  isProd && uglify({
    compress: {
      pure_getters: true,
      unsafe      : true,
      unsafe_comps: true
    }
  })
];

const page = [
  'index',
  'native',
  'flash'
];

const config = page.map((page, index) => ({
  input : `src/${page}.js`,
  output: {
    file     : isProd ? `dist/${page}.min.js` : `test/${page}.js`,
    format   : 'iife',
    name     : `WebCamera${page !== 'index' ? (page.charAt(0).toUpperCase() + page.slice(1)) : ''}`,
    sourcemap: true
  },
  plugins: [
    ...plugins,
    isWatch && liveServer({
      port: 3000 + index,
      root: 'test',
      file: `${page}.html`,
      open: false,
      wait: 500
    })
  ]
}));

const esmPlugins = [...plugins];
esmPlugins.pop();

config.push({
  input : `src/index.js`,
  output: {
    file     : isProd ? `dist/index.esm.js` : `test/index.esm.js`,
    format   : 'esm',
    name     : 'named',
    sourcemap: true
  },
  plugins: esmPlugins
});

export default config;
