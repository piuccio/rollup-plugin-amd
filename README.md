# rollup-pluign-amd

Convert AMD files to ES2016 modules, so they can be included in a Rollup bundle.

## Installation

`npm install --save-dev rollup-pluign-amd`

## Usage

```js
import { rollup } from 'rollup';
import amd form 'rollup-pluign-amd';

rollup({
    entry: 'main.js',
    plugins: [
        amd({
            include: 'src/**', // Default: undefined (everything)
            exclude: [ 'node_modules/**' ], // Default: undefined (nothing)
        })
    ]
});
```

The configuration above converts

```js
define(['utils/array', 'react'], function (array, React) {
    React.render();
});
```

into

```js
import array from './javascripts/utils/array';
import React from './node_modules/react/react.js';

React.render();
```

## License

Apache-2.0
