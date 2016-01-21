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
      .use(browserify('bundle-file.js'), [
        './fixtures/js/index.js'
      ])
      .build(function (err) {
        if (err) {
          return done(err);
        }

        expect(fs.existsSync('./build/bundle-file.js')).to.be(true);
        fs.unlinkSync('./build/bundle-file.js');
        done();
      });
  });

  it('should accept options', function (done) {
    metalsmith(__dirname)
      .source('./fixtures/src')
      .use(browserify({
        dest: 'bundle-options.js',
        args: ['./fixtures/js/index.js']
      }))
      .build(function (err) {
        if (err) {
          return done(err);
        }

        expect(fs.existsSync('./build/bundle-options.js')).to.be(true);
        fs.unlinkSync('./build/bundle-options.js');
        done();
      });
  });

  it('should have reasonable default options', function (done) {
    metalsmith(__dirname)
      .source('./fixtures/src')
      .use(browserify())
      .build(function (err) {
        if (err) {
          return done(err);
        }

        expect(fs.existsSync('./build/bundle.js')).to.be(true);
        fs.unlinkSync('./build/bundle.js');
        done();
      });
  });

  it('should accept true option', function (done) {
    metalsmith(__dirname)
      .source('./fixtures/src')
      .use(browserify(true))
      .build(function (err) {
        if (err) {
          return done(err);
        }

        expect(fs.existsSync('./build/bundle.js')).to.be(true);
        fs.unlinkSync('./build/bundle.js');
        done();
      });
  });
});
