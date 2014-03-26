node-ish
========

Shim module for using npm packages in PhantomJS.

Usage:

```js

var process = require("node-ish");
var path = require("node-ish/path");
```

For creating stubs to wrap node modules:

```js
require.stub("path", require("node-ish/path"));
var module = require("some-module-that-needs-path");

```
