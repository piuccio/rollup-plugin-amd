# rollup-plugin-amd

Convert AMD files to ES2016 modules, so they can be included in a Rollup bundle.

## Installation

`npm install --save-dev rollup-plugin-amd`

## Usage

```js
import { rollup } from 'rollup';
import amd from 'rollup-plugin-amd';

rollup({
    entry: 'main.js',
    plugins: [
        amd()
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

### Options

```js
import { rollup } from 'rollup';
import amd from 'rollup-plugin-amd';

rollup({
    entry: 'main.js',
    plugins: [
        amd({
            include: 'src/**', // Optional, Default: undefined (everything)
            exclude: [ 'node_modules/**' ], // Optional, Default: undefined (nothing)
            converter: {}, // Optional, Default: undefined
            rewire: function (moduleId, parentPath) { // Optional, Default: false
                return './basePath/' + moduleId;
            }
        })
    ]
});
```

* __converter__ options to pass down to the AMD to ES6 [converter](https://github.com/buxlabs/amd-to-es6).

* __rewire__ allows to modify the imported path of `define` dependencies.
  - `moduleId` is the dependency ID
  - `parentPath` is the path of the file including the dependency

```js
define(['lodash'], function (_) {});
```

becomes

```js
import _ from './basePath/lodash';
```

If you're converting AMD modules from requirejs, you can use [node-module-lookup-amd](https://github.com/dependents/node-module-lookup-amd) to rewire your dependencies

```js
import { rollup } from 'rollup';
import amd from 'rollup-plugin-amd';
import lookup from 'module-lookup-amd';

rollup({
    entry: 'main.js',
    plugins: [
        amd({
            rewire: function (moduleId, parentPath) { // Optional, Default: false
                return lookup({
                    partial: moduleId,
                    filename: parentPath,
                    config: 'path-to-requirejs.config' // Or an object
                });
            }
        })
    ]
});
```

## License

Apache-2.0
