const assert = require( 'assert' );
const rollup = require( 'rollup' );
const amd = require( '..' );

process.chdir( __dirname );

function executeBundle ( bundle ) {
	const generated = bundle.generate({
		format: 'cjs'
	});

	const fn = new Function ( 'module', 'exports', 'assert', generated.code );
	const module = { exports: {} };

	fn( module, module.exports, assert );

	return module;
}

describe( 'rollup-plugin-amd', function() {
    it('finds a module with `define` and relative paths', function() {
        return rollup.rollup({
            entry: 'samples/relative.js',
            plugins: [
                amd()
            ]
        })
        .then(executeBundle)
        .then(module => {
            assert.equal(module.exports, 15);
        });
    });
});
