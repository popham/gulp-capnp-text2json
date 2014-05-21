gulp-capnp-text2json [![Build Status](https://travis-ci.org/popham/gulp-capnp-text2json.svg?branch=master)](https://travis-ci.org/popham/gulp-capnp-text2json)
==============================================================================================================================================================

Convert Capnproto text dumps to Javascript objects, e.g.

```
(textList = ["foo", "bar", "baz"])

```

becomes


```
{ textList : ["foo", "bar", "baz"] }
```

Note that integers are parsed to strings to avoid possible overflow.