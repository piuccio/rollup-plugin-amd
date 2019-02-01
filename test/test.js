const assert = require( 'assert' );
const rollup = require( 'rollup' );
const amd = require( '..' );

process.chdir( __dirname );

async function executeBundle ( bundle ) {
	const { output } = await bundle.generate({
		format: 'cjs'
	});
	for (const chunkOrAsset of output) {
		if (!chunkOrAsset.isAsset) {
			return doSomething(chunkOrAsset);
		}
	}
}

function doSomething (generated) {
	const fn = new Function ( 'module', 'exports', 'assert', generated.code );
	const module = { exports: {} };

	fn( module, module.exports, assert );

	return module;
}

describe( 'rollup-plugin-amd', function() {
	it('finds a module with `define` and relative paths', function() {
		return rollup.rollup({
			input: 'samples/relative.js',
			plugins: [
				amd()
			]
		})
		.then(executeBundle)
		.then(module => {
			assert.equal(module.exports, 15);
		});
	});

	it('rewires dependencies', function() {
		return rollup.rollup({
			input: 'samples/rewire.js',
			plugins: [
				amd({
					rewire: function(moduleId) {
						return './nested/' + moduleId;
					}
				})
			]
		})
		.then(executeBundle)
		.then(module => {
			assert.equal(module.exports, 15);
		});
	});
});
