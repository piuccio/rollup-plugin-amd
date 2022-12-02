import convert from '@buxlabs/amd-to-es6';
import { createFilter } from 'rollup-pluginutils';

const firstpass = /\b(?:define)\b/;
const importStatement = /\b(import .*['"])(.*)(['"].*\n)/g;

export default function(options = {}) {
    options.converter = options.converter || {};
    options.converter.sourceMap = options.converter.hasOwnProperty('sourceMap') ? options.converter.sourceMap : true;

    const filter = createFilter( options.include, options.exclude );

    return {
        name: 'amd',

        transform (code, id) {
            if ( !filter( id ) ) return;
            if ( !firstpass.test( code ) ) return;

            let transformed = convert(code, options.converter);

            if (typeof transformed === 'object') {
                transformed.code = transformed.source;
                delete transformed.source;
            }

            if (options.rewire) {
                if (typeof transformed === 'object') {
                    transformed.code = transformed.code.replace(importStatement, (match, begin, moduleId, end) => {
                        return `${begin}${options.rewire(moduleId, id) || moduleId}${end}`;
                    });
                } else {
                    transformed = transformed.replace(importStatement, (match, begin, moduleId, end) => {
                        return `${begin}${options.rewire(moduleId, id) || moduleId}${end}`;
                    });
                }
            }

            return transformed;
        }
    };
}
