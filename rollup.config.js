import sucrase from '@rollup/plugin-sucrase';
import typescript from '@rollup/plugin-typescript';

const is_publish = !!process.env.PUBLISH;

const ts_plugin = is_publish
    ? typescript({ include: 'src/**', typescript: require('typescript') })
    : sucrase({ transforms: ['typescript'] });

const external = (id) => id.startsWith('@liveshopper/');

export default [
    {
        input: './index.ts',
        output: [
            {
                file: `./dist/life.js`,
                format: 'cjs',
                paths: (id) => id.startsWith('@shaunlmason/') && `${id.replace('@shaunlmason', '.')}`
            }
        ],
        external,
        plugins: [
            // replace({ __VERSION__: pkg.version }),
            // globals(),
            // builtins(),
            // resolve(),
            // commonjs({ include: ['node_modules/**'] }),
            // json(),
            ts_plugin
        ]
    }
];
