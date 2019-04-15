const { Readable } = require('stream');
const path = require('path');
const debug = require('debug')('metalsmith-browserify');
const browserify = require('browserify');

/**
 * Bundles a single entrypoint and updates the files object with the result
 */

const bundle = ({ file, options, source, files }) => {
  debug(`browserifying ${file}`);

  const readable = new Readable();
  const filePath = path.join(source, file);
  const fileDir = path.parse(filePath).dir;
  const browserifyOptions = Object.assign({}, options.browserifyOptions, { basedir: fileDir });

  // Push the file into the stream
  readable.push(files[file].contents);

  // Signal the end of the stream
  readable.push(null);

  const bundler = browserify(readable, browserifyOptions);

  return new Promise((fulfill, reject) => {
    bundler.bundle((error, buffer) => {
      if (error) {
        return reject(error);
      }

      debug(`updating files object for ${file}`);

      // eslint-disable-next-line no-param-reassign
      files[file].contents = buffer;
      return fulfill();
    });
  });
};

/**
 * Plugin, the main plugin used by metalsmith
 */

module.exports = options => (files, metalsmith, done) => {
  if (!options || !options.entries) {
    return done(new Error('The entries option is required'));
  }

  if (!Array.isArray(options.entries)) {
    return done(new Error('The entries option must be an array of strings'));
  }

  if (options.entries.length === 0) {
    return done(new Error('Need at least a single entry point to process'));
  }

  const source = metalsmith.source();
  const promises = options.entries.map(file => bundle({ file, options, source, files }));

  return Promise.all(promises)
    .then(() => done())
    .catch(/* istanbul ignore next */ error => done(error));
};
