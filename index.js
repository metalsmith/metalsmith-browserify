'use strict';

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var exorcist = require('exorcist');

var defaultDest = 'bundle.js';

module.exports = function (options) {
  options = options || {};
  options.dest = options.dest || defaultDest;
  options.plugin = options.plugin || [];

  if (!options.dest) {
    throw new Error('Missing dest');
  }

  if (!options.entries) {
    throw new Error('Missing entries');
  }

  if (options.watch) {
    options.plugins.push('watchify');
  }

  if (options.sourcemaps) {
    options.debug = true;
  }

  var b = browserify(options);

  function bundler(files, metalsmith, callback) {
    var bundleDest = path.join(metalsmith.destination(), options.dest);

    function create(first) {
      var s;
      if (options.sourcemaps) {
        s = b.bundle()
        .pipe(exorcist(bundleDest + '.map'))
        .pipe(fs.createWriteStream(bundleDest), 'utf8');
      } else {
        s = b.bundle()
        .pipe(fs.createWriteStream(bundleDest), 'utf8');
      }

      if (first) {
        s.on('finish', callback);
      }
    }

    mkdirp.sync(path.dirname(bundleDest));

    // we need to manually update the bundle if watchify tells us
    b.on('log', console.log.bind(console, path.basename(options.dest)));
    b.on('update', create);
    create(true);
  }

  bundler.bundle = b;

  return bundler;
};
