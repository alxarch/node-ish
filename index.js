require('es5-shim');
var system = require('system');
var events = require('events');
var path = require('path-browserify');

require.stub('path', path);
global.require.stub('path', path);

var assert = require('assert');
require.stub('assert', assert);
global.require.stub('assert', assert);

var util = require('util');
require.stub('util', util);
global.require.stub('util', util);

require('console-browserify');

var unimplemented = function () {
	throw new Error('Unimplemented!');
};

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

phantom.onError = function () {
	process.emit('uncaughtException');
};

process.exit = function (code) {
	process.emit('exit', code);
	phantom.exit(code);
};

process.version = phantom.version.major + '.' + phantom.version.minor + '.' + phantom.version.patch;

module.exports = process;
