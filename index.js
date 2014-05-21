var fs = require('fs');
var path = require('path');

var gutil = require('gulp-util');
var through = require('through2');

var PEG = require("pegjs");
var parser = PEG.buildParser(fs.readFileSync(path.join(__dirname, './grammar.peg'), 'utf8'));

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-capnp-text2json', 'Streaming not supported'));
            return cb();
        }

        try {
            var image = parser.parse(file.contents.toString());
            file.contents = new Buffer(JSON.stringify(image));
            this.push(file);
            cb();
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-capnp-text2json', err));
        }
    });
};

module.exports.parser = parser;
