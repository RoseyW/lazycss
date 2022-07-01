import typescript from 'rollup-plugin-typescript2';

const mode = process.env.MODE;
const isProd = mode === 'prod';
const pkg = require('./package.json');

export default {
    input: `src/index.ts`,
    output: [
        {
            file: pkg.main,
            exports: 'named',
            format: 'cjs',
            sourcemap: !isProd
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: !isProd
        },
        {
            file: 'build/lazyCss.global.js',
            name: 'Lazy',
            format: 'iife',
            sourcemap: !isProd
        },
    ],
    plugins: [typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: { compilerOptions: { sourceMap: !isProd } }
    })],
};
