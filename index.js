var fs = require('fs');

var gutil = require('gulp-util');
var through = require('through2');

var PEG = require("pegjs");
var parser = PEG.buildParser(fs.readFileSync('./grammar.peg', 'utf8'));

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
            file.contents = parser.parse(file.contents);
            this.push(file);
            cb();
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-capnp-text2json', err));
        }
    });
};
