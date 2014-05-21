var assert = require('assert');
var fs = require('fs');
var path = require('path');

var parser = require('./index').parser;

it('should handle flat messages', function () {
    var dump = fs.readFileSync('./fixture/flat.txt', 'utf8');
    var flat = parser.parse(dump.toString());
    assert.deepEqual(flat, {
        int : "1234567890",
        msg:"a short message..."
    });
});

it('should losslessly handle large integers', function () {
    var dump = fs.readFileSync('./fixture/bigint.txt', 'utf8');
    var bigint = parser.parse(dump.toString());
    assert.deepEqual(bigint, {
        int : "123456789012345678901234567890",
        msg:"a short message..."});
});

it('should handle a message that contains a list', function () {
    var dump = fs.readFileSync('./fixture/flat_list.txt', 'utf8');
    var list = parser.parse(dump.toString());
    assert.deepEqual(list, { textList : ["foo", "bar", "baz"] });
});
