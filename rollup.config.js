import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',

  output: {
    file: 'dist/index.cjs',
    format: 'cjs',
    exports: 'default'
  },

  plugins: [
    typescript()
  ],

  external: () => true
};
