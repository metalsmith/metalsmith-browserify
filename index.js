'use strict';

var browserify = require('browserify');

var defaultDest = 'bundle.js';

module.exports = function (options) {
  var args = Array.prototype.slice.call(arguments, 1);
  var dest = options;

  if (typeof options == 'object') {
    if ('args' in options) {
      args = options.args;
    }
    if ('dest' in options) {
      dest = options.dest;
    }
  }

  if (typeof dest !== 'string') {
    dest = 'bundle.js';
  }

  var b = browserify.apply(browserify, args);

  function bundler(files, metalsmith, callback) {
    b.bundle(function (err, buf) {
      if (err) {
        return callback(err);
      }

      files[dest] = {
        path: dest,
        contents: buf
      };

      callback();
    });
  }

  bundler.bundle = b;

  return bundler;
};
