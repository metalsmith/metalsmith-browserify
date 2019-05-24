/* eslint-env jest */

const Metalsmith = require('metalsmith');
const equal = require('assert-dir-equal');
const rimraf = require('rimraf');
const path = require('path');
const plugin = require('./index');

describe('metalsmith-browserify', () => {
  it('should process a single entry point', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'single-entry');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin({ entries: ['index.js'] })).build(err => {
      if (err) {
        return done(err);
      }
      expect(() => equal(actual, expected)).not.toThrow();
      return done();
    });
  });

  it('should process a nested entry point', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'nested-entry');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    const entry = path.join('nested', 'index.js');

    rimraf.sync(actual);

    return metalsmith.use(plugin({ entries: [entry] })).build(err => {
      if (err) {
        return done(err);
      }
      expect(() => equal(actual, expected)).not.toThrow();
      return done();
    });
  });

  it('should process multiple entry points', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'multiple-entries');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin({ entries: ['index.js', 'other.js'] })).build(err => {
      if (err) {
        return done(err);
      }
      expect(() => equal(actual, expected)).not.toThrow();
      return done();
    });
  });

  it('should pass options to browserify', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'options');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith
      .use(plugin({ entries: ['index.js'], browserifyOptions: { debug: true } }))
      .build(err => {
        if (err) {
          return done(err);
        }
        expect(() => equal(actual, expected)).not.toThrow();
        return done();
      });
  });

  it('should return an error when there is an error while bundling', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'bundle-error');
    const metalsmith = new Metalsmith(base);

    return metalsmith.use(plugin({ entries: ['index.js'] })).build(err => {
      expect(err).toBeInstanceOf(Error);

      // Removing path from the error since it is absolute and not always the same
      expect(err.message.substring(0, 43)).toMatchSnapshot();
      done();
    });
  });

  it('should return an error when there is no entries option', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'no-entries');
    const metalsmith = new Metalsmith(base);

    return metalsmith.use(plugin({})).build(err => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatchSnapshot();
      done();
    });
  });

  it('should return an error when there are no options', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'no-options');
    const metalsmith = new Metalsmith(base);

    return metalsmith.use(plugin()).build(err => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatchSnapshot();
      done();
    });
  });

  it('should return an error when entries is not an array', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'malformed-entries');
    const metalsmith = new Metalsmith(base);

    return metalsmith.use(plugin({ entries: 'wrong' })).build(err => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatchSnapshot();
      done();
    });
  });

  it('should return an error when entries is empty', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'empty-entries');
    const metalsmith = new Metalsmith(base);

    return metalsmith.use(plugin({ entries: [] })).build(err => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatchSnapshot();
      done();
    });
  });
});
