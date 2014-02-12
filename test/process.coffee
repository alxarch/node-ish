fs = require "fs"
module.exports = (done) ->
	assert = require "../modules/assert"
	assert.equal window.process

	proc = require "../modules/process"
	assert.equal proc, window.process
	assert.equal proc.cwd(), fs.absolute("")
	delete window.process
	done()
