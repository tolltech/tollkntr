var assert = require('assert');

describe('Converters', function () {
  var fs = require('fs');
  var vm = require('vm');
  var path = './background.js';  

  var code = fs.readFileSync(path);
  vm.runInThisContext('var testMode = true; ' + code);  

  describe('TicksToDateTime', function () {
    it('zero', function () {
      assert.throws(() => { ticksToDateTime(0) }, Error, "Can't convert 0 because it is less then 621355968000000000!");
    });
    it('start_minus_one', function () {
      assert.throws(() => { ticksToDateTime(621355967999990000) }, Error, "Can't convert 0 because it is less then 621355968000000000!");
    });
    it('start', function () {
      assert.equal(ticksToDateTime(621355968000000000), '1970-01-01T00:00:00.000Z');
    });
    it('random', function () {
      assert.equal(ticksToDateTime(638082254450060000), '2023-01-02T03:04:05.006Z');
    });
  });

  describe('DateTimeToTicks', function () {
    it('start-dotnet', function () {
      assert.equal(dateTimeToTicks('1970-01-01T00:00:00.000'), 621355968000000000);
    });
    it('random', function () {
      assert.equal(dateTimeToTicks('2023-01-02T03:04:05.006'), 638082254450060000);
    });
    it('start-minus-one', function () {
      assert.equal(dateTimeToTicks('1969-12-31T23:59:59.999'), 621355967999990000);
    });
    it('old', function () {
      assert.equal(dateTimeToTicks('1800-12-31T23:59:59.999'), 568024703999990000);
    });
  });

});

describe('Sample', function () {
  describe('Should', function () {
    it('green', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });

    it('red', function () {
      assert.equal([1, 2, 3].indexOf(4), 1);
    });
  });
});
