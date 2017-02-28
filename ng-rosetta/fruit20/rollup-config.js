import rollup from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'aot/unbundled_js/src/main-aot.js',
    dest: 'aot/bundle.js', // output a single application bundle
    sourceMap: false,
    format: 'iife',
    targets: 'es5',
    plugins: [
        postcss({
            extensions: ['.css'],
        }),
        nodeResolve({ jsnext: true, module: true }),
        commonjs({
            include: [
                'node_modules/rxjs/**'
            ]
        })
    ]
}