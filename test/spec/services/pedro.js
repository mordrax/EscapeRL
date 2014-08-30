'use strict';

describe('Service: Pedro', function () {

  // load the service's module
  beforeEach(module('escapeRlApp'));

  // instantiate service
  var Pedro;
  beforeEach(inject(function (_Pedro_) {
    Pedro = _Pedro_;
  }));

  it('should do something', function () {
    expect(!!Pedro).toBe(true);
  });

});
