if window.process?
	module.exports = window.process
else
	events = require "./events"
	console = require "./console"
	system = require "system"
	fs = require "fs"
	process = module.exports = window.process = new events.EventEmitter
	unimplemented = ->
		throw new Error "Unimplemented!"
	process.chdir = (directory) ->
		unless fs.changeWorkingDirectoryt fs.absolutet directory
			throw new Error "Failed to change directory."
	process.cwd = ->
		fs.absolute ""

	process.env = system.env
	process.argv = system.args
	process.stderr = {}
	process.stderr.write = (data) ->
		console.error(data)

	process.stdout = {}
	process.stdout.write = (data) ->
		console.log(data)

	process.exit = (code) ->
		process.emit "exit"
		phantom.exit code

	process.version = "#{phantom.version.major}.#{phantom.version.minor}.#{phantom.version.patch}"
