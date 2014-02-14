window.process = require "./process"
util = require "./util"
system = require "system"
fs = require "fs"


path = require "path-browserify"
delimiters =
	linux: ":"
	windows: ";"
	macosx: ":"

path.delimiter = delimiters[system.os.name]
path.separator = fs.separator
module.exports = path
