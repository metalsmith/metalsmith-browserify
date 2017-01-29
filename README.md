[![Build Status](https://travis-ci.org/kopa-app/metalsmith-browserify.svg)](https://travis-ci.org/kopa-app/metalsmith-browserify)

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
  .use(browserify({
    dest: 'js/bundle.js',
    entries: ['./src/js/index.js'],
    sourcemaps: false,
    watch: false
  }))
  .build(function (err, files) {
    if (err) {
      throw err;
    }
  });
```

See [browserify api](https://www.npmjs.com/package/browserify#api-example) for available options.

It can also be used with `metalsmith.json` by adding the plugin like this:

```json
{
  "plugins": {
    "metalsmith-browserify": {
      "dest": "javascripts/bundle.js",
      "entries": ["src/javascripts/index.js"],
      "sourcemaps": false,
      "watch": false
    }
  }
}
```

Or assume the defaults (dest: `bundle.js`, args: []):

```json
{
  "plugins": {
    "metalsmith-browserify": true
  }
}
```
