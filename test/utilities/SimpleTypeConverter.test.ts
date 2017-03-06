let assert = require('chai').assert;

import { SimpleTypeConverter } from '../../src/utilities/SimpleTypeConverter';

suite('SimpleTypeConverter', ()=> {

    test('longToString', () => {
        assert.equal(null, SimpleTypeConverter.longToString(null));
        assert.equal("123", SimpleTypeConverter.longToString(123));
    });

    test('stringToLong', () => {
        assert.equal(0, SimpleTypeConverter.stringToLong(null, 0));
        assert.equal(0, SimpleTypeConverter.stringToLong("ABC", 0));
        assert.equal(123, SimpleTypeConverter.stringToLong("123", 0));
    });

    test('doubleToString', () => {
        assert.equal(null, SimpleTypeConverter.doubleToString(null));
        assert.equal("123.456", SimpleTypeConverter.doubleToString(123.456));
    });

    test('stringToDouble', () => {
        assert.equal(0, SimpleTypeConverter.stringToDouble(null, 0));
        assert.equal(0, SimpleTypeConverter.stringToDouble("ABC", 0));
        assert.equal(123.456, SimpleTypeConverter.stringToDouble("123.456", 0));
    });

    test('booleanToString', () => {
        assert.equal("false", SimpleTypeConverter.booleanToString(null));
        assert.equal("true", SimpleTypeConverter.booleanToString(true));
    });

    test('stringToBoolean', () => {
        assert.equal(false, SimpleTypeConverter.stringToBoolean(null));
        assert.equal(true, SimpleTypeConverter.stringToBoolean("True"));
        assert.equal(true, SimpleTypeConverter.stringToBoolean("1"));
        assert.equal(true, SimpleTypeConverter.stringToBoolean("T"));
    });

});
