import convert from 'buxlabs.amd-to-es6';
import { createFilter } from 'rollup-pluginutils';

const firstpass = /\b(?:define)\b/;

export default function(options = {}) {
    const filter = createFilter( options.include, options.exclude );

    return {
        name: 'amd',

        transform (code, id) {
            if ( !filter( id ) ) return;
            if ( !firstpass.test( code ) ) return;

            return convert(code);
        }
    };
}
