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
    options.plugin.push('watchify');
    options.cache = options.cache || {};
    options.packageCache = options.packageCache || {};
  }

  if (options.sourcemaps) {
    options.debug = true;
  }

  var b = browserify(options);

  function bundler(files, metalsmith, callback) {
    var bundleDest = path.join(metalsmith.destination(), options.dest);

    // we need to remove the source files from the list
    // to prevent metalsmith copying the source file to the destination
    options.entries.forEach(function (entry) {
      var relPath = path.relative(metalsmith.source(), path.resolve(entry));
      delete files[relPath];
    });

    function create(first) {
      if (options.sourcemaps) {
        b.bundle(function(err, buffer) {
            if (err) return callback(err);
            files[options.dest] = {
                contents: buffer
            };
            callback();
        })
        .pipe(exorcist(bundleDest + '.map'));
      } else {
        b.bundle(function(err, buffer) {
            if (err) return callback(err);
            files[options.dest] = {
                contents: buffer
            };
            callback();
        });
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
