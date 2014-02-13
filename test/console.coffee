fs = require "fs"
module.exports = (done) ->
	assert = require "../assert"
	assert.equal window.console.__nodeified
	cons = require "../console"
	assert.equal window.console.__nodeified, yes
	assert.equal cons.log, cons.error
	assert.equal cons.log, cons.warn
	assert.equal cons.log, cons.info
	assert.equal cons, window.console
	done()
