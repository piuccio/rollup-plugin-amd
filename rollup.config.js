import buble from 'rollup-plugin-buble';

var pkg = require('./package.json');

var external = Object.keys( require( './package.json' ).dependencies ).concat([ 'fs', 'path' ]);

export default {
	input: 'src/index.js',
	plugins: [
		buble({
			transforms: { dangerousForOf: true }
		})
	],
	output: [{
		format: 'es',
		file: pkg.module,
		sourcemap: true,
	}, {
		format: 'cjs',
		file: pkg.main,
		sourcemap: true,
	}],
	external: external,
};
