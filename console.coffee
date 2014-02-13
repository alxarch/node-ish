util = require "./util"
console = module.exports = window.console
unless console.__nodeified
	_log = console.log
	console.info = console.log = console.error = console.warn = (args...) ->
		_log.call console, util.format.apply null, args
	console.__nodeified = yes
