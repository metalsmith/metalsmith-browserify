# Metalsmith - Browserify

Metalsmith plugin to bundle JS with browserify

## Installation

```bash
npm install metalsmith-browserify --save
```

metalsmith-browserify does not bundle browserify. You need to install it yourself in your package.
This is to avoid usage of an outdated browserify version with metalsmith-browserify.

## Usage

```javascript
var metalsmith = require('metalsmith');
var browserify = require('metalsmith-browserify');

metalsmith(__dirname)
  // first argument is the destination
  // other arguments get passed to browserify
  .use(browserify('js/bundle.js', [
    './src/js/index.js'
  ]))
  .build(function (err, files) {
    if (err) {
      throw err;
    }
  });
```

See [browserify api](https://www.npmjs.com/package/browserify#api-example) for available options.

If you need to manipulate the created browserify bundle do:

```javascript
var metalsmith = require('metalsmith');
var browserify = require('metalsmith-browserify');

var b = browserify('js/bundle.js', [
  './src/js/index.js'
]);

// do stuff with the bundle
b.bundle.external(/*...*/);

metalsmith(__dirname)
  .use(b) // use the plugin
  .build()
```
