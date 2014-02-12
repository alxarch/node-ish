events = require "events"
EventEmitterHack = ->
	if @ instanceof EventEmitterHack and not @_events
		@_events = {}
		@_maxListeners = @_maxListeners or undefined
	else
		EventEmitterHack

EventEmitterHack:: = events.EventEmitter::
EventEmitterHack.EventEmitter = EventEmitterHack
module.exports = EventEmitterHack
