'use strict';

var browserify = require('browserify');

module.exports = function (dest) {
  var args = Array.from(arguments);
  args.shift();

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
