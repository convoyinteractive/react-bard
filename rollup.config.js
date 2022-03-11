import pkg from './package.json'
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: false,
        strict: false
      }
    ],
    plugins: [
      typescript()
    ],
    external: ['react', 'react-dom']
  }
