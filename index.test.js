'use strict';

var expect = require('expect.js');
var browserify = require('./index');
var metalsmith = require('metalsmith');
var fs = require('fs');
var path = require('path');

describe('metalsmith-browserify', function () {
  it('should bundle js files', function (done) {
    metalsmith(__dirname)
      .source('./fixtures/src')
      .use(browserify('bundle.js'), [
        './fixtures/js/index.js'
      ])
      .build(function (err) {
        if (err) {
          return done(err);
        }

        expect(fs.existsSync('./build/bundle.js')).to.be(true);
        done();
      });
  });
});
