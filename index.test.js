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
      .use(browserify({
        dest: 'bundle-file.js',
        entries: ['./fixtures/js/index.js']
      }))
      .build(function (err) {
        if (err) {
          return done(err);
        }

        expect(fs.existsSync('./build/bundle-file.js')).to.be(true);
        fs.unlinkSync('./build/bundle-file.js');
        done();
      });
  });

  it('should have reasonable default options', function (done) {
    metalsmith(__dirname)
      .source('./fixtures/src')
      .use(browserify({
        entries: ['./fixtures/js/index.js']
      }))
      .build(function (err) {
        if (err) {
          return done(err);
        }

        expect(fs.existsSync('./build/bundle.js')).to.be(true);
        fs.unlinkSync('./build/bundle.js');
        done();
      });
  });

  it('should accept sourcemaps option', function (done) {
    metalsmith(__dirname)
      .source('./fixtures/src')
      .use(browserify({
        dest: 'bundle.js',
        entries: ['./fixtures/js/index.js'],
        sourcemaps: true
      }))
      .build(function (err) {
        if (err) {
          return done(err);
        }

        expect(fs.existsSync('./build/bundle.js')).to.be(true);
        expect(fs.existsSync('./build/bundle.js.map')).to.be(true);
        fs.unlinkSync('./build/bundle.js');
        fs.unlinkSync('./build/bundle.js.map');
        done();
      });
  });
});
