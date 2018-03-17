const debug = require('debug')('metalsmith-browserify');
const path = require('path');
const browserify = require('browserify');

/**
 * Bundles a single entrypoint and updates the files object with the result
 */

const bundle = ({ entry, options, source, files }) =>
  new Promise((fulfill, reject) => {
    debug(`browserifying ${entry}`);
    const file = path.join(source, entry);
    const bundler = browserify(file, options.browserifyOptions);

    bundler.bundle((error, buffer) => {
      if (error) {
        return reject(error);
      }

      debug(`updating files object for ${entry}`);

      // eslint-disable-next-line no-param-reassign
      files[entry].contents = buffer;
      return fulfill();
    });
  });

/**
 * Plugin, the main plugin used by metalsmith
 */

module.exports = options => (files, metalsmith, done) => {
  if (!options || !options.entries) {
    done(new Error('The entries option is required'));
  }

  if (!Array.isArray(options.entries)) {
    done(new Error('The entries option must be an array of strings'));
  }

  if (options.entries.length === 0) {
    done(new Error('Need at least a single entry point to process'));
  }

  const source = metalsmith.source();

  const needToFixEntry = path.sep !== '/';

  const promises = options.entries.map(entry => {
    let finalEntry = entry;
    if (needToFixEntry) {
      finalEntry = finalEntry.replace(/\//g, path.sep);
    }

    return bundle({ finalEntry, options, source, files });
  });

  Promise.all(promises)
    .then(() => done())
    .catch(/* istanbul ignore next */ error => done(error));
};
