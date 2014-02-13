fs = require "fs"
module.exports = (done) ->
	assert = require "../assert"
	assert.equal window.process

	proc = require "../process"
	assert.equal proc, window.process
	assert.equal proc.cwd(), fs.absolute("")
	delete window.process
	done()
