require('es5-shim');

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

var util = require('util');
util.inherits = inherits;
require.stub('util', util);

if (!window.console.error) {
	var _log = console.log;
	console.info = console.log = console.error = console.warn = function () {
		_log.call(console, util.format.apply(null, arguments));
	};;
}

var system = require("system");
var path = require('path-browserify');
path.delimiter = ({
	linux: ":",
	windows: ";",
	macosx: ":"
})[system.os];
path.separator = fs.separator;

require.stub('path', path);


require.stub('path', path);

var assert = require('assert');
require.stub('assert', assert);

var unimplemented = function () {
	throw new Error('Unimplemented!');
};

var events = require('events');
var EventEmitterHack = function () {
	if (this instanceof EventEmitterHack && !this._events) {
		this._events = {};
  		this._maxListeners = this._maxListeners || undefined;
	}
	else {
		return EventEmitterHack;
	}
};
EventEmitterHack.prototype = events.prototype;
EventEmitterHack.EventEmitter = events;
var fs = require('fs');
require.stub('events', EventEmitterHack);

if (typeof window.process === "undefined") {
	var process = window.process = new EventEmitterHack();

	process.chdir = function (directory) {
		if (!fs.changeWorkingDirectory(fs.absolute(directory))) {
			throw new Error("Failed to change directory.");
		}
	};

	process.cwd = function () {
		return fs.absolute('');
	};

	process.env = system.env;
	process.argv = system.args;
	process.stderr = {};
	process.stderr.write = function (data) {
		console.error(data);
	};

	process.stdout = {};
	process.stdout.write = function (data) {
		console.log(data);
	};

	process.exit = function (code) {
		process.emit('exit');
		phantom.exit(code);
	};

	process.version = phantom.version.major + '.' + phantom.version.minor + '.' + phantom.version.patch;
}

module.exports = {
	extend: function (rq) {
		rq.stub('events', EventEmitterHack);
		rq.stub('path', path);
		rq.stub('util', util);
		rq.stub('assert', assert);
	}
}
