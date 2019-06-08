# metalsmith-browserify

[![npm version][version-badge]][version-url]
[![build status][build-badge]][build-url]
[![coverage status][coverage-badge]][coverage-url]
[![greenkeeper][greenkeeper-badge]][greenkeeper-url]
[![downloads][downloads-badge]][downloads-url]

> A metalsmith plugin to bundle javascript with browserify

This plugin allows you to bundle your javascript with browserify. Pass it the entry points it should bundle, and it will replace those files with the resulting bundle on build.

For support questions please use [stack overflow][stackoverflow-url] or our [slack channel][slack-url]. For browserify specific questions try [their documentation](https://github.com/browserify/browserify).

## Installation

```bash
$ npm install metalsmith-browserify
```

## Options

You can pass options to `metalsmith-browserify` with the [Javascript API](https://github.com/segmentio/metalsmith#api) or [CLI](https://github.com/segmentio/metalsmith#cli). The options are:

* [entries](#entries): required. The entry points that need to be browserified. Accepts an array of strings.
* [browserifyOptions](#browserifyoptions): optional. These options will be passed on to browserify. See [this area of the browserify documentation](https://github.com/browserify/browserify#browserifyfiles--opts) for all available options. Note that it's possible to break stuff here, like overriding the entries or basedir, so use wisely.

### `entries`

The entry points that should be browserified. So this `metalsmith.json`:

```json
{
  "source": "src",
  "destination": "build",
  "plugins": {
    "metalsmith-browserify": {
      "entries": [
        "index.js",
        "another.js"
      ]
    }
  }
}
```

Would browserify both `./src/index.js` and `./src/another.js` and output them as `./build/index.js` and `./build/another.js` respectively.

Note that if the entry path is nested, the paths may differ across operating systems. Make sure you're using the correct directory separators, or use node's [path.join](https://nodejs.org/api/path.html#path_path_join_paths) to make sure the path will work anywhere.

### `browserifyOptions`

Use this to pass options to browserify. So this `metalsmith.json`:

```json
{
  "source": "src",
  "destination": "build",
  "plugins": {
    "metalsmith-browserify": {
      "entries": ["index.js"],
      "browserifyOptions": {
        "debug": true
      }
    }
  }
}
```

Would enable browserify's debug option and add a source map to the bundle.

## Errors and debugging

If you're encountering problems you can use [debug](https://www.npmjs.com/package/debug) to enable verbose logging. To enable `debug` prefix your build command with `DEBUG=metalsmith-browserify`. So if you normally run `metalsmith` to build, use `DEBUG=metalsmith-browserify metalsmith` (on windows the syntax is [slightly different](https://www.npmjs.com/package/debug#windows-note)).

## License

MIT

[build-badge]: https://travis-ci.org/metalsmith/metalsmith-browserify.svg?branch=master
[build-url]: https://travis-ci.org/metalsmith/metalsmith-browserify
[downloads-badge]: https://img.shields.io/npm/dm/metalsmith-browserify.svg
[downloads-url]: https://www.npmjs.com/package/metalsmith-browserify
[version-badge]: https://img.shields.io/npm/v/metalsmith-browserify.svg
[version-url]: https://www.npmjs.com/package/metalsmith-browserify
[greenkeeper-badge]: https://badges.greenkeeper.io/metalsmith/metalsmith-browserify.svg
[greenkeeper-url]: https://greenkeeper.io/
[coverage-badge]: https://coveralls.io/repos/github/metalsmith/metalsmith-browserify/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/metalsmith/metalsmith-browserify?branch=master
[slack-url]: http://metalsmith-slack.herokuapp.com/
[stackoverflow-url]: http://stackoverflow.com/questions/tagged/metalsmith
