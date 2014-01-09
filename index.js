require('es5-shim');

var stub = function (name, m) {
	require.stub(name, m);
	global.require.stub(name, m);
};

var inherits = function inherits (ctor, superCtor) {
	if (typeof ctor === 'function') {
		ctor.super_ = superCtor;
		var proto = (superCtor || {}).prototype || {};
		ctor.prototype = Object.create(proto, {
			constructor: {
				value:         ctor,
				enumerable:    false,
				writable:      false,
				configurable:  true
			}});
	}
};

stub('inherits', inherits);

var util = require('util');
util.inherits = inherits;

stub('util', util);

(function(console){
	var _log = console.log;
	var log = function () {
		_log.call(console, util.format.apply(null, arguments));
	};
	module.exports = console;
	console.info = console.log = console.error = console.warn = log;
})(global.console);

var path = require('path-browserify');
stub('path', path);

var assert = require('assert');
stub('assert', assert);

var unimplemented = function () {
	throw new Error('Unimplemented!');
};

var system = require('system');
var events = require('events');
stub('events', events);

var process = global.process = new events.EventEmitter();

process.cwd = function () {
	return phantom.libraryPath;
};

process.chdir = function (dirname) {
	phantom.libraryPath = path.resolve('dirname');
};
process.env = system.env;
process.argv = system.args;
process.execPath = path.dirname(system.args[0]);
process.abort = unimplemented;

process.stderr = {};
process.stderr.write = function (data) {
	console.error(data);
};

process.stdout = {};
process.stdout.write = function (data) {
	console.log(data);
};

phantom.onError = function (error) {
	process.emit('uncaughtException', error);
	throw error;
};

process.exit = function (code) {
	process.emit('exit', code);
	phantom.exit(code);
};

process.version = phantom.version.major + '.' + phantom.version.minor + '.' + phantom.version.patch;

module.exports = process;
