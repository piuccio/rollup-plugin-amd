import convert from '@buxlabs/amd-to-es6';
import { createFilter } from 'rollup-pluginutils';

const firstpass = /\b(?:define)\b/;
const importStatement = /\b(import .*['"])(.*)(['"].*\n)/g;

export default function(options = {}) {
    const filter = createFilter( options.include, options.exclude );

    return {
        name: 'amd',

        transform (code, id) {
            if ( !filter( id ) ) return;
            if ( !firstpass.test( code ) ) return;

            let transformed = convert(code, options.converter);
            if (options.rewire) {
                transformed = transformed.replace(importStatement, (match, begin, moduleId, end) => {
                    return `${begin}${options.rewire(moduleId, id) || moduleId}${end}`;
                });
            }

            return transformed;
        }
    };
}
