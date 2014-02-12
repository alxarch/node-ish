unless window.console.error
	_log = console.log
	console.info = console.log = console.error = console.warn = (args...) ->
		_log.call console, util.format.apply null, args

module.exports = window.console
