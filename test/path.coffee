module.exports = (done) ->
	assert = require "../assert"
	path = require "../path"
	fs = require "fs"
	cwd = fs.absolute ""
	assert.equal "#{cwd}/some/relative/path", path.resolve "some/relative/path"
	
	done()



