import pkg from './package.json'
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'es',
            exports: 'named',
            sourcemap: true
        }
    ],
    plugins: [
      typescript()
    ],
    external: ['react', 'react-dom']
  }
