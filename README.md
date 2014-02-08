node-ish
========

Hackish shim module for phantomjs.

Main goal is to be able to reuse node modules in phantomjs.

Usage:

```javascript
// Use before inside "main" script before requiring 
// any module that depends on node modules.

require("node-ish").extend(require);


```
