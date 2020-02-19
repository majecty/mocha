'use strict';
var run = require('./helpers').runMochaJSON;
var utils = require('../../lib/utils');

describe('esm', function() {
  before(function() {
    if (!utils.supportsEsModules()) this.skip();
  });

  it('should pass a passing esm test that uses esm', function(done) {
    var fixture = 'esm/esm-success.fixture.mjs';
    run(fixture, ['--experimental-modules'], function(err, result) {
      if (err) {
        done(err);
        return;
      }

      expect(result, 'to have passed test count', 1);
      done();
    });
  });

  it('should fail a failing esm test that uses esm', function(done) {
    var fixture = 'esm/esm-failure.fixture.mjs';
    run(fixture, ['--experimental-modules'], function(err, result) {
      if (err) {
        done(err);
        return;
      }

      expect(result, 'to have failed test count', 1);
      done();
    });
  });

  it('should recognize esm files ending with .js due to package.json type flag', function(done) {
    var fixture = 'esm/js-folder/esm-in-js.fixture.js';
    run(fixture, ['--experimental-modules'], function(err, result) {
      if (err) {
        done(err);
        return;
      }

      expect(result, 'to have passed test count', 1);
      done();
    });
  });
});
